using CustomerEngagement.Interfaces;
using CustomerEngagement.Models;
using CustomerEngagement.Repositories;
using System.Collections.Generic;

namespace CustomerEngagement.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository repository;

        public TicketService(ITicketRepository repository)
        {
            this.repository = repository;
        }

        // Add ticket
        public void Add(Ticket ticket)
        {
            repository.Add(ticket);
        }

        // Update ticket
        public void UpdateTicket(Ticket ticket)
        {
            repository.Update(ticket);
        }

        // Get all tickets
        public IEnumerable<Ticket> GetAllTickets()
        {
            return repository.GetAll();
        }
    }
}