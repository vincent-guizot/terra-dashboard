import { Plus, Pencil, Trash2 } from "lucide-react";
import type { CatalogEntry } from "./types";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Link } from "@/components/ui/link";
import { DropdownButton } from "@/components/ui/dropdown-button";
import { CopyButton } from "@/components/ui/copy-button";

export const actionsEntries: CatalogEntry[] = [
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    description: "Primary action trigger with 5 variants (primary, outline, ghost, soft, destructive) and 4 sizes.",
    render: () => (
      <div className="flex flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="destructive">Delete</Button>
        <Button loading>Loading</Button>
      </div>
    ),
  },
  {
    slug: "icon-button",
    name: "Icon Button",
    category: "Actions",
    description: "Square button for a single icon action, with default/ghost/destructive variants.",
    render: () => (
      <div className="flex gap-3">
        <IconButton icon={<Plus className="size-4" />} aria-label="Add" />
        <IconButton icon={<Pencil className="size-4" />} aria-label="Edit" variant="ghost" />
        <IconButton icon={<Trash2 className="size-4" />} aria-label="Delete" variant="destructive" />
      </div>
    ),
  },
  {
    slug: "button-group",
    name: "Button Group",
    category: "Actions",
    description: "Segmented group of buttons rendered with shared, connected borders.",
    render: () => (
      <ButtonGroup>
        <Button variant="outline" size="sm">Day</Button>
        <Button variant="outline" size="sm">Week</Button>
        <Button variant="outline" size="sm">Month</Button>
      </ButtonGroup>
    ),
  },
  {
    slug: "link",
    name: "Link",
    category: "Actions",
    description: "Router-aware inline link styled with the primary color and underline.",
    render: () => <Link to="#">This is a link</Link>,
  },
  {
    slug: "dropdown-button",
    name: "Dropdown Button",
    category: "Actions",
    description: "Button that opens a small menu of related actions.",
    render: () => (
      <DropdownButton
        label="Export"
        options={[{ label: "Export as CSV" }, { label: "Export as PDF" }, { label: "Export as JSON" }]}
      />
    ),
  },
  {
    slug: "copy-button",
    name: "Copy Button",
    category: "Actions",
    description: "Small icon button that copies a value to the clipboard with a checkmark confirmation.",
    render: () => (
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        api_key_live_8f2ac91d <CopyButton value="api_key_live_8f2ac91d" />
      </div>
    ),
  },
];
