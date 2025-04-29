# Job Management Portal - Frontend

The frontend of the Job Management Portal is built with Next.js 15, TypeScript, Mantine UI, and Tailwind CSS.

## Live Demo

Visit the deployed frontend: [https://job-management-drab.vercel.app/](https://job-management-drab.vercel.app/)

## Features

- Modern and responsive UI built with Tailwind CSS and Mantine
- Job search and filtering functionality
- Job creation form with validation
- TypeScript for type safety
- Next.js App Router architecture for optimal performance
- Client and server components separation

## Technology Stack

- **Next.js**: React framework with App Router
- **TypeScript**: For type-safe code
- **Mantine UI**: React components library
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: For form validation
- **Axios**: HTTP client for API requests
- **React Toastify**: For notification messages

## Project Structure

```
frontend/
├── public/            # Static assets
├── src/               # Source files
│   ├── app/           # Next.js app directory
│   │   ├── api/       # API route handlers
│   │   ├── components/# React components
│   │   ├── globals.css# Global styles
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx   # Home page
│   ├── lib/           # Utilities
│   │   └── api.ts     # API client
│   └── types/         # TypeScript type definitions
├── .env               # Environment variables
├── .eslintrc.json     # ESLint configuration
├── Dockerfile         # Docker configuration
├── next.config.js     # Next.js configuration
├── package.json       # Dependencies and scripts
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.ts # Tailwind configuration
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository (if not already done)
git clone https://github.com/Hmtgit7/job-management.git
cd job-management/frontend

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the frontend directory:

```
# API URL 
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### Development

```bash
# Run the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Docker Build

```bash
# Build the Docker image
docker build -t job-management-frontend .

# Run the container
docker run -p 3000:3000 -e NEXT_PUBLIC_BASE_URL=http://localhost:3001 job-management-frontend
```

## Main Components

### 1. TopBar Component
The navigation bar with logo, menu links, and job creation button.

### 2. FilterCard Component
Handles job filtering by title, location, job type, and salary range.

### 3. JobCard Component
Displays individual job listings with key information.

### 4. JobForm Component
Form for creating new job listings with validation.

## API Integration

The frontend connects to the NestJS backend through a dedicated API client (`src/lib/api.ts`). It handles:

- Fetching job listings
- Creating new jobs
- Filtering jobs based on criteria
- Error handling and loading states

## Deployment

### Vercel Deployment

The frontend is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   - `NEXT_PUBLIC_BASE_URL`: Your backend API URL
3. Deploy the project

### Docker Deployment

The included Dockerfile allows you to build and deploy the frontend as a container:

1. Build the image: `docker build -t job-management-frontend .`
2. Run the container: `docker run -p 3000:3000 -e NEXT_PUBLIC_BASE_URL=your-backend-url job-management-frontend`

For full stack deployment with Docker Compose, refer to the root [README.md](../README.md).

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Make sure your backend is running and the `NEXT_PUBLIC_BASE_URL` is correctly set.

2. **Build Errors**: If you encounter TypeScript errors during build, check the following:
   - Make sure all imports are correctly typed
   - Fix any component prop type issues
   - Use the `--no-lint` flag with build if needed for deployment: `npm run build -- --no-lint`

3. **Hydration Errors**: If you see hydration warnings in the console:
   - Add `suppressHydrationWarning` to the HTML tag in layout.tsx
   - Ensure consistent rendering between server and client

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.