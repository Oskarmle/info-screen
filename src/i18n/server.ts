import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "./config";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  if (locale && isLocale(locale)) {
    return locale;
  }

  return defaultLocale;
}
