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

const colours = [
  {
    id: "1",
    name: "Default",
    oklch: "oklch(100.00% 0.000 0)",
  },
  {
    id: "2",
    name: "Blue",
    oklch: "oklch(42.97% 0.069 263.87)",
  },
  {
    id: "3",
    name: "Dark",
    oklch: "oklch(39.42% 0.000 0)",
  },
  {
    id: "4",
    name: "Green",
    oklch: "oklch(51.89% 0.099 138.53)",
  },
];

const ColourPickerInfoScreen = () => {
  const [selectedColour, setSelectedColour] = useState("");
  return (
    <>
      <input type="hidden" name="colour" value={selectedColour} />
      <Select
        defaultValue=""
        onValueChange={(value) => {
          const selected = colours.find((c) => c.id === value);
          if (selected) {
            setSelectedColour(selected.oklch);
          }
        }}
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
