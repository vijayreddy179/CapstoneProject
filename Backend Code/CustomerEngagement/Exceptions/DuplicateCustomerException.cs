using CustomerEngagement.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CustomerEngagement.Exceptions
{
    // Custom exception thrown when a duplicate customer is detected
    public class DuplicateCustomerException : Exception
    {
        public DuplicateCustomerException(string message) : base(message)
        {
        }
    }
}