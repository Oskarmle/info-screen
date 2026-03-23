import { defaultLocale, isLocale, locales, type Locale } from "@/src/i18n/config";
import { NextResponse, type NextRequest } from "next/server";

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((entry) => entry.trim().split(";")[0].toLowerCase());

    for (const language of preferred) {
      const exactMatch = locales.find((locale) => locale === language);
      if (exactMatch) {
        return exactMatch;
      }

      const baseLanguage = language.split("-")[0];
      const baseMatch = locales.find((locale) => locale === baseLanguage);
      if (baseMatch) {
        return baseMatch;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (isLocale(maybeLocale) && segments[2] === "dashboard") {
    const response = NextResponse.next();

    if (request.cookies.get("NEXT_LOCALE")?.value !== maybeLocale) {
      response.cookies.set("NEXT_LOCALE", maybeLocale, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return response;
  }

  if (segments[1] === "dashboard") {
    const locale = getPreferredLocale(request);
    const target = new URL(`/${locale}${pathname}${search}`, request.url);
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/:locale/dashboard/:path*"],
};
