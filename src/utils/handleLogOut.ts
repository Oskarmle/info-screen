"use server";
import { cookies } from "next/headers";

export async function handleSignOutAction() {
  (await cookies()).delete("selectedOrganizationId");
}
