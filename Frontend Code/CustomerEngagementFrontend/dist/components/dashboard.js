var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Dashboard component
// Shows ticket statistics and recent tickets
function loadDashboard() {
    return __awaiter(this, void 0, void 0, function* () {
        const tickets = yield getTickets();
        // Calculate ticket statistics
        const total = tickets.length;
        const open = tickets.filter((t) => t.status === "Open").length;
        const closed = tickets.filter((t) => t.status === "Closed").length;
        const inProgress = tickets.filter((t) => t.status === "InProgress").length;
        let ticketRows = "";
        // Build ticket table rows
        tickets.forEach((t) => {
            ticketRows += `
        <tr>
            <td>${t.ticketId}</td>
            <td>${t.customerId}</td>
            <td>
                <span class="badge rounded-pill bg-${t.status === "Open" ? "danger" :
                t.status === "Closed" ? "success" : "warning"}">${t.status}</span>
            </td>
            <td>${t.description}</td>
        </tr>
        `;
        });
        // Render dashboard UI
        document.getElementById("app").innerHTML = `
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
<hr>
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
    <tbody>${ticketRows}</tbody>
</table>
`;
    });
}
