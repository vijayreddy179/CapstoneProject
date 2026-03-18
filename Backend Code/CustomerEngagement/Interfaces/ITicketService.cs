using CustomerEngagement.Models;
using System.Collections.Generic;

namespace CustomerEngagement.Interfaces
{
    public interface ITicketService
    {
        // Add new ticket
        void Add(Ticket ticket);

        // Update ticket
        void UpdateTicket(Ticket ticket);

        // Get all tickets
        IEnumerable<Ticket> GetAllTickets();
    }
}