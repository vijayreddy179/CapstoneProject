using CustomerEngagement.Models;

namespace CustomerEngagement.Interfaces
{
    // Defines business logic for customers
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers();

        void AddCustomer(Customer customer);
    }
}