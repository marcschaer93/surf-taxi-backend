# Surf Taxi Backend

Welcome to the backend repository of Surf Taxi, the core engine driving the application designed for surfers across Europe to find and offer shared lifts to surf spots. This component manages data, user interactions, and trip coordination, ensuring a seamless and efficient user experience.

## Overview

The backend of Surf Taxi is crafted to support the dynamic needs of the surfing community. It handles user authentication, trip management, and notifications, enabling users to easily plan their surf trips.

### Technology Stack

- **Node.js**: Serves as the runtime environment for the backend, offering scalability and performance.
- **Express.js**: Simplifies the creation of the server API, making it more manageable and robust.
- **PostgreSQL**: Chosen for its reliability and comprehensive feature set for data storage and retrieval.

## Project Structure

This repository contains all necessary code for the backend operations of Surf Taxi, including API endpoints, database interactions, and authentication logic.

## Setup Instructions

### Database Setup

1. Create the Surf Taxi database: `createdb surf_taxi`.
2. Initialize the database with the provided schema: `psql -U [username] -d surf_taxi -f dbSetup.sql`.

For detailed information on the database schema, refer to the `docs/databaseSchema.md`.

### Starting the Backend

1. Navigate to the surf-taxi-backend directory: `cd surf-taxi-backend`.
2. Install dependencies: `npm install`.
3. Start the server: `npm start` (Listens on port 3001 by default).

### Testing the Backend

Ensure the backend functions as expected by running comprehensive tests:

1. Set up a dedicated test database: `createdb surf_taxi_test`.
2. Initialize the test database: `psql -U [username] -d surf_taxi_test -f dbSetupTests.sql`.
3. Install testing dependencies: `npm install --save-dev jest supertest`.
4. Execute tests: `npm test`.

## API Overview

The backend API offers various endpoints to manage trips, users, and notifications. Here's a brief overview:

- `/trips`: Lists all available trips or post a new trip.
- `/trips/:id`: Get, update, or delete a specific trip.
- `/users`: User registration and profile management.
- `/auth/login`: Authentication for users.
- `/notifications`: Manage notifications for trip updates.

Detailed API documentation is available in the `docs/api.md`.

## Deployment

The backend is deployed to Render, ensuring high availability and performance. Access the API at [https://surf-taxi-backend.onrender.com/](https://surf-taxi-backend.onrender.com/).

## Author

**Marc Schaer**

I'm here to help with any questions or feedback:

- Email: marc.schaer93@gmail.com
- LinkedIn: [https://www.linkedin.com/in/marc-sch%C3%A4r-216283262/](https://www.linkedin.com/in/marc-sch%C3%A4r-216283262/)
