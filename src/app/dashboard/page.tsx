import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { getSelectedOrganization } from "@/lib/organizationActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { fetchAllInfoScreenForOrganization } from "@/lib/infoScreenActions";
import { getServerLocale } from "@/src/i18n/server";
import { dashboardMessages } from "@/src/i18n/dashboardMessages";
import { withLocalePath } from "@/src/i18n/config";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const locale = await getServerLocale();
  const t = dashboardMessages[locale];

  const selectedOrgId = await getSelectedOrganization();

  if (selectedOrgId) {
    const membership = await prisma.userOrganization.findFirst({
      where: {
        userId: session.user?.id,
        organizationId: selectedOrgId,
        status: "APPROVED",
      },
    });
    if (membership) {
    } else {
      redirect("/organization/choose");
    }
  } else {
    redirect("/organization/choose");
  }

  const navButtons = t.home.cards;

  const infoScreens = await fetchAllInfoScreenForOrganization(selectedOrgId);

  return (
    <div
      className="flex flex-col gap-4 h-full w-full rounded-b-lg px-4"
      suppressHydrationWarning
    >
      <div className="w-full flex items-stretch gap-4">
        {navButtons.map((button) => (
          <Card
            key={button.name}
            className="w-full flex flex-col cursor-pointer pb-0"
          >
            <CardHeader className="flex-1">
              <CardTitle>{button.name}</CardTitle>
              <CardDescription>{button.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between bg-accent rounded-b-lg py-4 px-4 mt-auto">
              <Link href={withLocalePath(locale, button.href)}>
                <Button variant="default">{button.button}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="pb-0">
        <CardHeader>
          <CardTitle>{t.home.activeTitle}</CardTitle>
          <CardDescription>{t.home.activeDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          {infoScreens?.data?.map((infoscreen) => (
            <Card
              key={infoscreen.id}
              className="w-full sm:w-87.5 h-37.5 cursor-pointer "
            >
              <CardHeader className="min-w-0">
                <CardTitle>{infoscreen.title}</CardTitle>
                <CardDescription className="line-clamp-2 overflow-hidden text-ellipsis">
                  {infoscreen.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
        <CardFooter className="flex bg-accent rounded-b-lg py-4 px-4">
          <Link href={withLocalePath(locale, "/dashboard/info-screen/see-all")}>
            <Button variant="default">{t.home.seeAllButton}</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
