import config from "./config";
import cron from "node-cron";
import type { RedisConnectionOptions } from "./bullmq/types/options";

import { QueueFactory } from "./bullmq/queue";
import { WorkerFactory } from "./bullmq/worker";
import WorkerRouter from "./bullmq/worker-router";
import { registerWorkers } from "./parser-service/parser.router";
import { startParsing } from "./parser-service/parser.processor";

export const DI = {} as {
    parserQueue: QueueFactory;
    parserWorker: WorkerFactory;
    workerRouter: typeof WorkerRouter;
};

export const init = async () => {
    const redisConnectionOptions: RedisConnectionOptions = {
        host: config.database.redis.host,
        port: +config.database.redis.port,
        password: config.database.redis.password,
    };
    DI.workerRouter = WorkerRouter;

    DI.parserQueue = new QueueFactory("parser", {
        redis: redisConnectionOptions,
    });
    DI.parserWorker = new WorkerFactory(
        "parserIncome",
        DI.workerRouter.getDynamicProcessor(),
        {
            redis: redisConnectionOptions,
        }
    );

    registerWorkers();
    console.log("UP");
    startParsing();
};

cron.schedule("0 0 * * 0", async () => {
    await init();
});
