import type { JobsOptions, QueueEventsOptions, QueueOptions } from 'bullmq';

export type RedisConnectionOptions = NonNullable<QueueOptions['connection']>;

export interface QueueModuleOptions {
  defaultJobOptions?: JobsOptions;
  queueEventsOptions?: QueueEventsOptions;
  queueOptions?: Omit<QueueOptions, 'connection' | 'defaultJobOptions'>;
  redis: RedisConnectionOptions;
}
