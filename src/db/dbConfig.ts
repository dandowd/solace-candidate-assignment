const requiredEnvVars = ["DATABASE_URL"];

const missingRequiredVars = requiredEnvVars.filter(
  (varName) => !process.env[varName],
);

// Don't let the app start if required env vars are missing.
// This is prevents missconfigured deployments replacing previously working ones in k8s style environments.
if (missingRequiredVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingRequiredVars.join(", ")}`,
  );
}

const dbConfig = {
  databaseUrl: process.env.DATABASE_URL!,
};

export default dbConfig;
