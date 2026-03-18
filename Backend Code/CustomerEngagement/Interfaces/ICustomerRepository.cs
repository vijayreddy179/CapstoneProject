using CustomerEngagement.Models;

namespace CustomerEngagement.Interfaces
{
    // Defines data access operations for customers
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetAll();

        Customer GetById(int id);

        void Add(Customer customer);
    }
}