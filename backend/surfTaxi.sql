\echo 'Delete and recreate surf-taxi db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE surf-taxi;
CREATE DATABASE surf-taxi;
\connect surf-taxi

\i schema.sql
\i seed.sql

\echo 'Delete and recreate surf-taxi-test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE surf-taxi-test;
CREATE DATABASE surf-taxi-test;
\connect surf-taxi-test

\i schema.sql
