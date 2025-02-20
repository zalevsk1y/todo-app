# ToDoApp Backend

## Description

This is the application for a ToDo application. It provides a RESTful API for managing todos, including creating, reading, updating, and deleting tasks.  Authentication is implemented to secure the API endpoints, ensuring only authorized users can access and manipulate their todo lists.

## Deployment with Docker Compose

This application is designed to be easily deployed using Docker Compose. The provided `docker-compose.yml` file sets up two services:

*   **`backend-app`**: This service runs the main backend application, built from the Dockerfile in this repository.
*   **`mongodb`**: This service runs a MongoDB database instance to store the application's data.

### Prerequisites

*   Docker and Docker Compose installed on your machine.

### Configuration

Before deploying, you need to create a `.env` file in the same directory as your `docker-compose.yml` file and set the following environment variables:

```env
PORT=3000             # Port the backend app will listen on (and be exposed on host)
MONGODB_HOST_PRODUCTION=<Your MongoDB Connection String> # Connection string for your MongoDB production database
JWT_SECRET_PRODUCTION=<Your JWT Secret Key>        # Secret key used to sign JWT tokens for authentication
MONGO_DB_NAME_PRODUCTION=<Your MongoDB Database Name>  # Name of the MongoDB database
MONGO_USERNAME_PRODUCTION=<Your MongoDB Username>   # Username for MongoDB root user
MONGO_PASSWORD_PRODUCTION=<Your MongoDB Password>   # Password for MongoDB root user
