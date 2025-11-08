import { Router } from 'express';

import * as leadController from './lead.controller';

const router = Router();

router.get('/all', leadController.getAll);

export default router;
