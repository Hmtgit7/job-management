// src/types/index.ts

export enum JobType {
    FULL_TIME = 'Full-time',
    PART_TIME = 'Part-time',
    CONTRACT = 'Contract',
    INTERNSHIP = 'Internship',
}

export interface Job {
    id: string;
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: JobType;
    salaryStart: string;
    salaryEnd: string;
    jobDescription: string;
    requirements?: string;
    responsibilities?: string;
    applicationDeadline: string;
    createdAt: string;
    updatedAt: string;
}

export interface JobFilter {
    searchQuery?: string;
    location?: string;
    jobType?: JobType;
    minSalary?: number;
    maxSalary?: number;
}

export interface CreateJobForm {
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: JobType;
    salaryStart: string;
    salaryEnd: string;
    jobDescription: string;
    requirements?: string;
    responsibilities?: string;
    applicationDeadline: string;
}

// Backend model interfaces - these help with type-checking when mapping between frontend and backend
export interface BackendJob {
    id: string;
    title: string;
    companyName: string;
    location: string;
    jobType: JobType;
    salaryRange: string;
    description: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: string;
    createdAt: string;
    updatedAt: string;
}

export interface BackendJobFilter {
    title?: string;
    location?: string;
    jobType?: JobType;
    minSalary?: string;
    maxSalary?: string;
}

export interface CreateBackendJobDto {
    title: string;
    companyName: string;
    location: string;
    jobType: JobType;
    salaryRange: string;
    description: string;
    requirements: string;
    responsibilities: string;
    applicationDeadline: string;
}