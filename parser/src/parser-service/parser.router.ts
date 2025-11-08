import { DI } from "../main";
import { forceStart } from "./parser.processor";

const registerWorkers = () =>
  DI.workerRouter.add<any, any>({
    prefix: "force_start",
    func: forceStart,
  });

export { registerWorkers };
