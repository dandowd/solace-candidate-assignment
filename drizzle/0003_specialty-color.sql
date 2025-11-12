CREATE TABLE IF NOT EXISTS "advocateSpecialties" (
	"advocate_id" bigint,
	"specialty_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "specialties" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	CONSTRAINT "specialties_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "advocates" drop column "search";--> statement-breakpoint
ALTER TABLE "advocates" ADD COLUMN "search" text GENERATED ALWAYS AS (first_name || ' ' || last_name || ' ' || city || ' ' 
        || ' ' || degree || ' ' || years_of_experience || ' ' || phone_number) STORED;--> statement-breakpoint
ALTER TABLE "advocates" DROP COLUMN IF EXISTS "payload";