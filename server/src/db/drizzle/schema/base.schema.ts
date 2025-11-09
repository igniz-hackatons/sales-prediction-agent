import { date, timestamp, uuid } from 'drizzle-orm/pg-core';

export const baseSchema = {
  uid: uuid('uid').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: date('updated_at')
    .$onUpdate(() => new Date().toISOString())
    .notNull()
};
