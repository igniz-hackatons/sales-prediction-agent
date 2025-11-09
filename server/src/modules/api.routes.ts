import { Router } from 'express';

import leadRoutes from './lead/lead.routes';

const router = Router();

router.use('/leads', leadRoutes);

export default router;
