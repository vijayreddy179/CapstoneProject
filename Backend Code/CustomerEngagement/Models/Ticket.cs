namespace CustomerEngagement.Models
{
    // Represents a service ticket
    public class Ticket
    {
        public int TicketId { get; set; }

        public int CustomerId { get; set; }

        public int CategoryId { get; set; }

        public string Description { get; set; }

        public string Status { get; set; } = "Open";
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? ResolvedDate { get; set; }
    }
}