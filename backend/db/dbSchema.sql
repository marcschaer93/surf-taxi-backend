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


-- CREATE TABLE passengers (
--   username VARCHAR(25) 
--     REFERENCES users(username) ON DELETE CASCADE,
--   trip_id INTEGER 
--     REFERENCES trips(id) ON DELETE CASCADE,
--   reservation_status VARCHAR(20), 
--   reservation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (username, trip_id)
-- );

CREATE TABLE reservations (
  username VARCHAR(25) 
    REFERENCES users(username) ON DELETE CASCADE,
  trip_id INTEGER 
    REFERENCES trips(id) ON DELETE CASCADE,
  status VARCHAR(20),  -- e.g., 'requested', 'confirmed', 'canceled'
  reservation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Additional fields to consider adding:
  -- number_of_passengers INTEGER DEFAULT 1,  -- Represents the number of people included in this reservation
  -- notes TEXT  -- Any special requests or notes related to this reservation
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


