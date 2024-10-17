import API from "@/config/apiClient";

type LoginData = {
  email: string;
  password: string;
};

interface RegisterData extends LoginData {
  confirmPassword: string;
}

type ResetPasswordData = {
  verificationCode: string;
  password: string;
};

type LinkData = {
  title: string;
  url: string;
};

type ProfileData = {
  firstName: string;
  lastName: string;
  image: string;
};

export const login = async (data: LoginData) => API.post("/auth/login", data);
export const createUser = async (data: RegisterData) =>
  API.post("/auth/register", data);
export const logout = async () => API.get("/auth/logout");
export const verifyEmail = async (code: string) =>
  API.get(`/auth/email/verify/${code}`);
export const sendPasswordResetEmail = async (email: string) =>
  API.post("/auth/password/forgot", { email });
export const resetPassword = async (data: ResetPasswordData) =>
  API.post("/auth/password/reset", data);
export const getUser = async () => API.get("/user");
export const createLink = async (data: LinkData[]) =>
  API.post("/user/create-link", data);
export const getLinks = async () => API.get("/user/links");
// export const get
export const createProfile = async (data: ProfileData) =>
  API.post("/user/create-profile", data);

export const deleteLink = async (data: string) => {
  console.log("data", data);
  API.delete(`/user/links/${data}`);
};
