import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import getconfig from "next/config";

const { serverRuntimeConfig: appConfig } = getconfig();

const setup = () => {
  // for query purposes
  const queryClient = postgres(appConfig.databaseUrl);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
