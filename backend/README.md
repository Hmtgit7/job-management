# Job Management Portal - Backend

The backend of the Job Management Portal is built with NestJS, TypeScript, and PostgreSQL with TypeORM.

## Features

- RESTful API for job management
- TypeScript for type safety
- PostgreSQL database with TypeORM for data persistence
- Validation using class-validator
- Environment-based configuration
- Comprehensive error handling

## Technology Stack

- **NestJS**: Progressive Node.js framework
- **TypeScript**: For type-safe code
- **PostgreSQL**: Relational database
- **TypeORM**: Object-Relational Mapping tool
- **class-validator**: For input validation
- **Jest**: For testing

## Project Structure

```
backend/
├── src/               # Source files
│   ├── config/        # Application configuration
│   ├── jobs/          # Jobs module
│   │   ├── dto/       # Data Transfer Objects
│   │   ├── entities/  # Database entities
│   │   ├── jobs.controller.ts  # API controllers
│   │   ├── jobs.service.ts     # Business logic
│   │   └── jobs.module.ts      # Module definition
│   ├── app.module.ts  # Main application module
│   └── main.ts        # Application entry point
├── test/              # Test files
├── .env               # Environment variables
├── .eslintrc.json     # ESLint configuration
├── Dockerfile         # Docker configuration
├── nest-cli.json      # NestJS CLI configuration
├── package.json       # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

```bash
# Clone the repository (if not already done)
git clone https://github.com/Hmtgit7/job-management.git
cd job-management/backend

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the backend directory:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=job_management
DB_SYNC=true
DB_LOGGING=false

# Application Configuration
PORT=3001
```

### Development

```bash
# Run the development server
npm run start:dev
```

The API will be available at [http://localhost:3001](http://localhost:3001)

### Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start:prod
```

### Docker Build

```bash
# Build the Docker image
docker build -t job-management-backend .

# Run the container
docker run -p 3001:3001 \
  -e DB_HOST=your-db-host \
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  -e DB_NAME=job_management \
  job-management-backend
```

## API Endpoints

### Jobs

| Method | Endpoint        | Description                    | Request Body    | Response          |
|--------|-----------------|--------------------------------|-----------------|-------------------|
| GET    | /api/jobs       | Get all jobs with filtering    | Query parameters| Array of Job      |
| POST   | /api/jobs       | Create a new job               | CreateJobDto    | Job               |
| GET    | /api/jobs/:id   | Get a specific job             | -               | Job               |
| PATCH  | /api/jobs/:id   | Update a job                   | UpdateJobDto    | Job               |
| DELETE | /api/jobs/:id   | Delete a job                   | -               | -                 |

### Query Parameters for GET /api/jobs

- `title`: Filter by job title (string)
- `location`: Filter by job location (string)
- `jobType`: Filter by job type (enum: 'Full-time', 'Part-time', 'Contract', 'Internship')
- `minSalary`: Filter by minimum salary (number)
- `maxSalary`: Filter by maximum salary (number)

## Data Models

### Job Entity

```typescript
export enum JobType {
    FULL_TIME = 'Full-time',
    PART_TIME = 'Part-time',
    CONTRACT = 'Contract',
    INTERNSHIP = 'Internship',
}

export class Job {
    id: string;
    title: string;
    companyName: string;
    location: string;
    jobType: JobType;
    salaryRange: string;
    description: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: Date;
    createdAt: Date;
    updatedAt: Date;
}
```

## Testing

```bash
# Run tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## Deployment

### Docker Deployment

The included Dockerfile allows for easy containerization:

```bash
docker build -t job-management-backend .
docker run -p 3001:3001 -e DB_HOST=your-db-host job-management-backend
```

For full stack deployment with Docker Compose, refer to the root [README.md](../README.md).

### Render.com or Heroku Deployment

1. Create a new PostgreSQL database
2. Deploy the NestJS application
3. Configure environment variables:
   - Database connection details
   - `PORT`: Application port
   - `NODE_ENV`: Set to 'production'

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.