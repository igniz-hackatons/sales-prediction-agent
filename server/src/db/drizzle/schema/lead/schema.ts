import { integer, jsonb, pgTable, real, text } from 'drizzle-orm/pg-core';

import { baseSchema } from '../base.schema';

export const clients = pgTable('clients', {
  ...baseSchema,

  clientId: integer('client_id').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phoneNumber: text('phone_number'),
  email: text('email'),
  features: jsonb('features').$type<{
    seasonality_pattern: string;
    preferred_categories: string[];
  }>(),
  purchaseProbability: real('purchase_probability').default(0),
  keyFactors: jsonb('key_factors').$type<string[]>(),
  recommendationText: text('recommendation_text')
});

export type InsertClient = typeof clients.$inferInsert;
export type SelectClient = typeof clients.$inferSelect;
