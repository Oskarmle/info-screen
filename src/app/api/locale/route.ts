import { defaultLocale, isLocale } from "@/src/i18n/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: { locale?: string } = {};

  try {
    body = (await request.json()) as { locale?: string };
  } catch {
    body = {};
  }

  const locale = body.locale && isLocale(body.locale) ? body.locale : defaultLocale;

  const response = NextResponse.json({ success: true, locale });
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
