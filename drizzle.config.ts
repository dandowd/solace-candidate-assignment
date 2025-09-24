const config = {
  dialect: "postgresql",
  schema: "./src/db/schema",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};

export default config;
