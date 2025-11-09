CREATE TABLE IF NOT EXISTS "clients" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"client_id" integer NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone_number" text,
	"email" text,
	"features" jsonb,
	"purchase_probability" real DEFAULT 0,
	"key_factors" jsonb,
	"recommendation_text" text,
	CONSTRAINT "clients_client_id_unique" UNIQUE("client_id")
);
