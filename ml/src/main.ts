import config from "./config";

import type { RedisConnectionOptions } from "./bullmq/types/options";

import { QueueFactory } from "./bullmq/queue";
import { WorkerFactory } from "./bullmq/worker";
import WorkerRouter from "./bullmq/worker-router";
import { registerWorkers } from "./ml-service/ml.router";

export const DI = {} as {
  mlQueue: QueueFactory;
  parserWorker: WorkerFactory;
  workerRouter: typeof WorkerRouter;
};

export const initMl = (async () => {
  const redisConnectionOptions: RedisConnectionOptions = {
    host: config.database.redis.host,
    port: +config.database.redis.port,
    password: config.database.redis.password,
  };

  DI.workerRouter = WorkerRouter;

  DI.mlQueue = new QueueFactory("mlResults", { redis: redisConnectionOptions });
  DI.parserWorker = new WorkerFactory("parser", DI.workerRouter.getDynamicProcessor(), {
    redis: redisConnectionOptions,
  });

  registerWorkers();
  console.log("UP");
})();
