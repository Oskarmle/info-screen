import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerLocale } from "@/src/i18n/server";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";

const Page = async () => {
    const session = await auth();
    if (!session) redirect("/sign-in");
    const locale = await getServerLocale();
    const t = dashboardMessages[locale].contentEdit;
  return (
    <div>{t.title}</div>
  )
}

export default Page