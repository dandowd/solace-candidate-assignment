import { relations } from "drizzle-orm";
import { bigint, pgTable } from "drizzle-orm/pg-core";
import { advocates } from "./advocates";
import { specialties } from "./specialties";

const advocateSpecialties = pgTable("advocateSpecialties", {
  advocateId: bigint("advocate_id", { mode: "number" }),
  specialtyId: bigint("specialty_id", { mode: "number" }),
});

const advocateSpecialtiesRelations = relations(
  advocateSpecialties,
  ({ many }) => ({
    advocates: many(advocates),
    specialties: many(specialties),
  }),
);

export { advocateSpecialties, advocateSpecialtiesRelations };
