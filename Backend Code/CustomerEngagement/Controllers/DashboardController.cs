using Microsoft.AspNetCore.Mvc;
using CustomerEngagement.Data;
using System.Linq;

namespace CustomerEngagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly CustomerDbContext _context;

        public DashboardController(CustomerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetDashboard()
        {
            var result = new
            {
                totalTickets = _context.Tickets.Count(),
                openTickets = _context.Tickets.Count(t => t.Status == "Open"),
                inProgressTickets = _context.Tickets.Count(t => t.Status == "InProgress"),
                closedTickets = _context.Tickets.Count(t => t.Status == "Closed")
            };

            return Ok(result);
        }
    }
}