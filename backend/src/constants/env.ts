import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value) {
    return value;
  }
  throw new Error(`Missing environment variable: ${key}`);
};

export const MONGO_URI = getEnv("MONGODB_URI");
export const PORT = getEnv("PORT", "4040");
