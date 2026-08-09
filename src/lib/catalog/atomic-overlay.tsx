import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { CatalogEntry } from "./types";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Drawer } from "@/components/ui/drawer";
import { Popover } from "@/components/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { ContextMenu } from "@/components/ui/context-menu";
import { CommandMenu, useCommandMenuShortcut } from "@/components/ui/command-menu";

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm action" description="This can't be undone.">
        <p className="text-sm text-text-secondary">Are you sure you want to continue?</p>
      </Modal>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Details">
        <p className="text-sm text-text-secondary">Drawer content goes here.</p>
      </Drawer>
    </>
  );
}

function CommandMenuDemo() {
  const [open, setOpen] = useState(false);
  useCommandMenuShortcut(() => setOpen((o) => !o));
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open (or press Ctrl/Cmd+K)</Button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        items={[
          { id: "1", label: "Go to Dashboard", onSelect: () => {} },
          { id: "2", label: "Go to Customers", onSelect: () => {} },
        ]}
      />
    </>
  );
}

export const overlayEntries: CatalogEntry[] = [
  {
    slug: "modal",
    name: "Modal / Dialog",
    category: "Overlay",
    description: "Centered dialog with backdrop, portal-rendered, closes on Escape or backdrop click.",
    render: () => <ModalDemo />,
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlay",
    description: "Full-height slide-over panel from the left or right edge.",
    render: () => <DrawerDemo />,
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlay",
    description: "Small floating panel anchored to a trigger element.",
    render: () => (
      <Popover trigger={<Button variant="outline">Open popover</Button>}>
        <p className="text-sm font-medium text-text-primary">Popover title</p>
        <p className="mt-1 text-sm text-text-muted">This is a popover content.</p>
      </Popover>
    ),
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlay",
    description: "Small hover/focus hint anchored to an element.",
    render: () => (
      <Tooltip content="Tooltip text">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    ),
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Overlay",
    description: "Menu that opens from a trigger button, with optional destructive items.",
    render: () => (
      <DropdownMenu
        trigger={<Button variant="outline">Open menu</Button>}
        items={[
          { label: "Edit", icon: <Pencil className="size-4" /> },
          { label: "Delete", icon: <Trash2 className="size-4" />, destructive: true },
        ]}
      />
    ),
  },
  {
    slug: "context-menu",
    name: "Context Menu",
    category: "Overlay",
    description: "Right-click menu anchored to the cursor position.",
    render: () => (
      <ContextMenu items={[{ label: "Rename" }, { label: "Delete", destructive: true }]}>
        <div className="flex h-24 w-full max-w-xs items-center justify-center rounded-md border border-dashed border-border-strong text-sm text-text-muted">
          Right-click here
        </div>
      </ContextMenu>
    ),
  },
  {
    slug: "command-menu",
    name: "Command Menu",
    category: "Overlay",
    description: "Cmd+K style command palette with keyboard navigation and fuzzy search.",
    render: () => <CommandMenuDemo />,
  },
];
