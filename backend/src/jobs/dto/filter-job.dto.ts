// src/jobs/dto/filter-job.dto.ts
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { JobType } from '../entities/job.entity';

export class FilterJobDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsEnum(JobType)
    jobType?: JobType;

    @IsOptional()
    @IsString()
    minSalary?: string;

    @IsOptional()
    @IsString()
    maxSalary?: string;
}