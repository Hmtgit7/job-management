import { NextRequest, NextResponse } from "next/server";
import { jobsApi } from "@/lib/api";
import { JobFilter } from "@/types";

// GET /api/jobs - Get all jobs or filtered jobs
export async function GET(request: NextRequest) {
    try {
        // Parse query parameters for filtering
        const searchParams = request.nextUrl.searchParams;

        const filters: JobFilter = {
            searchQuery: searchParams.get('searchQuery') || undefined,
            location: searchParams.get('location') || undefined,
            jobType: searchParams.get('jobType') as any || undefined,
            minSalary: searchParams.get('minSalary') ? parseInt(searchParams.get('minSalary')!) : undefined,
            maxSalary: searchParams.get('maxSalary') ? parseInt(searchParams.get('maxSalary')!) : undefined,
        };

        // Remove undefined values
        Object.keys(filters).forEach(key => {
            if (filters[key as keyof JobFilter] === undefined) {
                delete filters[key as keyof JobFilter];
            }
        });

        // Call the backend API
        const jobs = await jobsApi.getJobs(Object.keys(filters).length > 0 ? filters : undefined);

        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newJob = await jobsApi.createJob(body);

        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json(
            { error: 'Failed to create job' },
            { status: 500 }
        );
    }
}