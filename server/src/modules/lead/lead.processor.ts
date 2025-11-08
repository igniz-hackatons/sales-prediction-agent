import type { Job } from 'bullmq';

import { db } from '@/db/drizzle/connect';
import { clients, sales } from '@/db/drizzle/schema/lead/lead.schema';

import type { ClientsResponse } from './types/lead.types';

export const processMlResponse = async (job: Job<ClientsResponse[], any>) => {
  try {
    const data = job.data;
    console.log(job.data);

    for (let i = 0; i <= data.length; i++) {
      const { sales: salesData, ...client } = data[i];
      const clientDB = await db
        .insert(clients)
        .values({ ...client })
        .returning();

      const salesArr = salesData.map((item) => {
        return {
          clientId: clientDB[0].uid,
          ...item
        };
      });

      await db.insert(sales).values(salesArr);
    }
  } catch (error) {
    throw error;
  }
};
