import axios from "axios";

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  userId?: string;
}

export const useSignup = async (data: SignupData): Promise<SignupResponse> => {
  try {
    const response = await axios.post("/api/signup", data);
    return {
      success: true,
      message: "Signup successful",
      userId: response.data.userId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed",
    };
  }
};
