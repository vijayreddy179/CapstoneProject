using CustomerEngagement.Interfaces;
using CustomerEngagement.Models;
using CustomerEngagement.Exceptions;

namespace CustomerEngagement.Services
{
    // Business logic for customer operations
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository repository;

        public CustomerService(ICustomerRepository repo)
        {
            repository = repo;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            return repository.GetAll();
        }

        public void AddCustomer(Customer customer)
        {
            // Check duplicate email
            if (repository.GetAll().Any(c => c.Email == customer.Email))
            {
                throw new DuplicateCustomerException("Customer already exists");
            }

            repository.Add(customer);
        }
    }
}