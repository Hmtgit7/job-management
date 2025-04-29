# Job Management Portal

A full-stack job posting and management application built with Next.js and NestJS.

## Live Demo

Visit the deployed application here: [Job Management Portal](https://job-management-drab.vercel.app/)

![Job Management Portal](https://github.com/Hmtgit7/job-management/public/image.png)

## Project Structure

This project is organized as a monorepo with the following structure:

```
job-management/
├── frontend/         # Next.js TypeScript frontend
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── Dockerfile    # Frontend Docker configuration
│   └── README.md     # Frontend documentation
├── backend/          # NestJS TypeScript backend
│   ├── src/          # Source code
│   ├── Dockerfile    # Backend Docker configuration
│   └── README.md     # Backend documentation
├── nginx/            # Nginx configuration for production
│   └── nginx.conf    # Nginx config file
├── docker-compose.yml # Docker Compose configuration
└── README.md         # Root documentation
```

## Features

- Create and post job openings
- Filter jobs by title, location, job type, and salary range
- Responsive design for all device sizes
- Full stack TypeScript implementation
- REST API with PostgreSQL database

## Technologies Used

### Frontend
- Next.js 15.3 (App Router)
- TypeScript
- Mantine UI
- React Hook Form
- Tailwind CSS
- Axios

### Backend
- NestJS
- TypeScript
- PostgreSQL with TypeORM
- Class Validator

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (local or Docker)

### Running with Docker

The easiest way to run the entire application is with Docker Compose:

```bash
# Clone the repository
git clone https://github.com/Hmtgit7/job-management.git
cd job-management

# Start the application
docker-compose up -d
```

This will start:
- Frontend on http://localhost:3000
- Backend API on http://localhost:3001
- PostgreSQL database on port 5432

### Running Locally (Without Docker)

#### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database settings

# Start the development server
npm run start:dev
```

#### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Set NEXT_PUBLIC_BASE_URL to point to your backend

# Start the development server
npm run dev
```

## Deployment

### Frontend Deployment (Vercel)

The frontend is deployed on Vercel: [https://job-management-drab.vercel.app/](https://job-management-drab.vercel.app/)

For your own deployment:
1. Fork this repository
2. Connect it to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_BASE_URL`: URL of your backend API

### Backend Deployment

The backend can be deployed to any Node.js hosting service like Render, Heroku, or AWS:

1. Set up a PostgreSQL database
2. Deploy the NestJS application
3. Configure environment variables for database connection

### Production Deployment with Nginx

For a production environment, you can use Nginx as a reverse proxy:

1. Create a directory for Nginx configuration:
   ```bash
   mkdir -p nginx
   ```

2. Copy the provided nginx.conf to this directory:
   ```bash
   cp nginx.conf.example nginx/nginx.conf
   ```

3. Update your docker-compose.yml to include Nginx:
   ```yaml
   services:
     # ... existing services

     nginx:
       image: nginx:alpine
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx/nginx.conf:/etc/nginx/nginx.conf
         - ./nginx/ssl:/etc/nginx/ssl
       depends_on:
         - frontend
         - backend
       restart: unless-stopped
   ```

4. Generate SSL certificates for HTTPS or use Let's Encrypt
5. Update the domain name in the nginx.conf file

## Documentation

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
- [API Documentation](backend/README.md#api-endpoints)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Assignment and design inspiration from Cybermind Works