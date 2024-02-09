CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1), 
  gender VARCHAR(10),
  birth_year INTEGER,
  phone VARCHAR(15),
  instagram TEXT,
  facebook TEXT,
  country VARCHAR(20),
  languages TEXT,
  profile_img_url TEXT,
  bio TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  favorite_ids INTEGER[] DEFAULT NULL
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY, 
  owner TEXT REFERENCES users(username),  -- Reference to the user organizing the trip
  date TIMESTAMP,
  start_location TEXT,
  destination TEXT,
  stops TEXT,
  travel_info TEXT,
  seats INTEGER,
  costs TEXT
);


CREATE TABLE passengers (
  username VARCHAR(25) 
    REFERENCES users(username) ON DELETE CASCADE,
  trip_id INTEGER 
    REFERENCES trips(id) ON DELETE CASCADE,
  reservation_status VARCHAR(20), 
  reservation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (username, trip_id)
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  sender_username VARCHAR(25),  -- Represents the user who sends the notification (e.g., sends a join request)
  recipient_username VARCHAR(25),  -- Represents the user who receives the notification (e.g., owner of the trip)
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE,
  trip_id INTEGER
    REFERENCES trips(id) ON DELETE CASCADE,
  is_join_request BOOLEAN DEFAULT FALSE,
  is_approval BOOLEAN DEFAULT FALSE,
  email_contact BOOLEAN DEFAULT FALSE
);


-- -- Add the trigger and function
-- CREATE OR REPLACE FUNCTION notify_user()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     notification_message TEXT;
--     sender_username TEXT;
--     recipient_username TEXT;
-- BEGIN
--     -- Check if the reservation status is switched to 'requested'
--     IF NEW.reservation_status = 'requested' THEN
--         -- Create a notification message for a new join request
--         notification_message := 'You have a new join request for your trip.';
--         -- Set sender username as the user who made the join request
--         sender_username := NEW.username;
--         -- Set recipient username as the trip owner
--         recipient_username := (SELECT owner FROM trips WHERE id = NEW.trip_id);
--     -- Check if the reservation status is switched to 'pending' or 'confirmed'
--     ELSIF NEW.reservation_status = 'pending' OR NEW.reservation_status = 'confirmed' THEN
--         -- Create a notification message for pending approval or confirmed reservation
--         IF NEW.reservation_status = 'pending' THEN
--             notification_message := 'Your trip join request is pending approval.';
--         ELSE
--             notification_message := 'Your seat reservation has been confirmed.';
--         END IF;
--         -- Set sender username as the trip owner
--         sender_username := (SELECT owner FROM trips WHERE id = NEW.trip_id);
--         -- Set recipient username as the user who made the join request
--         recipient_username := NEW.username;
--     END IF;

--     -- Insert a new row into the notifications table
--     INSERT INTO notifications (sender_username, recipient_username, message, timestamp, is_read, trip_id, is_join_request, is_approval, email_contact)
--     VALUES (sender_username, recipient_username, notification_message, CURRENT_TIMESTAMP, FALSE, NEW.trip_id, TRUE, FALSE, FALSE);

--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;




-- -- Create the trigger that calls the function
-- CREATE TRIGGER passenger_trigger
-- AFTER INSERT ON passengers
-- FOR EACH ROW
-- EXECUTE FUNCTION notify_user();

-- -- Create the trigger that calls the function after update
-- CREATE TRIGGER passenger_update_trigger
-- AFTER UPDATE ON passengers
-- FOR EACH ROW
-- EXECUTE FUNCTION notify_user();



-- reservation status: 

-- Requested: "You've requested to join this trip."
-- Pending: "You're in touch! Waiting for organizer approval."
-- Confirmed: "Seat secured! Your spot on this trip is confirmed."

-- Declined: "Request declined. Your spot on this trip is not confirmed."

