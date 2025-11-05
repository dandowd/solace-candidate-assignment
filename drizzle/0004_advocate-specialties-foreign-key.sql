DO $$ BEGIN
 ALTER TABLE "advocateSpecialties" ADD CONSTRAINT "advocateSpecialties_advocate_id_advocates_id_fk" FOREIGN KEY ("advocate_id") REFERENCES "public"."advocates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "advocateSpecialties" ADD CONSTRAINT "advocateSpecialties_specialty_id_specialties_id_fk" FOREIGN KEY ("specialty_id") REFERENCES "public"."specialties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
