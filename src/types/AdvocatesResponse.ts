import { advocates } from "@/db/schema/advocates";
import { InferSelectModel } from "drizzle-orm";

export type AdvocatesResponse = InferSelectModel<typeof advocates>[];
