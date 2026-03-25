const API="https://localhost:7226/api";

export async function getCustomers() {
    const response=await fetch(`${API}/customers`);
    return await response.json();
}

export async function createCustomer(customer:any) {
    await fetch(`${API}/customers`, {
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(customer)
    });
}

export async function getTickets() {
    const response=await fetch(`${API}/ticket`);
    return await response.json()
}

export async function createTicket(ticket:any) {
    await fetch(`${API}/ticket`, {
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(ticket)
    });
}

export async function getDashboard() {
    const res = await fetch("https://localhost:7226/api/dashboard");
    return res.json();
}