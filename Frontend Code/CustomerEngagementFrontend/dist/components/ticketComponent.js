var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function showTicketPage() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("app").innerHTML = `
    <h2>Tickets</h2>
    <button onclick="showTicketForm()" class="btn btn-primary">Create Ticket</button>
    <button onclick="loadTickets()" class="btn btn-secondary">View Tickets</button>
    <div id="ticketArea"></div>
    `;
    });
}
function showTicketForm() {
    document.getElementById("ticketArea").innerHTML = `
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
function addTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = {
            customerId: Number(document.getElementById("customerId").value),
            categoryId: Number(document.getElementById("categoryId").value),
            agentName: document.getElementById("agentName").value,
            status: document.getElementById("status").value,
            description: document.getElementById("description").value
        };
        if (!ticket.customerId || !ticket.categoryId) {
            alert("CustomerId and CategoryId required");
            return;
        }
        if (ticket.description.length < 10) {
            alert("Description must be at least 10 characters");
            return;
        }
        yield createTicket(ticket);
        alert("Ticket created successfully");
    });
}
function loadTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        const tickets = yield getTickets();
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
        tickets.forEach((t) => {
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
        document.getElementById("ticketArea").innerHTML = html;
    });
}
