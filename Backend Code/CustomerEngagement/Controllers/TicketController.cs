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
            if(ticket == null)
            {
                return BadRequest();
            }
            ticket.CreatedDate = DateTime.Now;
            if(ticket.Status == "Closed")
            {
                ticket.ResolvedDate = DateTime.Now;
            }else
            {
                ticket.ResolvedDate = null;
            }

            ticketService.Add(ticket);

            return Ok(ticket);
        }
    }
}