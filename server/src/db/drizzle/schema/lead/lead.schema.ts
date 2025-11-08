import { date, integer, pgTable, text, unique, uuid } from 'drizzle-orm/pg-core';

import { baseSchema } from '../base.schema';

export const clients = pgTable(
  'clients',
  {
    ...baseSchema,
    name: text('name').notNull(),
    phone: text('phone'),
    companyName: text('company_name'),
    email: text('email'),
    percentageOfAgreement: integer('percentage_of_agreement').default(0)
  },
  (table) => ({
    clientsPhoneUnique: unique('clients_phone_unique').on(table.phone),
    clientsEmailUnique: unique('clients_email_unique').on(table.email)
  })
);

export type InsertClient = typeof clients.$inferInsert;
export type SelectClient = typeof clients.$inferSelect;

export const sales = pgTable('sales', {
  ...baseSchema,
  clientId: uuid('client_id')
    .references(() => clients.uid, { onDelete: 'cascade' })
    .notNull(),
  status: text('status').notNull(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  reasonOfRefusal: text('reason_of_refusal'),
  createDate: date('create_date').defaultNow().notNull()
});

export type InsertSale = typeof sales.$inferInsert;
export type SelectSale = typeof sales.$inferSelect;
