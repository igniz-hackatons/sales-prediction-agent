import { Router } from 'express';

import * as leadController from './lead.controller';

const router = Router();

router.get('/all-latest', leadController.getAllLatest);

export default router;
