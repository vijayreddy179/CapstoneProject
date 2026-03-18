DROP PROCEDURE IF EXISTS CreateTicket;
GO

CREATE PROCEDURE CreateTicket
    @CustomerId INT,
    @CategoryId INT,
    @AgentId INT,
    @TicketId VARCHAR(200),
    @Description VARCHAR(500)
AS
BEGIN
INSERT INTO Tickets(CustomerId,CategoryId,AgentId,TicketId,Description,Status)
VALUES(@CustomerId,@CategoryId,@AgentId,@TicketId,@Description,'Open')
END