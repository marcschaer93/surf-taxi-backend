-- Run in Terminal --> psql -U marcschaer -d surf_taxi -a -f db/dbSurfTaxi.sql

-- Delete and recreate tables for surf_taxi db
DROP TABLE IF EXISTS trip_members CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Recreate tables
\i db/dbSchema.sql

-- Seed the tables
\i db/dbSeed.sql





-- $$$$$$$$ TESTS
-- Delete and recreate tables for surf_taxi_test db
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS trips CASCADE;
-- DROP TABLE IF EXISTS trip_members CASCADE;

-- -- Recreate tables for test database
-- \i schema.sql