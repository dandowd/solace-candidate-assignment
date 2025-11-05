import { advocates } from "@/db/schema/advocates";
import { InferSelectModel } from "drizzle-orm";

type Specialty = { name: string; color: string };
export type AdvocatesResponse = Array<
  InferSelectModel<typeof advocates> & { specialties: Array<Specialty> }
>;
