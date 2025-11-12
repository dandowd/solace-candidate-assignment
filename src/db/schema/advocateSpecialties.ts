import { relations } from "drizzle-orm";
import { bigint, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { advocates } from "./advocates";
import { specialties } from "./specialties";

const advocateSpecialties = pgTable(
  "advocate_specialties",
  {
    advocateId: bigint("advocate_id", { mode: "number" }).references(
      () => advocates.id,
    ),
    specialtyId: bigint("specialty_id", { mode: "number" }).references(
      () => specialties.id,
    ),
  },
  (t) => [primaryKey({ columns: [t.advocateId, t.specialtyId] })],
);

const advocateSpecialtiesRelations = relations(
  advocateSpecialties,
  ({ one }) => ({
    advocates: one(advocates, {
      fields: [advocateSpecialties.advocateId],
      references: [advocates.id],
    }),
    specialties: one(specialties, {
      fields: [advocateSpecialties.specialtyId],
      references: [specialties.id],
    }),
  }),
);

export { advocateSpecialties, advocateSpecialtiesRelations };
