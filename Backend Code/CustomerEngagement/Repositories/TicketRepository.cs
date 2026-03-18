using CustomerEngagement.Data;
using CustomerEngagement.Interfaces;
using CustomerEngagement.Models;

namespace CustomerEngagement.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly CustomerDbContext context;
        public TicketRepository(CustomerDbContext db)
        {
            context = db;
        }
        public IEnumerable<Ticket> GetAll()
        {
            return context.Tickets.ToList();
        }
        public Ticket GetById(int id)
        {
            return context.Tickets.Find(id);
        }
        public void Add(Ticket ticket)
        {
            context.Tickets.Add(ticket);
            context.SaveChanges();
        }
        public void Update(Ticket ticket)
        {
            context.Tickets.Update(ticket);
            context.SaveChanges();
        }
    }
}