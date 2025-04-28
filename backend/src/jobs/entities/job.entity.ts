// src/jobs/entities/job.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum JobType {
    FULL_TIME = 'Full-time',
    PART_TIME = 'Part-time',
    CONTRACT = 'Contract',
    INTERNSHIP = 'Internship',
}

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    companyName: string;

    @Column({ type: 'varchar', length: 255 })
    location: string;

    @Column({
        type: 'enum',
        enum: JobType,
        default: JobType.FULL_TIME,
    })
    jobType: JobType;

    @Column({ type: 'varchar', length: 50 })
    salaryRange: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    requirements: string;

    @Column({ type: 'text' })
    responsibilities: string;

    @Column({ type: 'date' })
    applicationDeadline: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}