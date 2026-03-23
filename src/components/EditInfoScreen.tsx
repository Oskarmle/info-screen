import { fetchColours } from "@/lib/colourAction";
import { InfoScreen } from "@/generated/prisma/client";
import EditInfoScreenForm from "./EditInfoScreenForm";
import type { Locale } from "@/src/i18n/config";

type EditInfoScreenProps = {
  infoScreen: InfoScreen;
  locale: Locale;
};

const EditInfoScreen = async ({ infoScreen, locale }: EditInfoScreenProps) => {
  const coloursResult = await fetchColours();
  const colours = coloursResult.success ? (coloursResult.data ?? []) : [];

  return (
    <EditInfoScreenForm infoScreen={infoScreen} colours={colours} locale={locale} />
  );
};

export default EditInfoScreen;
