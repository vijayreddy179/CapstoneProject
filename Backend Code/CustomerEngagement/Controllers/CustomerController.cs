using Microsoft.AspNetCore.Mvc;
using CustomerEngagement.Interfaces;
using CustomerEngagement.Models;

namespace CustomerEngagement.Controllers
{
    [ApiController]
    [Route("api/customers")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService service;

        public CustomersController(ICustomerService s)
        {
            service = s;
        }

        // GET all customers
        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(service.GetCustomers());
        }

        // Create customer
        [HttpPost]
        public IActionResult CreateCustomer(Customer customer)
        {
            service.AddCustomer(customer);

            return Ok("Customer created");
        }
    }
}