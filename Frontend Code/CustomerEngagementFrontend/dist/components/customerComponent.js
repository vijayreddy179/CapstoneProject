var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createCustomer, getCustomers } from "../services/apiService.js";
export function showCustomerPage() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("app").innerHTML = `
    <h2>Customers</h2>
    <button onclick="showCustomerForm()" class="btn btn-primary">Add Customer</button>
    <button onclick="loadCustomers()" class="btn btn-secondary">View Customers</button>
    <div id="customerArea"></div>
    `;
    });
}
function showCustomerForm() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("customerArea").innerHTML = `
    <input id="name" class="form-control mb-2"placeholder="Customer Name">
    <input id="email" class="form-control mb-2"placeholder="Email">
    <input id="phone" class="form-control mb-2"placeholder="Phone">
    <button onclick="addCustomer()" class="btn btn-success">Save</button>
    `;
    });
}
function addCustomer() {
    return __awaiter(this, void 0, void 0, function* () {
        const customer = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value
        };
        if (!customer.name || !customer.email) {
            alert("Name and Email are required");
            return;
        }
        const existing = yield getCustomers();
        const duplicate = existing.find((c) => c.email === customer.email);
        if (duplicate) {
            if (!isValidEmail(customer.email)) {
                alert("Invalid email format");
                return;
            }
            alert("Customer already exists!");
            return;
        }
        yield createCustomer(customer);
        if (!isValidEmail(customer.email)) {
            alert("Invalid email format");
            return;
        }
        alert("Customer created successfully");
    });
}
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function loadCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        const customers = yield getCustomers();
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
        customers.forEach((c) => {
            html += `
        <tr>
            <td>${c.customerId}</td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
        </tr>`;
        });
        html += "</tbody></table>";
        document.getElementById("customerArea").innerHTML = html;
    });
}
window.showCustomerForm = showCustomerForm;
window.loadCustomers = loadCustomers;
window.addCustomer = addCustomer;
