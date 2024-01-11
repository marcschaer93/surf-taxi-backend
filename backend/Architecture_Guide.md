// Models:
// - Handle interactions with the database or data management.
// - Define data structure, validation, and relationships (ORM).
// - Conduct CRUD (Create, Read, Update, Delete) operations.

// Controllers:
// - Manage the application's logic, acting as intermediaries between
// routes and models.
// - Handle and process incoming requests, perform necessary data
// manipulations, and orchestrate application flow.
// - Prepare data for views or send responses back to clients.

// Routes:
// - Define application endpoints (URLs) and HTTP request methods.
// - Map incoming requests to specific controller functions.
// - Handle the request-response cycle and middleware for validations,
// authentication, and authorization.

// What Belongs Here:
// - Models: Database interactions, data structures, validations.
// - Controllers: Application logic, request handling, data processing.
// - Routes: Endpoint definition, request handling, and mapping to controllers.

// What Doesn't Belong Here:
// - Models: Presentation logic, direct responses to HTTP requests.
// - Controllers: Database operations, direct access to the database.
// - Routes: Business logic, direct interactions with the database.

Use HTTP status code 200 for successful requests that retrieve or update a resource.
Use HTTP status code 201 for successful requests that create a new resource on the server.
Use HTTP status code 202 for requests that have been accepted for processing but the processing has not yet been completed.
Use HTTP status code 204 for successful requests that delete a resource or do not have any content to return.
