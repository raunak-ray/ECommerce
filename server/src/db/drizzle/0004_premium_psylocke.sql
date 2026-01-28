ALTER TABLE "category" RENAME TO "categories";--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "category_name_unique";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_category_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "seller_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_name_unique" UNIQUE("name");