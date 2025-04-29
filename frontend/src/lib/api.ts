// src/lib/api.ts
import axios from 'axios';
import { Job, JobFilter, CreateJobForm, BackendJob } from '../types';

// Use the environment variable with correct naming
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://job-management-cmar.onrender.com';

// Create axios instance with the complete base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to map frontend model to backend model
const mapCreateJobToBackend = (job: CreateJobForm) => {
  return {
    title: job.jobTitle,
    companyName: job.companyName,
    location: job.location,
    jobType: job.jobType,
    salaryRange: `${job.salaryStart}-${job.salaryEnd}`,
    description: job.jobDescription,
    requirements: job.requirements || 'Not specified',
    responsibilities: job.responsibilities || 'Not specified',
    applicationDeadline: job.applicationDeadline,
  };
};

// Helper function to map backend model to frontend model
const mapJobToFrontend = (job: BackendJob): Job => {
  // Extract salary range if it exists
  let salaryStart = '0';
  let salaryEnd = '0';

  if (job.salaryRange) {
    const parts = job.salaryRange.split('-');
    if (parts.length === 2) {
      salaryStart = parts[0];
      salaryEnd = parts[1];
    }
  }

  return {
    id: job.id,
    jobTitle: job.title,
    companyName: job.companyName,
    location: job.location,
    jobType: job.jobType,
    salaryStart: salaryStart,
    salaryEnd: salaryEnd,
    jobDescription: job.description,
    requirements: job.requirements,
    responsibilities: job.responsibilities,
    applicationDeadline: job.applicationDeadline,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt
  };
};

export const jobsApi = {
  // Get all jobs with optional filtering
  getJobs: async (filters?: JobFilter): Promise<Job[]> => {
    try {
      // Make sure to use the full API endpoint path
      const { data } = await api.get('/api/jobs', { params: filters });
      return Array.isArray(data) ? data.map(mapJobToFrontend) : [];
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Return an empty array instead of throwing
      return [];
    }
  },

  // Get a single job by ID
  getJob: async (id: string): Promise<Job> => {
    try {
      const { data } = await api.get(`/api/jobs/${id}`);
      return mapJobToFrontend(data);
    } catch (error) {
      console.error(`Error fetching job with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new job
  createJob: async (job: CreateJobForm): Promise<Job> => {
    try {
      // Map the frontend model to the backend model
      const backendJob = mapCreateJobToBackend(job);

      // Send the mapped data to the backend
      const { data } = await api.post('/api/jobs', backendJob);

      // Map the response back to the frontend model
      return mapJobToFrontend(data);
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  // Update an existing job
  updateJob: async (id: string, job: Partial<CreateJobForm>): Promise<Job> => {
    try {
      // Map the frontend model to the backend model
      const backendJob = mapCreateJobToBackend(job as CreateJobForm);

      const { data } = await api.patch(`/api/jobs/${id}`, backendJob);
      return mapJobToFrontend(data);
    } catch (error) {
      console.error(`Error updating job with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a job
  deleteJob: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/jobs/${id}`);
    } catch (error) {
      console.error(`Error deleting job with ID ${id}:`, error);
      throw error;
    }
  },

  // Filter jobs (separate endpoint for the frontend filtering)
  filterJobs: async (filters: JobFilter): Promise<Job[]> => {
    try {
      // Map frontend filter fields to backend fields if needed
      const backendFilters = {
        title: filters.searchQuery,
        location: filters.location,
        jobType: filters.jobType,
        // Need to handle salary differently as backend expects a range string
      };

      const { data } = await api.get('/api/jobs', { params: backendFilters });
      return Array.isArray(data) ? data.map(mapJobToFrontend) : [];
    } catch (error) {
      console.error('Error filtering jobs:', error);
      throw error;
    }
  }
};