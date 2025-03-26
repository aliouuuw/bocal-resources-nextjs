"use server";

import { login } from "@/lib/authism/core/index";
import { memoryAuthProvider } from "@/lib/authism/providers/memory-provider";

export async function loginAction(email: string, password: string) {
  try {
    const result = await login(memoryAuthProvider, email, password);
    
    if (result.success) {
      return result;
    } else {
      return { 
        success: false,
        user: null,
        error: result.error || "Invalid credentials" 
      };
    }
  } catch (error) {
    console.error("Login API error:", error);
    return { 
      success: false, 
      error: "Internal server error" 
    };
  }
}
