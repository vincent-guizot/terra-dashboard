import type { CatalogEntry } from "./types";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Kbd } from "@/components/ui/kbd";
import { Divider } from "@/components/ui/divider";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const dataDisplayEntries: CatalogEntry[] = [
  {
    slug: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Small status/category label with 7 semantic color variants.",
    render: () => (
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="neutral">Neutral</Badge>
      </div>
    ),
  },
  {
    slug: "chip",
    name: "Chip",
    category: "Data Display",
    description: "Removable tag, typically used for filters or multi-select values.",
    render: () => (
      <div className="flex gap-2">
        <Chip onRemove={() => {}}>React</Chip>
        <Chip onRemove={() => {}}>TypeScript</Chip>
      </div>
    ),
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Data Display",
    description: "User avatar with image fallback to initials, 4 sizes, and an optional status dot.",
    render: () => (
      <div className="flex items-center gap-3">
        <Avatar name="Sarah Chen" size="xs" />
        <Avatar name="Marco Rossi" size="sm" />
        <Avatar name="Aiko Tanaka" size="md" status="online" />
        <Avatar name="Liam O'Connor" size="lg" status="away" />
      </div>
    ),
  },
  {
    slug: "avatar-group",
    name: "Avatar Group",
    category: "Data Display",
    description: "Overlapping stack of avatars that collapses overflow into a +N indicator.",
    render: () => (
      <AvatarGroup max={3}>
        {[<Avatar key="1" name="Sarah Chen" />, <Avatar key="2" name="Marco Rossi" />, <Avatar key="3" name="Aiko Tanaka" />, <Avatar key="4" name="Liam O'Connor" />]}
      </AvatarGroup>
    ),
  },
  {
    slug: "status-indicator",
    name: "Status Indicator",
    category: "Data Display",
    description: "Small colored dot + label for online/offline/away/busy states.",
    render: () => (
      <div className="flex gap-4">
        <StatusIndicator status="online" label="Online" />
        <StatusIndicator status="away" label="Away" />
        <StatusIndicator status="offline" label="Offline" />
      </div>
    ),
  },
  {
    slug: "kbd",
    name: "Kbd",
    category: "Data Display",
    description: "Styled keyboard shortcut indicator.",
    render: () => (
      <div className="flex items-center gap-1 text-sm text-text-secondary">
        <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
      </div>
    ),
  },
  {
    slug: "divider",
    name: "Divider",
    category: "Data Display",
    description: "Horizontal or vertical rule, with solid/dashed/dotted/inset variants and optional label.",
    render: () => (
      <div className="space-y-4">
        <Divider />
        <Divider variant="dashed" />
        <Divider variant="dotted" />
        <Divider variant="inset" />
        <Divider label="OR" />
      </div>
    ),
  },
  {
    slug: "label",
    name: "Label",
    category: "Data Display",
    description: "Form field label, typically paired with Input/Select/Textarea.",
    render: () => <Label htmlFor="demo-label">Email address</Label>,
  },
  {
    slug: "card",
    name: "Card",
    category: "Data Display",
    description: "Base container primitive: Card, CardHeader, CardTitle, CardContent, CardFooter.",
    render: () => (
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>Card content goes here.</CardContent>
      </Card>
    ),
  },
];
