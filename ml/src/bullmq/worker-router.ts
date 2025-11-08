import type { Job } from "bullmq";

import type { IProccesor } from "./types/proccesor.types";

export class WorkerRouter {
  private processorList: IProccesor[] = [];

  add<TData = any, TResult = any>(opts: IProccesor<TData, TResult>) {
    if (this.processorList.find((p) => p.prefix === opts.prefix)) {
      console.error(`Processor with prefix \"${opts.prefix}\" already exists`);
      return;
    }
    this.processorList.push(opts);
  }

  getProcessor<TData = any, TResult = any>(
    prefix: string
  ): (job: Job<TData, TResult>) => Promise<TResult> | TResult {
    const found = this.processorList.find((item) => item.prefix === prefix);
    if (!found) {
      console.error(`No processor found for prefix: ${prefix}`);
      return;
    }
    return found.func;
  }

  getDynamicProcessor<TData = any, TResult = any>() {
    return async (job: Job<TData, TResult>) => {
      const prefix = job.name;
      if (!prefix) {
        console.error("Job does not contain prefix field");
        return;
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
