using System;

namespace CustomerEngagement.Exceptions
{
    // Thrown when invalid ticket status transition occurs
    public class InvalidTicketStatusException : Exception
    {
        public InvalidTicketStatusException(string message) : base(message)
        {
        }
    }
}