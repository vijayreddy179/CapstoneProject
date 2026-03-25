import {createCustomer, getCustomers} from "../services/apiService.js";

export async function showCustomerPage() {
    document.getElementById("app")!.innerHTML=`
    <h2>Customers</h2>
    <button onclick="showCustomerForm()" class="btn btn-primary">Add Customer</button>
    <button onclick="loadCustomers()" class="btn btn-secondary">View Customers</button>
    <div id="customerArea"></div>
    `;
}

async function showCustomerForm() {
    document.getElementById("customerArea")!.innerHTML=`
    <input id="name" class="form-control mb-2"placeholder="Customer Name">
    <input id="email" class="form-control mb-2"placeholder="Email">
    <input id="phone" class="form-control mb-2"placeholder="Phone">
    <button onclick="addCustomer()" class="btn btn-success">Save</button>
    `;
}

async function addCustomer() {
    const customer = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value
    };

    if (!customer.name || !customer.email) {
        alert("Name and Email are required");
        return;
    }

    const existing = await getCustomers();
    const duplicate = existing.find((c:any) => c.email === customer.email);

    if (duplicate) {
        if(!isValidEmail(customer.email)) {
        alert("Invalid email format");
        return;
        }
        alert("Customer already exists!");
        return;
    }

    await createCustomer(customer);
    if(!isValidEmail(customer.email)) {
        alert("Invalid email format");
        return;
    }
    alert("Customer created successfully");
}

function isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
}

async function loadCustomers() {
    const customers = await getCustomers();

    let html = `
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
    `;

    customers.forEach((c:any) => {
        html += `
        <tr>
            <td>${c.customerId}</td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
        </tr>`;
    });

    html += "</tbody></table>";

    document.getElementById("customerArea")!.innerHTML = html;
}
(window as any).showCustomerForm = showCustomerForm;
(window as any).loadCustomers = loadCustomers;
(window as any).addCustomer = addCustomer;