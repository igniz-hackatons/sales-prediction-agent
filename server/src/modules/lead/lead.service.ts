import { sql } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import { clients } from '@/db/drizzle/schema/lead/schema';

export const getAllLatest = async () => {
  try {
    const result = await db.execute(sql`
      SELECT DISTINCT ON (client_id) *
      FROM ${clients}
      ORDER BY client_id, created_at DESC
    `);

    return result.rows;
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
