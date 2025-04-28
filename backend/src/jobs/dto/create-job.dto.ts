// src/jobs/dto/create-job.dto.ts
import { IsNotEmpty, IsEnum, IsString, IsDateString } from 'class-validator';
import { JobType } from '../entities/job.entity';

export class CreateJobDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsEnum(JobType)
    jobType: JobType;

    @IsNotEmpty()
    @IsString()
    salaryRange: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    requirements: string;

    @IsNotEmpty()
    @IsString()
    responsibilities: string;

    @IsNotEmpty()
    @IsDateString()
    applicationDeadline: string;
}

