import { dashboardMessages } from "@/src/i18n/dashboardMessages";
import { getServerLocale } from "@/src/i18n/server";

const Page = async () => {
  const locale = await getServerLocale();
  const t = dashboardMessages[locale].management;

  return (
    <div
      className="flex h-full w-full rounded-b-lg px-4"
      suppressHydrationWarning
    >
      {t.organization}
    </div>
  );
};

export default Page;
