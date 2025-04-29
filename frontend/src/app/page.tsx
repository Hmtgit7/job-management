// // src/app/page.tsx
// import { jobsApi } from '@/lib/api';
// import { Job } from '@/types';
// import TopBar from './components/TopBar';
// import FilterCard from './components/FilterCard';

// // Server component for initial data fetching
// export default async function Home() {
//   // Fetch initial jobs server-side
//   let jobs: Job[] = [];

//   try {
//     jobs = await jobsApi.getJobs();
//   } catch (error) {
//     console.error("Failed to fetch initial jobs:", error);
//     // Will show empty state in the UI
//   }

//   return (
//     <main className="min-h-screen pb-10 bg-[rgb(251,251,255)]">
//       <div className="pt-3">
//         <TopBar />
//       </div>

//       <div className="mt-5">
//         <FilterCard initialJobs={jobs} />
//       </div>
//     </main>
//   );
// }

// src/app/page.tsx
import { jobsApi } from '@/lib/api';
import { Job, JobType } from '@/types';
import TopBar from './components/TopBar';
import FilterCard from './components/FilterCard';

// Mock data for testing
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    jobTitle: 'Full Stack Developer',
    companyName: 'Amazon',
    location: 'Chennai',
    jobType: JobType.FULL_TIME,
    salaryStart: '500000',
    salaryEnd: '1200000',
    jobDescription: 'We are looking for a skilled Full Stack Developer to join our team...',
    applicationDeadline: '2025-05-30',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    jobTitle: 'Node.js Developer',
    companyName: 'Tesla',
    location: 'Coimbatore',
    jobType: JobType.CONTRACT,
    salaryStart: '400000',
    salaryEnd: '800000',
    jobDescription: 'Experienced Node.js developer needed for our backend team...',
    applicationDeadline: '2025-05-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default async function Home() {
  let jobs: Job[] = [];
  
  try {
    // Try to fetch from API, fall back to mock data if it fails
    jobs = await jobsApi.getJobs();
    
    // If jobs array is empty, use mock data
    if (jobs.length === 0) {
      console.log('Using mock data for development');
      jobs = MOCK_JOBS;
    }
  } catch (error) {
    console.error("Failed to fetch initial jobs:", error);
    jobs = MOCK_JOBS; // Use mock data as fallback
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