// src/jobs/jobs.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';
import { Job } from './entities/job.entity';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createJobDto: CreateJobDto): Promise<Job> {
        return await this.jobsService.create(createJobDto);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAll(@Query() filterJobDto: FilterJobDto): Promise<Job[]> {
        return await this.jobsService.findAll(filterJobDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Job> {
        return await this.jobsService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
        @Param('id') id: string,
        @Body() updateJobDto: UpdateJobDto
    ): Promise<Job> {
        return await this.jobsService.update(id, updateJobDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return await this.jobsService.remove(id);
    }
}