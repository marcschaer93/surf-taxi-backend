-- Run in Terminal --> psql -U marcschaer -d surf_taxi_test -a -f db/dbSetupTests.sql

-- TESTS

\echo 'TESTS: Delete and recreate tables for surf_taxi_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- Delete and recreate tables for surf_taxi_test db
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Recreate tables
\i db/dbSchema.sql

-- Seed the tables
-- \i db/dbSeed.sql