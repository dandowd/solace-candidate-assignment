import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";
import { advocateSpecialties } from "./advocateSpecialties";

const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    search: text("search").generatedAlwaysAs(
      `first_name || ' ' || last_name || ' ' || city || ' ' 
        || ' ' || degree || ' ' || years_of_experience || ' ' || phone_number`,
    ),
  },
  (table) => {
    return {
      searchIndex: index("idx_advocates_search_trgm").using(
        "GIN",
        sql`${table.search} gin_trgm_ops`,
      ),
    };
  },
);

const advocatesRelations = relations(advocates, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export { advocates, advocatesRelations };
