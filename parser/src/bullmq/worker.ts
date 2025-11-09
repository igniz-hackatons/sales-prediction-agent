import type { Job } from "bullmq";

import { Worker } from "bullmq";

import type { QueueModuleOptions } from "./types/options";
import { logger } from "../lib/loger";

export class WorkerFactory<TData = any, TResult = any> {
    public name: string;
    public worker: Worker;
    protected opts: QueueModuleOptions;

    constructor(
        name: string,
        processor: (job: Job<TData, TResult>) => Promise<TResult> | TResult,
        opts: QueueModuleOptions,
        workerOptions?: WorkerOptions
    ) {
        this.name = name;
        this.opts = opts;

        this.worker = new Worker(
            this.name,
            async (job) => {
                try {
                    return await processor(job);
                } catch (err) {
                    logger.error(`[Worker:${this.name}] job failed:`, err);
                    throw err;
                }
            },
            {
                connection: opts.redis,
                ...workerOptions,
            }
        );

        this.worker.on("error", (err) => {
            logger.error(`[Worker:${this.name}] error:`, err);
        });

        this.worker.on("completed", (job) => {
            logger.info(`[Worker:${this.name}] completed job ${job.id}`);
        });

        this.worker.on("failed", (job, err) => {
            logger.warn(
                `[Worker:${this.name}] failed job ${job?.id}:`,
                err.message
            );
        });
    }

    async close() {
        await this.worker.close();
    }
}
