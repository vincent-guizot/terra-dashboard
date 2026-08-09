import { useState } from "react";
import { Mail } from "lucide-react";
import type { CatalogEntry } from "./types";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/ui/search-input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { FileUpload } from "@/components/ui/file-upload";

function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(["react"]);
  return (
    <MultiSelect
      value={value}
      onChange={setValue}
      options={[{ label: "React", value: "react" }, { label: "Vue", value: "vue" }, { label: "Svelte", value: "svelte" }]}
    />
  );
}

function DatePickerDemo() {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker value={value} onChange={setValue} />;
}

function DateRangePickerDemo() {
  const [value, setValue] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  return <DateRangePicker value={value} onChange={setValue} />;
}

export const formControlsEntries: CatalogEntry[] = [
  {
    slug: "input",
    name: "Input",
    category: "Form Controls",
    description: "Text input with default/focus/error/success states and optional leading icon.",
    render: () => (
      <div className="max-w-xs space-y-3">
        <Input placeholder="Enter text..." icon={<Mail className="size-4" />} />
        <Input placeholder="Enter text..." error="This field is required." />
      </div>
    ),
  },
  {
    slug: "search-input",
    name: "Search Input",
    category: "Form Controls",
    description: "Input preconfigured with a search icon and placeholder.",
    render: () => (
      <div className="max-w-xs">
        <SearchInput />
      </div>
    ),
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Form Controls",
    description: "Multi-line text input.",
    render: () => (
      <div className="max-w-xs">
        <Textarea placeholder="Write a message..." />
      </div>
    ),
  },
  {
    slug: "select",
    name: "Select",
    category: "Form Controls",
    description: "Native select styled to match the design system.",
    render: () => (
      <div className="max-w-xs">
        <Select defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          <option value="a">Option 1</option>
          <option value="b">Option 2</option>
        </Select>
      </div>
    ),
  },
  {
    slug: "multi-select",
    name: "Multi Select",
    category: "Form Controls",
    description: "Select multiple options, shown as removable chips inside the trigger.",
    render: () => (
      <div className="max-w-xs">
        <MultiSelectDemo />
      </div>
    ),
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Form Controls",
    description: "Standard checkbox with optional inline label.",
    render: () => (
      <div className="space-y-2">
        <Checkbox label="Option 1" defaultChecked />
        <Checkbox label="Option 2" />
      </div>
    ),
  },
  {
    slug: "radio",
    name: "Radio",
    category: "Form Controls",
    description: "Standard radio button with optional inline label.",
    render: () => (
      <div className="space-y-2">
        <Radio name="demo-radio" label="Option 1" defaultChecked />
        <Radio name="demo-radio" label="Option 2" />
      </div>
    ),
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Form Controls",
    description: "Toggle switch for boolean settings.",
    render: () => (
      <div className="flex gap-4">
        <Switch defaultChecked />
        <Switch />
      </div>
    ),
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Form Controls",
    description: "Range input for selecting a numeric value.",
    render: () => (
      <div className="max-w-xs">
        <Slider defaultValue={25} min={0} max={100} showValue />
      </div>
    ),
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    category: "Form Controls",
    description: "Single date selection with a popover calendar.",
    render: () => (
      <div className="max-w-xs">
        <DatePickerDemo />
      </div>
    ),
  },
  {
    slug: "date-range-picker",
    name: "Date Range Picker",
    category: "Form Controls",
    description: "Start/end date range selection with a dual-month calendar.",
    render: () => (
      <div className="max-w-xs">
        <DateRangePickerDemo />
      </div>
    ),
  },
  {
    slug: "file-upload",
    name: "File Upload",
    category: "Form Controls",
    description: "Drag-and-drop file input with a browse fallback and file list.",
    render: () => (
      <div className="max-w-sm">
        <FileUpload />
      </div>
    ),
  },
];
