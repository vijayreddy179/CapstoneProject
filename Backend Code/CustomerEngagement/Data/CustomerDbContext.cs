using CustomerEngagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerEngagement.Data
{
    // DbContext manages database interaction using Entity Framework
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options)
         : base(options)
        {
        }
        // Database tables mapped to models
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<TicketCategory> TicketCategories { get; set; }
    }
}