import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dbConfig from "./dbConfig";

const setup = () => {
  // for query purposes
  const queryClient = postgres(dbConfig.databaseUrl);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
