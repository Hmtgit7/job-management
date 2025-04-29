// src/lib/api.ts
import axios from 'axios';
import { Job, JobFilter, CreateJobForm } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobsApi = {
  // Get all jobs with optional filtering
  getJobs: async (filters?: JobFilter): Promise<Job[]> => {
    try {
      const { data } = await api.get('/jobs', { params: filters });
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Return an empty array instead of throwing
      return [];
    }
  },

    // Get a single job by ID
    getJob: async (id: string): Promise<Job> => {
        try {
            const { data } = await api.get(`/jobs/${id}`);
            return data;
        } catch (error) {
            console.error(`Error fetching job with ID ${id}:`, error);
            throw error;
        }
    },

    // Create a new job
    createJob: async (job: CreateJobForm): Promise<Job> => {
        try {
            const { data } = await api.post('/jobs', job);
            return data;
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    },

    // Update an existing job
    updateJob: async (id: string, job: Partial<CreateJobForm>): Promise<Job> => {
        try {
            const { data } = await api.patch(`/jobs/${id}`, job);
            return data;
        } catch (error) {
            console.error(`Error updating job with ID ${id}:`, error);
            throw error;
        }
    },

    // Delete a job
    deleteJob: async (id: string): Promise<void> => {
        try {
            await api.delete(`/jobs/${id}`);
        } catch (error) {
            console.error(`Error deleting job with ID ${id}:`, error);
            throw error;
        }
    },

    // Filter jobs (separate endpoint for the frontend filtering)
    filterJobs: async (filters: JobFilter): Promise<Job[]> => {
        try {
            const { data } = await api.get('/jobs', { params: filters });
            return data;
        } catch (error) {
            console.error('Error filtering jobs:', error);
            throw error;
        }
    }
};