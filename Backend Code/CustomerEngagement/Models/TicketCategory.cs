using System.ComponentModel.DataAnnotations;

namespace CustomerEngagement.Models
{
    // Represents ticket categories
    public class TicketCategory
    {
        [Key]
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }
    }
}