import { getDashboard, getTickets } from "../services/apiService.js";

export async function loadDashboard() {

  // 🔥 1. Get dashboard summary
  const data = await getDashboard();

  const total = data.totalTickets;
  const open = data.openTickets;
  const inProgress = data.inProgressTickets;
  const closed = data.closedTickets;

  // 🔥 2. Get ticket list for table
  const ticketResponse = await getTickets();
  const tickets = ticketResponse.$values || ticketResponse;

  let ticketRows = "";

  tickets.forEach((t: any) => {
    ticketRows += `
      <tr>
        <td>${t.ticketId}</td>
        <td>${t.customerId}</td>
        <td>
          <span class="badge rounded-pill bg-${
            t.status === "Open"
              ? "danger"
              : t.status === "Closed"
              ? "success"
              : "warning"
          }">
            ${t.status}
          </span>
        </td>
        <td>${t.description}</td>
      </tr>
    `;
  });

  // 🔥 3. Render UI
  document.getElementById("app")!.innerHTML = `
    <h2>Dashboard</h2>

    <div class="row">

      <div class="col-md-3">
        <div class="card text-center p-3 bg-primary text-white">
          <h5>Total Tickets</h5>
          <h3>${total}</h3>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-center p-3 bg-danger text-white">
          <h5>Open Tickets</h5>
          <h3>${open}</h3>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-center p-3 bg-success text-white">
          <h5>Closed Tickets</h5>
          <h3>${closed}</h3>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-center p-3 bg-warning text-white">
          <h5>InProgress Tickets</h5>
          <h3>${inProgress}</h3>
        </div>
      </div>

    </div>

    <hr/>

    <h4>Recent Tickets</h4>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${ticketRows}
      </tbody>
    </table>
  `;
}

// 🔥 VERY IMPORTANT (for router)
(window as any).loadDashboard = loadDashboard;