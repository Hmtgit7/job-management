'use client';

import { Button } from '@mantine/core';
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAnglesDown } from "react-icons/fa6";
import { jobsApi } from '@/lib/api';
import { CreateJobForm, JobType } from '@/types';

interface JobFormProps {
    onClose: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ onClose }) => {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateJobForm>();

    const onSubmit: SubmitHandler<CreateJobForm> = async (data) => {
        try {
            // Ensure all required fields exist
            const formData: CreateJobForm = {
                ...data,
                // Add missing fields with defaults if they're undefined
                requirements: data.requirements || '',
                responsibilities: data.responsibilities || ''
            };

            await jobsApi.createJob(formData);
            toast.success('Job Created Successfully 🎉', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            reset();
            onClose();
            router.refresh(); // Refresh the page to show the new job
        } catch (error) {
            console.error('Error creating job:', error);
            toast.error('Error creating job. Please try again.', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="xl:max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-auto">
            <h1 className="text-xl font-semibold mb-6 text-center">Create Job Opening</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            {...register("jobTitle", { required: "Job title is required" })}
                            type="text"
                            id="jobTitle"
                            className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter job title"
                        />
                        {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
                    </div>
                    <div className="flex-1 mt-4 md:mt-0">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            {...register("companyName", { required: "Company name is required" })}
                            type="text"
                            id="companyName"
                            className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter company name"
                        />
                        {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <select
                            {...register("location", { required: "Location is required" })}
                            id="location"
                            className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Choose Preferred Location</option>
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Trichy">Trichy</option>
                            <option value="Madurai">Madurai</option>
                        </select>
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                    </div>
                    <div className="flex-1 mt-4 md:mt-0">
                        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
                        <select
                            {...register("jobType", { required: "Job type is required" })}
                            id="jobType"
                            className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Job Type</option>
                            <option value={JobType.FULL_TIME}>{JobType.FULL_TIME}</option>
                            <option value={JobType.PART_TIME}>{JobType.PART_TIME}</option>
                            <option value={JobType.CONTRACT}>{JobType.CONTRACT}</option>
                            <option value={JobType.INTERNSHIP}>{JobType.INTERNSHIP}</option>
                        </select>
                        {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                        <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
                        <div className="flex space-x-1">
                            <input
                                {...register("salaryStart", { required: "Starting salary is required" })}
                                type="text"
                                id="salaryStart"
                                className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="₹0"
                            />
                            <input
                                {...register("salaryEnd", { required: "Ending salary is required" })}
                                type="text"
                                id="salaryEnd"
                                className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="₹12,00,000"
                            />
                        </div>
                        {(errors.salaryStart || errors.salaryEnd) && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.salaryStart?.message || errors.salaryEnd?.message}
                            </p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">Application Deadline</label>
                        <input
                            {...register("applicationDeadline", { required: "Application deadline is required" })}
                            type="date"
                            id="applicationDeadline"
                            className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.applicationDeadline && <p className="text-red-500 text-xs mt-1">{errors.applicationDeadline.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
                    <textarea
                        {...register("jobDescription", { required: "Job description is required" })}
                        id="jobDescription"
                        rows={4}
                        className="mt-1 border-2 p-2 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Please share a description to let the candidate know more about the job role"
                    />
                    {errors.jobDescription && <p className="text-red-500 text-xs mt-1">{errors.jobDescription.message}</p>}
                </div>

                {/* Optional fields for requirements and responsibilities */}
                <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                    <textarea
                        {...register("requirements")}
                        id="requirements"
                        rows={3}
                        className="mt-1 border-2 p-2 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Requirements for the job (optional)"
                    />
                </div>

                <div>
                    <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">Responsibilities</label>
                    <textarea
                        {...register("responsibilities")}
                        id="responsibilities"
                        rows={3}
                        className="mt-1 border-2 p-2 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Responsibilities for the job (optional)"
                    />
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" color="dark" type="button">
                            Save Draft
                            <FaAnglesDown className="ml-2" />
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button className="py-2 px-4" type="submit">
                            Publish
                            <FaAngleDoubleRight className="ml-2" />
                        </Button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default JobForm;