import {createTicket, getTickets} from "../services/apiService.js";

export async function showTicketPage() {
    document.getElementById("app")!.innerHTML=`
    <h2>Tickets</h2>
    <button onclick="showTicketForm()" class="btn btn-primary">Create Ticket</button>
    <button onclick="loadTickets()" class="btn btn-secondary">View Tickets</button>
    <div id="ticketArea"></div>
    `;
}

function showTicketForm() {
    document.getElementById("ticketArea")!.innerHTML = `
    <input id="customerId" class="form-control mb-2" placeholder="Customer ID">
    <input id="categoryId" class="form-control mb-2" placeholder="Category ID">
    <input id="agentName" class="form-control mb-2" placeholder="Agent Name">
    
    <select id="status" class="form-control mb-2">
        <option value="Open">Open</option>
        <option value="InProgress">InProgress</option>
        <option value="Closed">Closed</option>
    </select>

    <textarea id="description" class="form-control mb-2" placeholder="Description"></textarea>

    <button onclick="addTicket()" class="btn btn-success">Create</button>
    `;
}

async function addTicket() {
    const ticket = {
        customerId: Number((document.getElementById("customerId") as HTMLInputElement).value),
        categoryId: Number((document.getElementById("categoryId") as HTMLInputElement).value),
        agentName: (document.getElementById("agentName") as HTMLInputElement).value,
        status: (document.getElementById("status") as HTMLSelectElement).value,
        description: (document.getElementById("description") as HTMLInputElement).value
    };
    await createTicket(ticket);
    alert("Ticket created successfully");
    
    if (!ticket.customerId || !ticket.categoryId) {
        alert("CustomerId and CategoryId required");
        return;
    }

    if (ticket.description.length < 5) {
        alert("Description must be at least 10 characters");
        return;
    }
    await loadTickets();                    // refresh ticket list
    if((window as any).loadDashboard) {
        (window as any).loadDashboard();
    }  // refresh dashboard counts
}

async function loadTickets() {
    const tickets = await getTickets();

    let html = `
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>CustomerId</th>
                <th>CategoryId</th>
                <th>Status</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
    `;

    tickets.forEach((t:any) => {
        html += `
        <tr>
            <td>${t.ticketId}</td>
            <td>${t.customerId}</td>
            <td>${t.categoryId}</td>
            <td>${t.status}</td>
            <td>${t.description}</td>
        </tr>`;
    });

    html += "</tbody></table>";

    document.getElementById("ticketArea")!.innerHTML = html;
}
(window as any).showTicketForm = showTicketForm;
(window as any).loadTickets = loadTickets;
(window as any).addTicket = addTicket;