"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ColourPickerInfoScreen from "./ColourPickerInfoScreen";
import { Button } from "./ui/button";
import { InfoScreen } from "@/generated/prisma/client";
import { updateInfoScreen } from "@/lib/infoScreenActions";
import { toast } from "sonner";

type Colour = { id: string; name: string; oklch: string };

type EditInfoScreenFormProps = {
  infoScreen: InfoScreen;
  colours: Colour[];
};

const EditInfoScreenForm = ({
  infoScreen,
  colours,
}: EditInfoScreenFormProps) => {
  const handleSubmit = async (formData: FormData) => {
    const res = await updateInfoScreen(formData, infoScreen.id);
    if (res.success) {
      toast.success("Your info-screen has been updated", {
        position: "bottom-right",
      });
    } else {
      toast.error("Failed to update info-screen", {
        position: "bottom-right",
      });
    }
  };

  return (
    <form action={handleSubmit}>
      <input
        type="hidden"
        name="organizationId"
        value={infoScreen.organizationId}
      />
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

export default EditInfoScreenForm;
