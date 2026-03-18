// SPA navigation function
function navigate(page) {
    if (page === "dashboard") {
        loadDashboard();
    }
    if (page === "customers") {
        showCustomerPage();
    }
    if (page === "tickets") {
        showTicketPage();
    }
}
// load dashboard automatically when page loads
window.onload = () => navigate("dashboard");
