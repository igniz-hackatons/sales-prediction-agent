import { DI } from '@/main';
import { processMlResponse } from './lead.processor';

const registerWorkers = () =>
  DI.workerRouter.add<any, any>({
    prefix: 'done_analyze',
    func: processMlResponse
  });

export { registerWorkers };
