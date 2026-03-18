using CustomerEngagement.Data;
using CustomerEngagement.Exceptions;
using CustomerEngagement.Interfaces;
using CustomerEngagement.Models;

namespace CustomerEngagement.Repositories
{
    // Handles direct database operations for customers
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CustomerDbContext context;

        public CustomerRepository(CustomerDbContext db)
        {
            context = db;
        }

        public IEnumerable<Customer> GetAll()
        {
            return context.Customers.ToList();
        }

        public Customer GetById(int id)
        {
            return context.Customers.Find(id);
        }

        public void Add(Customer customer)
        {
            var existing = context.Customers
                .FirstOrDefault(c => c.Email == customer.Email);

            if (existing != null)
            {
                throw new DuplicateCustomerException("Customer already exists");
            }

            context.Customers.Add(customer);
            context.SaveChanges();
        }
    }
}