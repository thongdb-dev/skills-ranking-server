# Skill Ranking Server Project

A web application built with **Node.js**, **Express**, and **Mongoose** for interacting with a MongoDB database.

1. [Features](#features)
2. [Live Demo](#live-demo)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Project](#running-the-project)
6. [API Documentation](#api-documentation)
7. [Environment Variables](#environment-variables)

## Features

- 🌐 **RESTful API**: Built with Express.js
- 💾 **MongoDB Integration**: Using Mongoose for data modeling
- 🔑 **Authentication**: JWT-based user authentication (if applicable)
- 🛠 **MVC Architecture**: Organized project structure

## Live Demo

Check out the live demo of the project here:

[Live Demo](https://skills-ranking-ui.vercel.app/)


## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/) (Recommended: version 14 or later)
- **npm** or **yarn**: Package manager (npm is bundled with Node.js)
- **MongoDB**: Ensure MongoDB is installed and running locally, or have access to a cloud MongoDB instance (e.g., MongoDB Atlas)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thongdb-dev/skills-ranking-server
   cd skills-ranking-server
   ```
  
2. Install the dependencies:
   If you're using ```npm```:

   ```bash
   npm install
   ```

   Or if you're using ```yarn```:
   
   ```bash
    yarn install
   ```

## Running the Project

  1. Ensure MongoDB is running locally or provide a remote MongoDB connection string in the environment variables.
  
  2. Start the application:

  ```bash
  npm run start
  # or
  yarn start
  ```

  Your application should now be running on [http://localhost:3000](http://localhost:3000).

## API Documentation

  Example Endpoints

  + **POST /api/v1/auth/register** - Register New Account
  + **GET /api/v1/auth/activate/:id** - Activate Account
  + **POST /api/v1/auth/login** - Login Account
  + **GET /api/v1/users/:id** - Get User Profile
  + **GET /api/v1/skills** - Search Skills
  + **POST /api/v1/skills** - Create New Skill
  + **PUT /api/v1/skills/:id** - Update Skill
  + **GET /api/v1/my-skills** - Search My Skills
  + **POST /api/v1/my-skills** - Add My Skill
  + **PUT /api/v1/my-skills/:id/level** - Update My Skill Level
  + **DELETE /api/v1/my-skills/:id** - Delete My Skill

## Environment Variables

  Create a ```.env``` file at the root of your project to configure environment variables.

  Example of ```.env```:

  ```bash
  PORT=3001
  DATABASE=<your-database>
  DATABASE_PASSWORD=<your-database-bassword>
  EMAIL_ADDRESS=<your-gmail-address>
  EMAIL_PASSWORD=<your-gmail-app-password>
  JWT_SECRET=<your-jwt-secret-key>
  ```
