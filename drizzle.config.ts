import dbConfig from "./src/db/dbConfig";

const config = {
  dialect: "postgresql",
  schema: "./src/db/schema",
  dbCredentials: {
    url: dbConfig.databaseUrl,
  },
  verbose: true,
  strict: true,
};

export default config;
