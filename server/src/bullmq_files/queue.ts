import type { JobsOptions } from 'bullmq';

import { Queue, QueueEvents } from 'bullmq';

import type { QueueModuleOptions } from './types/options';

export class QueueFactory<TData = any> {
  public name: string;
  public queue: Queue;
  public events: QueueEvents;
  protected opts: QueueModuleOptions;

  constructor(name: string, opts: QueueModuleOptions) {
    this.name = name;
    this.opts = opts;

    this.queue = new Queue(this.name, {
      connection: opts.redis,
      defaultJobOptions: opts.defaultJobOptions,
      ...(opts.queueOptions || {})
    });

    this.events = new QueueEvents(this.name, {
      connection: opts.redis,
      ...(opts.queueEventsOptions || {})
    });

    this.events.on('error', (err) => {
      console.error(`[Queue:${this.name}] QueueEvents error:`, err);
    });
  }

  async addJob(name: string, data: TData, opts?: JobsOptions) {
    return this.queue.add(name, data, opts);
  }

  async addBulk(jobs: Array<{ name: string; data: TData; opts?: JobsOptions }>) {
    return this.queue.addBulk(jobs);
  }

  async getCounts() {
    return this.queue.getJobCounts();
  }

  async close() {
    await Promise.allSettled([this.queue.close(), this.events.close()]);
  }
}
