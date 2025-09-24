/** @type {import('next').NextConfig} */
import dbConfig from "./src/db/dbConfig.js";

const nextConfig = {
  serverRuntimeConfig: {
    secretKey: dbConfig.databaseUrl,
  },
};

export default nextConfig;
