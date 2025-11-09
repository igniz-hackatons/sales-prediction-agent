import type { Job } from 'bullmq';

import { db } from '@/db/drizzle/connect';
import { clients } from '@/db/drizzle/schema/lead/schema';

import type { MlResponse } from './types/lead.types';
import { logger } from '@/lib/loger';

export const processMlResponse = async (job: Job<MlResponse[], any>) => {
  try {
    const data = job.data;
    logger.info(`Получено ${data.length} записей от ML-SERVICE`);
    const dataToUpsert = [];

    data.map(async (client) => {
      const insertData = {
        clientId: client.client_id,
        firstName: client.first_name,
        lastName: client.last_name,
        phoneNumber: client.phone_number,
        email: client.email,
        features: client.features,
        purchaseProbability: client.purchase_probability,
        keyFactors: client.key_factors,
        recommendationText: client.recommendation_text
      };
      dataToUpsert.push(insertData);
    });
    await db.insert(clients).values(dataToUpsert);

    logger.info('Обработка ответа завершена успешно');
  } catch (error) {
    logger.error('Ошибка при обработке ответа:', error);
    throw error;
  }
};
