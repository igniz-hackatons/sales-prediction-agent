ALTER TABLE "clients" DROP CONSTRAINT "clients_client_id_unique";--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "created_at" SET DATA TYPE timestamp;