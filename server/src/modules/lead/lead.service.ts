import { eq, sql } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import { clients, sales } from '@/db/drizzle/schema/lead/lead.schema';

export const getAll = async () => {
  try {
    const result = await db
      .select({
        name: clients.name,
        phone: clients.phone,
        companyName: clients.companyName,
        email: clients.email,
        percentageOfAgreement: clients.percentageOfAgreement,
        sales: sql`
            COALESCE(
                jsonb_agg(
                    jsob_build_object(
                    'status', ${sales.status},
                    'price', ${sales.price},
                    'reasonOfRefusal', ${sales.reasonOfRefusal},
                    'createDate', ${sales.createDate},
                    )
                )
            )
        `
      })
      .from(clients)
      .leftJoin(sales, eq(clients.uid, sales.clientId));

    return result;
  } catch (error) {
    throw error;
  }
};

// tags: sql`
//   COALESCE(
//     jsonb_agg(
//       jsonb_build_object(
//         'uid', ${usersTags.uid},
//         'name', ${usersTags.name},
//         'color', ${usersTags.color}
//       )
//     ) FILTER (WHERE ${usersTags.uid} IS NOT NULL), '[]'::jsonb
//   )
// `.as('tags'),
