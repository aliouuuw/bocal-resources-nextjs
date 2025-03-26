"use server";

import { getCurrentUser } from "@/lib/authism/core/session";
import { setCookie } from "@/lib/authism/core/session";

export { setCookie, getCurrentUser };

export async function getUserAction() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error("User error:", error);
    return null;
  }
}

