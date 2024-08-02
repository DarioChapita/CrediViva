# Shopping Cart Application

## Description

This project is a shopping cart application developed using React, Redux, and Vite for the frontend, and Node.js, Express, JWT, Mongoose, and MongoDB for the backend. The application allows users to view a list of products, add products to the cart, modify the quantity of products in the cart, remove products from the cart, and create an order with the selected products.

## Technologies Used

### Frontend
- **React**: Library for building user interfaces.
- **Redux**: Library for state management.
- **Vite**: Build tool for modern web applications.
- **Tailwind CSS**: CSS framework for responsive and accessible design.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **JWT (jsonwebtoken)**: Implementation of JSON Web Tokens for authentication.
- **Mongoose**: ODM for MongoDB.
- **MongoDB**: NoSQL database.
- **Docker**: Container to run a MongoDB instance on port 27018.

## Architecture

The project follows the MVC (Model-View-Controller) design pattern for both the frontend and backend.

## Security

Several security measures have been implemented:
- **JWT**: Secure authentication using JSON Web Tokens.
- **Input Sanitization**: All user inputs are sanitized to prevent injections.
- **Data Validation**: Data types are validated on all endpoints.
- **Rate Limiting**: A rate limit is applied to prevent denial-of-service (DDoS) attacks.
- **Helmet**: Middleware to secure HTTP headers.
- **Joi**: Data schema validation.

## API Endpoints

The backend is built using Node.js and Express, and provides the following RESTful endpoints:

### Cart Endpoints

- **`GET /`**: Retrieve the current cart
  - **Method**: `GET`
  - **Authentication**: Required
  - **Description**: Fetches the contents of the user's cart.

- **`POST /add`**: Add a product to the cart
  - **Method**: `POST`
  - **Authentication**: Required
  - **Request Body**: Product details and quantity
  - **Description**: Adds a specified product to the cart.

- **`PUT /update`**: Update the quantity of a product in the cart
  - **Method**: `PUT`
  - **Authentication**: Required
  - **Request Body**: Product ID and new quantity
  - **Description**: Updates the quantity of a product in the cart.

- **`POST /checkout`**: Create an order with the products in the cart
  - **Method**: `POST`
  - **Authentication**: Required
  - **Request Body**: Order details
  - **Description**: Finalizes the cart contents into an order.

### User Authentication Endpoints

- **`POST /register`**: Register a new user
  - **Method**: `POST`
  - **Description**: Registers a new user in the system.

- **`POST /login`**: Authenticate a user and issue a token
  - **Method**: `POST`
  - **Description**: Authenticates a user and returns a JWT token.

### Product Endpoints

- **`GET /`**: Retrieve all products
  - **Method**: `GET`
  - **Description**: Fetches a list of all products available.

- **`GET /:id`**: Retrieve a single product by ID
  - **Method**: `GET`
  - **Description**: Fetches details of a single product identified by the ID.

- **`POST /`**: Create a new product
  - **Method**: `POST`
  - **Request Body**: Product details
  - **Description**: Adds a new product to the catalog.

- **`PUT /:id`**: Update an existing product by ID
  - **Method**: `PUT`
  - **Request Body**: Updated product details
  - **Description**: Updates details of an existing product identified by the ID.


## State Management

State management in the frontend is handled using Redux, allowing efficient and centralized management of the application's state.

## Frontend and Backend Integration

The frontend consumes the backend's RESTful APIs using Axios. CORS configuration allows communication between the server and the client.

## Libraries Used

- **express**: Web framework for Node.js.
- **cors**: Middleware to enable CORS.
- **dotenv**: Environment variable management.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: JWT implementation.
- **mongoose**: ODM for MongoDB.
- **helmet**: Security middleware.
- **joi**: Data validation.
- **express-winston**: Logger for Express.
- **express-rate-limit**: Middleware to limit request rate.
- **supertest**: Library for integration tests.

## Versions

- **Node.js**: v20
- **nvm**: v7

## Usability

The user interface has been designed to be responsive and accessible using Tailwind CSS, prioritizing user experience. The application has been tested on multiple devices to ensure a smooth and consistent experience.

## Using Docker

To facilitate the setup and execution of the MongoDB database, Docker was used to run a MongoDB container on port 27018.

### Docker Setup

1. Install Docker: If you don't have Docker installed, you can download and install it from [here](https://www.docker.com/get-started).

2. Run the MongoDB container:
   ```sh
   docker run --name mongodb -d -p 27018:27017 mongo
   ```

   ## How to Run the Project

### Prerequisites

- Node.js v20
- npm or yarn
- Docker

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
  ```
2. Navigate to the project directory:
   ```sh
   cd <project-name>
  ```
3. Install dependencies:
    ```sh
   npm install
  ```
### Configuration

Create a .env file in the root of the project with the following environment variables:

```sh
MONGO_URI=mongodb://localhost:27018/<your-database-name>
JWT_SECRET=<your-jwt-secret>
```

### Running
To run the frontend:
    ```sh
   npm run dev
  ```
### To run the backend:
```sh
   npm start
 ```
### Testing
To run the tests:
```sh
   npm test
 ```

### Author
### Darío
### License
This project is licensed under the MIT License.
