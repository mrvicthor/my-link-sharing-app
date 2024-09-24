import API from "@/config/apiClient";

type LoginData = {
  email: string;
  password: string;
};

interface RegisterData extends LoginData {
  confirmPassword: string;
}

// type ResetPasswordData = Pick<LoginData, "email">;

export const login = async (data: LoginData) => API.post("/auth/login", data);
export const createUser = async (data: RegisterData) =>
  API.post("/auth/register", data);
export const verifyEmail = async (code: string) =>
  API.get(`/auth/email/verify/${code}`);
export const sendPasswordResetEmail = async (email: string) =>
  API.post("/auth/password/forgot", { email });
