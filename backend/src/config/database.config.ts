// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Job } from '../jobs/entities/job.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', 'postgres'),
    database: configService.get('DB_NAME', 'job_management'),
    entities: [Job],
    synchronize: configService.get<boolean>('DB_SYNC', true), // Be careful with this in production
    logging: configService.get<boolean>('DB_LOGGING', false),
    ssl: {
        rejectUnauthorized: configService.get<boolean>('DB_SSL_REJECT_UNAUTHORIZED', false)
    },
});