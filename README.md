# Job Management Admin Interface

A full-stack application for creating and managing job postings. This project includes a frontend built with Next.js, Mantine UI, and React Hook Form, and a backend built with NestJS and PostgreSQL.

## Project Structure

The project is organized into two main directories:

- `frontend/`: Next.js application
- `backend/`: NestJS application

## Features

- Job listing page with filter capabilities
- Job creation and editing forms with validation
- Responsive design that matches the provided Figma design
- Complete CRUD operations for job postings
- Type-safe communication between frontend and backend

## Technology Stack

### Frontend
- Next.js 14
- Mantine UI 7
- React Hook Form
- TypeScript
- Mantine Notifications

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Class-validator
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- npm or yarn

### Backend Setup

1. Create a PostgreSQL database named `job_management`

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file based on the provided example:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=job_management
   DB_SYNC=true
   DB_LOGGING=false
   PORT=3001
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

The backend will be available at http://localhost:3001/api

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:3000

## Deployment

### Backend Deployment

1. Build the NestJS application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start:prod
   ```

### Frontend Deployment

1. Build the Next.js application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## Implementation Details

### Backend

The backend is built with NestJS and uses TypeORM to interact with a PostgreSQL database. It follows a modular architecture with the following components:

- **Entities**: Define the database schema
- **DTOs**: Define data transfer objects for request validation
- **Controllers**: Handle HTTP requests
- **Services**: Implement business logic
- **Modules**: Organize related components

### Frontend

The frontend is built with Next.js and uses Mantine UI for the user interface. It follows a component-based architecture with:

- **Pages**: Define routes and page layouts
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for state management
- **API Client**: Handles communication with the backend
- **Types**: TypeScript definitions for type safety

## Design Implementation

The implementation closely follows the Figma design, ensuring:

- Consistent spacing, colors, and typography
- Responsive layout that works on different screen sizes
- Interactive elements like buttons, forms, and filters match the design