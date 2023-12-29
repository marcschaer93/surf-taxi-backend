-- Delete and recreate surf_taxi db
DROP DATABASE IF EXISTS surf_taxi;
CREATE DATABASE surf_taxi;

-- Connect to surf_taxi
\connect surf_taxi

-- Create schema
\i schema.sql

-- Seed the database
\i seed.sql

-- Delete and recreate surf-taxi-test db
DROP DATABASE IF EXISTS surf_taxi_test;
CREATE DATABASE surf_taxi_test;

-- Connect to surf_taxi_test
\connect surf_taxi_test

-- Create schema for test database
\i schema.sql
