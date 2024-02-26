# Surf Taxi

## Full Stack Application

## Overview

Surf Taxi is the go-to application for surfers across Europe who are looking for a shared lift/carpool to a surfspot.

Built on the understanding that the perfect wave is always shifting and that surfers often traverse the coast in campervans or cars to chase those waves.

Furthermore, many surfers are landlocked and are looking for a ride to the coastline.

This basically means that the modern surfer drives a lot from A to B and back and forth. So there are many potential ride opportunities.

## Technologies

- **Frontend**: React, Material UI for styling
- **Backend**: Node.js, Express.js for creating the API
- **Database**: PostgreSQL for data storage
- **Testing**: Jest and Supertest for backend & vite-test for frontend

## Project Structure

- `backend/`: Contains the API and data management logic.
- `frontend/`: Houses the React application for user interfaces.

## Setup Instructions

### Backend

#### Database Setup:

1. Create the Surf Taxi database: `createdb surf-taxi`
2. Initialize the database: `psql -U [psql username] -d surf-taxi -f dbSetup.sql`

#### Starting the Backend:

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start` (Runs on port 3001)

### Frontend

#### Environment Setup:

- Ensure the backend URL is set correctly in the frontend code to connect to `http://localhost:3001`.

#### Running the Frontend:

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the app: `npm start` (Access at `http://localhost:3000`)

### Testing the Backend

- Ensure Jest and Supertest are installed: `npm install --save-dev jest supertest`
- Run tests: `npm test`

### Testing the Frontend

...

## Using the API

The backend API supports various endpoints for trips, passengers, notifications, authentication and user profiles. Detailed API documentation and examples can be found in the provided Postman collection.

### Routes

- `/`: Homepage
- `/companies`: Lists all companies
- `/companies/apple`: View details of a specific company
- `/jobs`: Lists all available jobs
- `/login`: Login/signup page
- `/signup`: Signup form
- `/profile`: Edit profile page

## Deployment

The application is deployed on Render:

- **Backend**: [https://surf-taxi-api.onrender.com](https://surf-taxi-api.onrender.com)
- **Frontend**: [https://surf-taxi.onrender.com](https://surf-taxi.onrender.com)

## Author

Marc Schaer - Feel free to reach out for any questions or feedback.
