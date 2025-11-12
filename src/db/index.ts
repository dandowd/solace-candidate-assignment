import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dbConfig from "./dbConfig";
import * as schema from "./schema";

const setup = () => {
  // for query purposes
  const queryClient = postgres(dbConfig.databaseUrl);
  const db = drizzle(queryClient, { schema });
  return db;
};

export default setup();
