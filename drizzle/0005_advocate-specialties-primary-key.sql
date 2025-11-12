ALTER TABLE "advocateSpecialties" RENAME TO "advocate_specialties";--> statement-breakpoint
ALTER TABLE "advocate_specialties" DROP CONSTRAINT "advocateSpecialties_advocate_id_advocates_id_fk";
--> statement-breakpoint
ALTER TABLE "advocate_specialties" DROP CONSTRAINT "advocateSpecialties_specialty_id_specialties_id_fk";
--> statement-breakpoint
ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_advocate_id_specialty_id_pk" PRIMARY KEY("advocate_id","specialty_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_advocate_id_advocates_id_fk" FOREIGN KEY ("advocate_id") REFERENCES "public"."advocates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advocate_specialties" ADD CONSTRAINT "advocate_specialties_specialty_id_specialties_id_fk" FOREIGN KEY ("specialty_id") REFERENCES "public"."specialties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
