# Employee Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The **Employee Management System** is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to manage employee data efficiently with features like authentication (signup and login), CRUD operations (Create, Read, Update, Delete) for employee information, and real-time notifications.

This application is ideal for small and medium-sized organizations looking to maintain a database of employees with a simple and intuitive UI and secure backend.

## Features
- User authentication with JWT (JSON Web Token) stored in local storage.
- Passwords are securely hashed using bcryptjs.
- Full CRUD operations (Create, Read, Update, Delete) for employee data.
- Responsive design using Tailwind CSS.
- Form validation using Formik and Yup.
- Toast notifications for user feedback.
- Role-based access (admin functionalities for employee management).

## Technologies Used

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for the browser and node.js.
- **Formik**: A library for building forms in React with easy validation.
- **Yup**: A schema validation library for form validation.
- **React Hot Toast**: A notification library for React.
- **React Icons**: Popular icons used in React.
- **React Router Dom**: Declarative routing for React applications.
- **React Toastify**: Toast notifications for React.

### Backend:
- **Node.js**: JavaScript runtime for building fast, scalable server applications.
- **Express.js**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **bcryptjs**: Password hashing library.
- **JWT (jsonwebtoken)**: Used for authentication and authorization.
- **cors**: Middleware to enable CORS.
- **dotenv**: Environment variable management.

## Installation

### Prerequisites:
Make sure you have the following installed:
- Node.js
- MongoDB
- Git

### Steps to Set Up Locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd employee-management-system
