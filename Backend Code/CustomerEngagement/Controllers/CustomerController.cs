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

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        // Create customer
        [HttpPost]
        public IActionResult CreateCustomer([FromBody]Customer customer)
        {
            if (customer == null)
            {
                return BadRequest("Invalid data");
            }
            if (IsValidEmail(customer.Email))
            {
                return BadRequest("Invalid Email Format");
            }
            if(service.GetCustomers().Any(x => x.Email == customer.Email))
            {
                return BadRequest("Customer already exists");
            }
            service.AddCustomer(customer);

            return Ok("Customer created");
        }
    }
}