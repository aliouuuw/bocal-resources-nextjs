"use server";

import { cookies } from "next/headers";

export async function clearSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
      expires: new Date(0),
      path: "/",
    });
    
    // Redirect immediately after logout
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    // Fallback redirect in case of error
    return { success: false, error: "Logout failed" };
  }
}
