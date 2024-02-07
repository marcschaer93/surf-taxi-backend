-- Seed data for Users table

INSERT INTO users (username, password, first_name, last_name, email, role)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        'user'),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        'admin');


-- Seed data for Trips table

INSERT INTO trips (date, owner, start_location, destination, stops, travel_info, seats, costs)
VALUES
  ('2024-01-15', 'testuser', 'City A', 'City B', 'City C', 'Going from A to B via C', 4, '20 USD'),
  ('2024-01-20', 'testuser', 'City B', 'City C', 'City D', 'Traveling from B to C and D', 2, '15 USD'),
  ('2024-01-25', 'testadmin', 'City C', 'City D', 'City E', 'Trip from C to D with a stop at E', 3, '25 USD');


-- Seed data for Passengers table

INSERT INTO passengers (username, trip_id, reservation_status, reservation_timestamp)
VALUES
  ('testuser', 3, 'pending', '2024-01-01 12:00:00.000000' ),
  ('testadmin', 1,  'requested', '2024-01-01 12:00:00.000000'),
  ('testadmin', 2,  'confirmed', '2024-01-01 12:00:00.000000')



-- confirmed: The user's seat reservation has been confirmed.
-- pending: The reservation is pending confirmation.
-- rejected: The reservation has been rejected by the trip organizer.