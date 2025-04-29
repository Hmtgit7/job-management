'use client';

import Image from 'next/image';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { Job } from '@/types';
import packageImg from "../../public/package.png"
import amazonLogoImg from "../../public/amazonLogo.png"
import profileImg from "../../public/profile.png"
import orgImg from "../../public/org.png"



interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const notify = () => {
        toast.success('Job Applied Successfully 🎊', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    function hoursDifference(createdAt: string): number {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const timeDifference = now.getTime() - createdDate.getTime();
        return Math.floor(timeDifference / (1000 * 60 * 60));
    }

    // Format salary to a readable format
    const formatSalary = (salary: string): string => {
        // Convert to number and then format
        const num = parseFloat(salary);
        if (isNaN(num)) return salary;

        // If less than 100k, display in thousands
        if (num < 100000) {
            return `${(num / 1000).toFixed(0)}k`;
        }
        // Otherwise display in lakhs
        return `${(num / 100000).toFixed(1)} LPA`;
    };

    return (
        <div className='bg-white w-80 max-w-sm lg:w-1/3 xl:w-1/4 h-auto flex flex-col rounded-xl shadow-md'>
            <div className='m-4'>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div
                        className='w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg'
                        style={{ background: 'linear-gradient(to bottom, #FEFEFD 0%, #F1F1F1 100%)' }}
                    >
                        <div>
                            <Image src={amazonLogoImg} width={50} height={50} alt="Company Logo" />
                        </div>
                    </div>
                    <div className='bg-blue-100 w-16 h-8 flex items-center justify-center rounded-lg mt-2 md:mt-0'>
                        <h2 className='text-xs md:text-sm'>{hoursDifference(job.createdAt)}hrs</h2>
                    </div>
                </div>
                <h1 className='font-medium text-lg md:text-xl mt-4'>{job.jobTitle}</h1>

                <div className='flex flex-wrap md:flex-nowrap items-center gap-2 md:space-x-4 mt-4'>
                    <div className='flex items-center space-x-2'>
                        <Image src={profileImg} width={20} height={20} alt='Profile Icon' />
                        <span className='text-sm'>{job.jobType}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Image src={orgImg} width={20} height={20} alt='Organization Icon' />
                        <span className='text-sm'>{job.location}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Image src={packageImg} width={20} height={20} alt='Salary Icon' />
                        <span className='text-sm'>{formatSalary(job.salaryEnd)}</span>
                    </div>
                </div>
                <div className='mt-4 text-sm'>
                    <p className='text-gray-700'>{job.jobDescription}</p>
                </div>
            </div>
            <div className='flex justify-center mt-2 mb-5'>
                <button
                    className='bg-blue-500 hover:bg-blue-600 w-5/6 h-12 rounded-xl text-white text-sm transition-colors duration-200'
                    onClick={notify}
                >
                    Apply Now
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default JobCard;