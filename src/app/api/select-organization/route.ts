import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const organizationId = request.nextUrl.searchParams.get("organizationId");

  if (!organizationId) {
    redirect("/organization/choose");
  }

  const cookieStore = await cookies();
  cookieStore.set("selectedOrganizationId", organizationId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/dashboard");
}
