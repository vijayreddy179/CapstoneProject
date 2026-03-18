using CustomerEngagement.Models;

namespace CustomerEngagement.Interfaces
{
    public interface ITicketRepository
    {
        IEnumerable<Ticket> GetAll();

        Ticket GetById(int id);

        void Add(Ticket ticket);

        void Update(Ticket ticket);
    }
}