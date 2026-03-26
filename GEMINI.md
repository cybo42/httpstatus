# httpstatus

A simple Node.js/Express application for testing and playing with HTTP status codes.

## Project Overview

- **Purpose**: Provides a way to trigger specific HTTP status codes for testing client-side error handling, content negotiation, and redirection logic.
- **Main Technologies**:
    - **Runtime**: Node.js (>= 18.0.0)
    - **Framework**: Express 5.x
    - **Testing**: Jest, Supertest
- **Architecture**:
    - `app.js`: Main entry point containing the Express application and route definitions.
    - `Procfile`: Configuration for process management (e.g., for deployment on platforms like Heroku).
    - `tests/`: Contains unit and integration (HTTP) tests.

## API Endpoints

### `GET /code/:code`
Returns a response with the HTTP status code specified by `:code`.

- **Content Negotiation**:
    - **Default**: Returns a JSON object `{ "code": :code }`.
    - **XML**: Returns an XML response if the `Accept` header contains `application/xml`.
- **Example**:
    - `GET /code/200` -> `200 OK`
    - `GET /code/404` -> `404 Not Found`

## Building and Running

### Commands
- **Start the server**: `npm start`
    - The server listens on port `8888` by default, or the port specified in the `PORT` environment variable.
- **Run tests**: `npm test`
    - Runs all tests using Jest and generates a coverage report.

## Development Conventions

- **Module System**: Uses CommonJS (`require`/`module.exports`).
- **Testing**:
    - Integration tests are located in `tests/http/` and use `supertest` to make requests against the app.
    - Unit tests are located in `tests/unit/`.
- **Style**: Standard Express application patterns with basic console logging for request tracking.
- **Deployment**: The presence of a `Procfile` indicates compatibility with platforms like Heroku or Dokku.
