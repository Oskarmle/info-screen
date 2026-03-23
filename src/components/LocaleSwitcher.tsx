"use client";

import { locales, type Locale } from "@/src/i18n/config";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Languages } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type LocaleSwitcherProps = {
  locale: Locale;
};

const localeLabels: Record<Locale, string> = {
  en: "English",
  da: "Dansk",
};

function getLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");

  if (segments[1] === "dashboard") {
    return `/${locale}${pathname}`;
  }

  if (locales.includes(segments[1] as Locale) && segments[2] === "dashboard") {
    segments[1] = locale;
    return segments.join("/");
  }

  return `/${locale}/dashboard`;
}

async function setLocaleCookie(locale: Locale) {
  await fetch("/api/locale", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ locale }),
  });
}

const LocaleSwitcher = ({ locale }: LocaleSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const onLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    const localizedPath = getLocalizedPath(pathname, nextLocale);
    const queryString = searchParams.toString();
    const href = queryString ? `${localizedPath}?${queryString}` : localizedPath;

    startTransition(() => {
      void setLocaleCookie(nextLocale).finally(() => {
        router.push(href);
        router.refresh();
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isPending}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => onLocaleChange(localeOption)}
            disabled={localeOption === locale && !isPending}
          >
            {localeLabels[localeOption]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
