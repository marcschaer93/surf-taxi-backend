-- Seed data for Users table
INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

-- Seed data for Trips table
INSERT INTO trips (date, start_location, destination, stops, travel_info, seats, costs)
VALUES
  ('2024-01-15', 'City A', 'City B', 'City C', 'Going from A to B via C', 4, '20 USD'),
  ('2024-01-20', 'City B', 'City C', 'City D', 'Traveling from B to C and D', 2, '15 USD'),
  ('2024-01-25', 'City C', 'City D', 'City E', 'Trip from C to D with a stop at E', 3, '25 USD');

-- Seed data for TripMembers table
INSERT INTO trip_members (username, trip_id, is_trip_creator, request_status)
VALUES
  ('testuser', 1, TRUE, 'approved'),
  ('testadmin', 2, FALSE, 'pending'),
  ('testadmin', 3, FALSE, 'rejected')
