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