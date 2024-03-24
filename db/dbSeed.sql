-- Seed data for Users table


-- run in node REPL
-- const bcrypt = require('bcrypt');
-- bcrypt.hash('Marc1993', 10).then(hash => console.log(hash));


INSERT INTO users (username, password, first_name, last_name, email, role)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        'user'),
        ('marcschaer',
        '$2b$10$lIlGuK9yjlgDkTKLvjpz2.IjqTszZYhACMSmq/HRi4RUns3E4ktpa',
        'Marc',
        'Schär',
        'marc@maccaroni.com',
        'user'),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        'admin');


-- Seed data for Trips table

INSERT INTO trips (date, owner, origin_city, origin_country_code, destination_city, destination_country_code, stops, travel_info, seats, costs)
VALUES
  ('2024-03-15', 'testuser', 'Interlaken', 'CH', 'Somo', 'ES', 'Hossegor', 'Going from Interlaken to Somo via Hossegor', 2, 'Free');
  
  ('2024-03-15', 'testuser', 'Imsoune', 'MA', 'El Palmar', 'ES', 'Asilah', 'On the way home', 1, 'Split Gas & Toll');

  -- ('2024-05-20', 'testuser', 'City B', 'City C', 'City D', 'Traveling from B to C and D', 2, '15 USD'),
  -- ('2024-07-25', 'testadmin', 'City C', 'City D', 'City E', 'Trip from C to D with a stop at E', 3, '25 USD');


-- Seed data for Reservations table

INSERT INTO reservations (username, trip_id, status, reservation_timestamp)
VALUES
  -- ('testadmin', 1, 'pending', '2024-01-01 12:00:00.000000' ),
  -- ('testadmin', 1,  'requested', '2024-01-01 12:00:00.000000'),
  -- ('testadmin', 2,  'confirmed', '2024-01-01 12:00:00.000000')




-- [i] reservation status: 

-- Requested: "You've requested to join this trip."
-- Pending: "You're in touch! Waiting for organizer approval."
-- Confirmed: "Seat secured! Your spot on this trip is confirmed."
-- Rejected: "Request declined. Your spot on this trip is not confirmed."