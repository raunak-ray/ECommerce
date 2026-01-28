CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(6, 2),
	"stock" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
