import { configDotenv } from "dotenv";

configDotenv();

const env = {
  app: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
  },
};

export default env;
