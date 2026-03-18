using CustomerEngagement.Interfaces;
using CustomerEngagement.Models;
using CustomerEngagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace CustomerEngagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService ticketService;

        public TicketController(ITicketService ticketService)
        {
            this.ticketService = ticketService;
        }

        [HttpGet]
        public IActionResult GetTickets()
        {
            var tickets = ticketService.GetAllTickets();
            return Ok(tickets);
        }
        [HttpPost]
        public IActionResult CreateTicket([FromBody] Ticket ticket)
        {
            ticket.CreatedDate = DateTime.Now;
            ticket.Status = "Open";

            ticketService.Add(ticket);

            return Ok(ticket);
        }
    }
}