// src/app/page.tsx
import { jobsApi } from '@/lib/api';
import { Job } from '@/types';
import TopBar from './components/TopBar';
import FilterCard from './components/FilterCard';

// Server component for initial data fetching
export default async function Home() {
  // Fetch initial jobs server-side
  let jobs: Job[] = [];

  try {
    jobs = await jobsApi.getJobs();
  } catch (error) {
    console.error("Failed to fetch initial jobs:", error);
    // Will show empty state in the UI
  }

  return (
    <main className="min-h-screen pb-10 bg-[rgb(251,251,255)]">
      <div className="pt-3">
        <TopBar />
      </div>

      <div className="mt-5">
        <FilterCard initialJobs={jobs} />
      </div>
    </main>
  );
}