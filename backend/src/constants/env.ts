const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value) {
    return value;
  }
  throw new Error(`Missing environment variable: ${key}`);
};

export const MONGO_URI = getEnv("MONGODB_URI");
export const PORT = getEnv("PORT", "4040");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const JWT_SECRET = getEnv("JWT_SECRET");
