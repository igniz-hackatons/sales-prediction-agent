import type { Job } from "bullmq";

import type { IProccesor } from "./types/proccesor.types";

export class WorkerRouter {
  private processorList: IProccesor[] = [];

  add<TData = any, TResult = any>(opts: IProccesor<TData, TResult>) {
    if (this.processorList.find((p) => p.prefix === opts.prefix)) {
      throw new Error(
        `Processor with prefix \"${opts.prefix}\" already exists`
      );
    }
    this.processorList.push(opts);
  }

  getProcessor<TData = any, TResult = any>(
    prefix: string
  ): (job: Job<TData, TResult>) => Promise<TResult> | TResult {
    const found = this.processorList.find((item) => item.prefix === prefix);
    if (!found) {
      throw new Error(`No processor found for prefix: ${prefix}`);
    }
    return found.func;
  }

  getDynamicProcessor<TData = any, TResult = any>() {
    return async (job: Job<TData & { prefix?: string }, TResult>) => {
      const prefix = job.name;
      if (!prefix) {
        throw new Error("Job does not contain prefix field");
      }
      const processor = this.getProcessor(prefix);
      return processor(job);
    };
  }

  listProcessors() {
    return this.processorList.map((p) => p.prefix);
  }
}

export default new WorkerRouter();
