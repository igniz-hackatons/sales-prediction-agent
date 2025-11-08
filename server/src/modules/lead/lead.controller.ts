import type { NextFunction, Request, Response } from 'express';

import { sendResponse } from '@/lib/reponse';
import { HttpStatus } from '@/utils/enums/http-status';

import * as LeadService from './lead.service';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await LeadService.getAll();
    sendResponse(res, HttpStatus.OK, result);
  } catch (error) {
    next(error);
  }
}
