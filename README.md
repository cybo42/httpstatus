# httpstatus

A simple Node.js and Express application designed for testing and experimenting with HTTP status codes. This tool allows you to trigger specific status codes and observe how your client-side applications or infrastructure (like load balancers or proxies) handle them.

## Features

- **Dynamic Status Codes**: Return any HTTP status code by simply changing the URL.
- **Content Negotiation**: Supports both JSON (default) and XML responses based on the `Accept` request header.
- **Lightweight**: Minimal dependencies, built on Express 5.x.
- **Test-Ready**: Includes a comprehensive test suite using Jest and Supertest.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- npm (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/cybo42/httpstatus.git
    cd httpstatus
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the server locally:

```bash
npm start
```

By default, the application will listen on port `8888`. You can customize this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

## API Usage

### `GET /code/:code`

Returns the HTTP status code specified in the URL path.

#### Example Requests

**JSON Response (Default)**
```bash
curl -i http://localhost:8888/code/404
```

**XML Response**
```bash
curl -i -H "Accept: application/xml" http://localhost:8888/code/200
```

#### Response Format

- **JSON**: `{"code": 200}`
- **XML**: 
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <response>
    <code>200</code>
  </response>
  ```

## Testing

The project uses [Jest](https://jestjs.io/) for testing and [Supertest](https://github.com/ladjs/supertest) for HTTP assertions.

To run the tests:

```bash
npm test
```

This will run all unit and integration tests and generate a coverage report in the `coverage/` directory.

## License

This project is open-source. (Check for a LICENSE file for specific terms).
