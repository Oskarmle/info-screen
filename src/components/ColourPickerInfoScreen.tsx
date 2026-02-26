"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Colour = { id: string; name: string; oklch: string };

type ColourPickerInfoScreenProps = {
  colours: Colour[];
  defaultColourId?: string;
};

const ColourPickerInfoScreen = ({
  colours,
  defaultColourId = "",
}: ColourPickerInfoScreenProps) => {
  const [selectedColourId, setSelectedColourId] = useState(defaultColourId);
  const selectedColour = colours.find((c) => c.id === selectedColourId)?.oklch;
  return (
    <>
      <input type="hidden" name="colourId" value={selectedColourId} />
      <Select
        defaultValue={defaultColourId}
        onValueChange={(value) => setSelectedColourId(value)}
      >
        <SelectTrigger id="colour-picker">
          <SelectValue placeholder="Select a colour" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Colours</SelectLabel>
            {colours.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
        <div
          className="h-10 rounded-lg border"
          style={{ backgroundColor: selectedColour }}
        />
      </Select>
    </>
  );
};

export default ColourPickerInfoScreen;
