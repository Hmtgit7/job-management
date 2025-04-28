// src/jobs/jobs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, FindOptionsWhere } from 'typeorm';
import { Job, JobType } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private jobRepository: Repository<Job>,
    ) { }

    async create(createJobDto: CreateJobDto): Promise<Job> {
        const job = this.jobRepository.create(createJobDto);
        return await this.jobRepository.save(job);
    }

    async findAll(filterJobDto?: FilterJobDto): Promise<Job[]> {
        const { title, location, jobType, minSalary, maxSalary } = filterJobDto || {};

        // Build query conditions
        const where: FindOptionsWhere<Job> = {};

        if (title) {
            where.title = Like(`%${title}%`);
        }

        if (location) {
            where.location = Like(`%${location}%`);
        }

        if (jobType) {
            where.jobType = jobType;
        }

        // For salary range filtering, we'd need to parse the salary range string
        // This is a simplified approach, assuming salaryRange is stored in a format like "50000-70000"
        // In a real application, you might want to store min and max salary as separate fields

        return await this.jobRepository.find({
            where,
            order: {
                createdAt: 'DESC',
            },
        });
    }

    async findOne(id: string): Promise<Job> {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        return job;
    }

    async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
        const job = await this.findOne(id);

        // Update the job with new values
        Object.assign(job, updateJobDto);

        return await this.jobRepository.save(job);
    }

    async remove(id: string): Promise<void> {
        const result = await this.jobRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
    }
}