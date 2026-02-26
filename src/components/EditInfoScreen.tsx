import { fetchColours } from "@/lib/colourAction";
import { InfoScreen } from "@/generated/prisma/client";
import EditInfoScreenForm from "./EditInfoScreenForm";

type EditInfoScreenProps = {
  infoScreen: InfoScreen;
};

const EditInfoScreen = async ({ infoScreen }: EditInfoScreenProps) => {
  const coloursResult = await fetchColours();
  const colours = coloursResult.success ? (coloursResult.data ?? []) : [];

  return <EditInfoScreenForm infoScreen={infoScreen} colours={colours} />;
};

export default EditInfoScreen;
