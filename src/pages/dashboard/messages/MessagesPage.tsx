import { useState } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SplitLayout } from "@/components/layout/split-layout";
import { Avatar } from "@/components/ui/avatar";
import { SearchInput } from "@/components/ui/search-input";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

const conversations = [
  { id: 1, name: "Sarah Chen", preview: "Sounds good, let's ship it Friday.", time: "10:24 AM" },
  { id: 2, name: "Marco Rossi", preview: "Can you review the PR?", time: "9:02 AM" },
  { id: 3, name: "Aiko Tanaka", preview: "Thanks for the update!", time: "Yesterday" },
];

export function MessagesPage() {
  const [active, setActive] = useState(1);
  const current = conversations.find((c) => c.id === active)!;

  return (
    <div>
      <PageHeader
        title="Messages"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Messages" }]}
      />
      <SplitLayout
        className="h-[600px] flex-col md:flex-row"
        left={
          <div>
            <div className="p-3">
              <SearchInput placeholder="Search conversations..." />
            </div>
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-surface-elevated",
                  active === c.id && "bg-surface-elevated"
                )}
              >
                <Avatar name={c.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">{c.name}</p>
                  <p className="truncate text-xs text-text-muted">{c.preview}</p>
                </div>
                <span className="shrink-0 text-[10px] text-text-muted">{c.time}</span>
              </button>
            ))}
          </div>
        }
        right={
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 border-b border-border-default p-4">
              <Avatar name={current.name} size="sm" />
              <p className="font-medium text-text-primary">{current.name}</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="max-w-xs rounded-lg bg-surface-elevated p-3 text-sm text-text-primary">{current.preview}</div>
            </div>
            <div className="flex items-center gap-2 border-t border-border-default p-3">
              <Input placeholder="Type a message..." className="flex-1" />
              <IconButton icon={<Send className="size-4" />} aria-label="Send" />
            </div>
          </div>
        }
      />
    </div>
  );
}
