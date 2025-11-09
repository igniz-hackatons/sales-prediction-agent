import type { Job } from 'bullmq';

export interface IProccesor<TData = any, TResult = any> {
  prefix: string;
  func: (job: Job<TData, TResult>) => Promise<TResult> | TResult;
}
