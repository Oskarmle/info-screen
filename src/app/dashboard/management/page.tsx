import { dashboardMessages } from "@/src/i18n/dashboardMessages";
import { getServerLocale } from "@/src/i18n/server";

const Page = async () => {
  const locale = await getServerLocale();
  const t = dashboardMessages[locale].management;

  return (
    <div>{t.title}</div>
  )
}

export default Page