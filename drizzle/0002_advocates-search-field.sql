ALTER TABLE "advocates" ADD COLUMN "search" text GENERATED ALWAYS AS (first_name || ' ' || last_name || ' ' || city || ' ' ||
     coalesce(
       trim(
         regexp_replace(
           regexp_replace((payload)::text, '\[|\]|"', '', 'g'),
           ',',
           ' ',
           'g'
         )
       ),
       ''
     ) || ' ' || degree || ' ' || years_of_experience || ' ' || phone_number) STORED;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_advocates_search_trgm" ON "advocates" USING GIN ("search" gin_trgm_ops);