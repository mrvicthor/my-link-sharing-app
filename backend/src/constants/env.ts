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
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const GMAIL_ACCT = getEnv("GMAIL_ACCT");
export const GMAIL_PASS = getEnv("GMAIL_PASS");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const CLOUDINARY_NAME = getEnv("CLOUDINARY_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
export const DEVELOPMENT_ORIGIN = getEnv("DEVELOPMENT_ORIGIN");
