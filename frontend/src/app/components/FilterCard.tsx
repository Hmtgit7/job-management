'use client';

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import { RangeSlider } from '@mantine/core';
import JobCard from './JobCard';
import { Job, JobFilter, JobType } from '@/types';
import { jobsApi } from '@/lib/api';
import searchImg from "../../public/search.png"
import locationImg from "../../public/Location.png"

interface FilterCardProps {
    initialJobs: Job[];
}

const FilterCard: React.FC<FilterCardProps> = ({ initialJobs }) => {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
    const [location, setLocation] = useState<string>('');
    const [jobType, setJobType] = useState<string>('');
    const [salaryRange, setSalaryRange] = useState<[number, number]>([1, 80]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Function to filter jobs based on current filter settings
    const filterJobs = useCallback(async () => {

        setIsLoading(true);
        try {
            // Create filter object
            const filters: JobFilter = {
                searchQuery: searchQuery.trim() || undefined,
                location: location || undefined,
                jobType: (jobType as JobType) || undefined,
                minSalary: salaryRange[0],
                maxSalary: salaryRange[1]
            };

            // Filter out undefined values
            Object.keys(filters).forEach(key => {
                if (filters[key as keyof JobFilter] === undefined) {
                    delete filters[key as keyof JobFilter];
                }
            });

            // If no filters, show all jobs
            if (Object.keys(filters).length === 0) {
                setFilteredJobs(jobs);
                setIsLoading(false);
                return;
            }

            // Call API to get filtered jobs
            const data = await jobsApi.filterJobs(filters);
            setFilteredJobs(data);
        } catch (error) {
            console.error("Error filtering jobs:", error);
            // Fallback to client-side filtering in case of API error
            const filtered = jobs.filter(job => {
                const matchesSearch = !searchQuery ||
                    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesLocation = !location || job.location === location;
                const matchesJobType = !jobType || job.jobType === jobType;

                // Convert salary strings to numbers for comparison
                const jobMinSalary = parseFloat(job.salaryStart) / 1000; // Convert to k
                const jobMaxSalary = parseFloat(job.salaryEnd) / 1000; // Convert to k

                const matchesSalary = (isNaN(jobMinSalary) && isNaN(jobMaxSalary)) ||
                    (jobMaxSalary >= salaryRange[0] && jobMinSalary <= salaryRange[1]);

                return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
            });

            setFilteredJobs(filtered);
        } finally {
            setIsLoading(false);
        }
    }, [jobs, searchQuery, location, jobType, salaryRange]);

    // Apply filters when filter criteria change
    useEffect(() => {
        filterJobs();
    }, [filterJobs]);

    // Apply filters when initial jobs are updated
    useEffect(() => {
        setJobs(initialJobs);
        setFilteredJobs(initialJobs);
    }, [initialJobs]);

    return (
        <div className='container mx-auto px-4'>
            <div className='w-full bg-white h-auto md:h-32 space-y-4 xl:p-10 flex flex-col md:flex-row md:justify-between md:items-center md:space-x-4 shadow-md rounded-md'>
                <div className='flex items-center space-x-5 justify-center mt-5'>
                    <div>
                        <Image src={searchImg} width={20} height={20} alt="Search icon" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search By Job Title, Role"
                        className="text-gray-500 bg-transparent border-none focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='hidden md:block w-px h-12 bg-gray-300'></div>

                <div className='flex items-center space-x-5 justify-center'>
                    <div>
                        <Image src={locationImg} width={16} height={16} alt="Location icon" />
                    </div>
                    <select
                        className='xl:pr-16 text-gray-700 bg-transparent border-none focus:outline-none'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="">Choose Preferred Location</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Trichy">Trichy</option>
                        <option value="Madurai">Madurai</option>
                    </select>
                </div>

                <div className='hidden md:block w-px h-12 bg-gray-300'></div>

                <div className='flex items-center space-x-5 justify-center'>
                    <select
                        className='xl:pr-16 text-gray-700 bg-transparent border-none focus:outline-none'
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="">Job Type</option>
                        <option value={JobType.PART_TIME}>{JobType.PART_TIME}</option>
                        <option value={JobType.FULL_TIME}>{JobType.FULL_TIME}</option>
                        <option value={JobType.CONTRACT}>{JobType.CONTRACT}</option>
                        <option value={JobType.INTERNSHIP}>{JobType.INTERNSHIP}</option>
                    </select>
                </div>

                <div className='hidden md:block w-px h-12 bg-gray-300'></div>

                <div className='justify-center'>
                    <div className='flex justify-between m-2 sm:gap-20'>
                        <h2 className='text-gray-700'>Salary Per Month</h2>
                        <h2 className='text-gray-700'>₹{salaryRange[0]}k - ₹{salaryRange[1]}k</h2>
                    </div>

                    <div className='justify-center flex'>
                        <RangeSlider
                            w={'80%'}
                            color='dark'
                            minRange={1}
                            min={1}
                            max={80}
                            step={1}
                            value={salaryRange}
                            onChange={setSalaryRange}
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="flex flex-wrap gap-8 mt-5 justify-center">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <p className='mt-10 text-gray-500 font-semibold text-center'>No jobs found matching your criteria. Please try different filtering options.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterCard;