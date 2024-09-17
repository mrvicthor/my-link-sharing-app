import bcrypt from "bcrypt";
export const hashPassword = async (value: string, saltRounds?: number) =>
  bcrypt.hash(value, saltRounds || 10);

export const comparePassword = async (value: string, hash: string) =>
  bcrypt.compare(value, hash).catch(() => false);
