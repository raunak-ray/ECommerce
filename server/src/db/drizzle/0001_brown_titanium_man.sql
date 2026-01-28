CREATE TYPE "public"."user_auth_provider" AS ENUM('email', 'google', 'github');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "authProvider" "user_auth_provider" DEFAULT 'email' NOT NULL;