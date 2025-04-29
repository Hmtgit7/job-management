// frontend/src/app/api/jobs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jobsApi } from "@/lib/api";

interface Params {
  id: string;
}

// GET /api/jobs/[id] - Get a specific job by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const job = await jobsApi.getJob(params.id);
    return NextResponse.json(job);
  } catch (error) {
    console.error(`Error fetching job with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// PATCH /api/jobs/[id] - Update a specific job
export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const body = await request.json();
    const updatedJob = await jobsApi.updateJob(params.id, body);
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error(`Error updating job with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete a specific job
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await jobsApi.deleteJob(params.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting job with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}