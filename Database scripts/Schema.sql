CREATE DATABASE CustomerSupportDB;
GO

USE CustomerSupportDB;
GO

-- Drop dependent tables first (because of foreign keys)
DROP TABLE IF EXISTS Tickets;
DROP TABLE IF EXISTS Agents;
DROP TABLE IF EXISTS TicketCategories;
DROP TABLE IF EXISTS Customers;
GO


-- ================================
-- Customers Table
-- Stores customer information
-- ================================
CREATE TABLE Customers
(
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,  -- Primary key for customer
    Name NVARCHAR(100) NOT NULL,               -- Customer full name
    Email NVARCHAR(100) UNIQUE NOT NULL,       -- Unique email prevents duplicate customer creation
    Phone NVARCHAR(20),                        -- Contact number
    CreatedDate DATETIME DEFAULT GETDATE()     -- Automatically records when customer was created
);


-- ================================
-- Agents Table
-- Support agents who handle tickets
-- ================================
CREATE TABLE Agents
(
    AgentId INT IDENTITY(1,1) PRIMARY KEY,  -- Primary key for agent
    AgentName NVARCHAR(100) NOT NULL,       -- Agent name
    Email NVARCHAR(100)                     -- Agent email
);


-- ================================
-- Ticket Categories
-- Helps classify tickets
-- ================================
CREATE TABLE TicketCategories
(
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,  -- Category identifier
    CategoryName NVARCHAR(100) NOT NULL        -- Category description
);
INSERT INTO TicketCategories (CategoryName)
VALUES
('Technical Issue'),
('Billing Issue'),
('Transaction Issue'),
('General Inquiry');


-- ================================
-- Tickets Table
-- Stores support requests
-- ================================
CREATE TABLE Tickets
(
    TicketId INT IDENTITY(1,1) PRIMARY KEY,   -- Unique identifier for each ticket
    AgentId INT NOT NULL,
    CustomerId INT NOT NULL,                  -- Foreign key referencing Customers table
    CategoryId INT NOT NULL,                  -- Foreign key referencing TicketCategories
    Description NVARCHAR(500),                -- Description of customer issue
    Status NVARCHAR(50) DEFAULT 'Open',       -- Ticket workflow status (Open / InProgress / Closed)
    CreatedDate DATETIME DEFAULT GETDATE(),   -- Timestamp when ticket was created
    ResolvedDate DATETIME NULL,               -- Timestamp when ticket is resolved

    CONSTRAINT FK_Ticket_Customer
        FOREIGN KEY (CustomerId)
        REFERENCES Customers(CustomerId),

    CONSTRAINT FK_Ticket_Category
        FOREIGN KEY (CategoryId)
        REFERENCES TicketCategories(CategoryId)
);

-- Index for faster ticket search by customer
CREATE INDEX IDX_Tickets_CustomerId
ON Tickets(CustomerId);

-- Index for filtering tickets by status (Open / Closed)
CREATE INDEX IDX_Tickets_Status
ON Tickets(Status);

-- Index for filtering tickets by creation date (useful for analytics)
CREATE INDEX IDX_Tickets_CreatedDate
ON Tickets(CreatedDate);

-- Prevent invalid ticket status values

ALTER TABLE Tickets
ADD CONSTRAINT CK_Ticket_Status
CHECK (Status IN ('Open','InProgress','Closed'));

-- Declare variables for testing
DECLARE @CustomerId INT = 1;
DECLARE @Description NVARCHAR(500) = 'Transaction issue';




INSERT INTO Customers (Name, Email, Phone, CreatedDate)
VALUES  ('Vijay','vijay@gmail.com','9876543210','2026-03-14 10:49:03.263'),
        ('Arjun','arjun@gmail.com','9012345678','2026-03-14 10:58:58.456'),
        ('Vikram','vikram@gmail.com','9801234567','2026-03-14 11:49:34.167'),
        ('Vinay','vinay@gmail.com','7890123456','2026-03-14 16:49:56.532'),
        ('Akshith','akshith@gmail.com','6789012345','2026-03-15 11:23:11.567'),
        ('Bhanu','bhanu@gmail.com','5678901234','2026-03-16 10:01:18.010'),
        ('Priya','priya@gmail.com','9087654321','2026-03-16 15:31:15.023'),
        ('Pooja','pooja@gmail.com','9807654321','2026-03-17 08:02:14.456'),
        ('Sneha','sneha@gmail.com','9098776543','2026-03-17 12:34:06.045'),
        ('Karan','karan@gmail.com','3214567890','2026-03-17 14:15:02.053');


INSERT INTO Agents (AgentName, Email)
VALUES ('Vijay Reddy','vijay@support.com'),
       ('Deepak','deepak@support.com'),
       ('Suresh','suresh@support.com');

INSERT INTO TicketCategories(CategoryName)
VALUES ('Transaction Issue'),
       ('Login Issue'),
       ('Payment Issue'),
       ('Technical Issue');

INSERT INTO Tickets (AgentId, CustomerId, CategoryId, Description, Status, ResolvedDate)
VALUES (1,1,1,'UPI transaction failed','Open',GETDATE()),
       (2,2,2,'Unable to login to account','Closed',GETDATE()),
       (3,3,3,'Payment deducted but not processed','InProgress',GETDATE()),
       (1,4,4,'Application crashing frequently','Open',GETDATE()),
       (2,5,1,'Bank transfer not reflecting','Closed',GETDATE()),
       (3,6,2,'Password reset link not working','InProgress',GETDATE()),
       (1,7,3,'Card payment declined','Open',GETDATE()),
       (2,8,4,'Website loading very slow','Closed',GETDATE()),
       (3,9,1,'UPI payment timeout issue','Inprogress',GETDATE()),
       (1,10,2,'OTP not received during login','Open',GETDATE());

UPDATE Tickets
SET 
    ResolvedDate = 
        CASE 
            WHEN Status = 'Closed' THEN GETDATE()
            ELSE NULL
        END;

SELECT * FROM Customers;
SELECT * FROM Agents;

UPDATE Tickets
SET ResolvedDate = DATEADD(HOUR,3,CreatedDate)
WHERE Status = 'Closed';

SELECT 
    TicketId,
    AgentId,
    CustomerId,
    CategoryId,
    Description,
    Status,
    ResolvedDate
FROM Tickets;

ALTER TABLE Tickets
ALTER COLUMN AgentId INT NULL;