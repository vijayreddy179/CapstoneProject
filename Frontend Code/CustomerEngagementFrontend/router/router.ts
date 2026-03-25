import { loadDashboard } from "../components/dashboard.js";
import { showCustomerPage } from "../components/customerComponent.js";
import { showTicketPage } from "../components/ticketComponent.js";

// SPA navigation function
function navigate(page: string) {
    if (page === "dashboard") {
        loadDashboard();
    }
    else if (page === "customers") {
        showCustomerPage();
    }
    else if (page === "tickets") {
        showTicketPage();
    }
}
(window as any).navigate = navigate;
// load dashboard automatically when page loads
window.onload = () => navigate("dashboard");