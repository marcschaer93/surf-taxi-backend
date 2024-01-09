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
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  date DATE,
  start_location TEXT,
  destination TEXT,
  stops TEXT,
  travel_info TEXT,
  seats INTEGER,
  costs TEXT
);

CREATE TABLE trip_members (
  username VARCHAR(25) 
    REFERENCES users(username) ON DELETE CASCADE,
  trip_id INTEGER 
    REFERENCES trips(id) ON DELETE CASCADE,
  is_trip_creator BOOLEAN,
  request_status VARCHAR(20),
  PRIMARY KEY (username, trip_id)
);

  -- request_status ENUM('pending', 'approved', 'rejected') DEFAULT NULL,
