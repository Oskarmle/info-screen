import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ColourPickerInfoScreen from "./ColourPickerInfoScreen";
import { fetchColours } from "@/lib/colourAction";
import { Button } from "./ui/button";
import { InfoScreen } from "@/generated/prisma/client";
import { updateInfoScreen } from "@/lib/infoScreenActions";

type EditInfoScreenProps = {
  infoScreen: InfoScreen;
};

const EditInfoScreen = async ({ infoScreen }: EditInfoScreenProps) => {
  const coloursResult = await fetchColours();
  const colours = coloursResult.success ? (coloursResult.data ?? []) : [];

  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const res = await updateInfoScreen(formData, infoScreen.id);
        if (res.success) {
          console.log("Info screen updated successfully");
        }
        console.log(res);
      }}
    >
      <input type="hidden" name="organizationId" value={infoScreen.organizationId} />
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="Title"
              required
              name="title"
              type="text"
              autoComplete="title"
              defaultValue={infoScreen.title}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              placeholder="Description"
              id="description"
              required
              name="description"
              autoComplete="description"
              className="h-40"
              defaultValue={infoScreen.description}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="colour-picker">Colour</FieldLabel>
            <ColourPickerInfoScreen
              colours={colours}
              defaultColourId={infoScreen.colourId}
            />
          </Field>
          <Field className="flex flex-col gap-2 justify-between">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default EditInfoScreen;
