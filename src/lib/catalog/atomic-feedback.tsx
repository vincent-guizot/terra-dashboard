import { Inbox } from "lucide-react";
import type { CatalogEntry } from "./types";
import { Alert } from "@/components/ui/alert";
import { Progress, CircularProgress } from "@/components/ui/progress";
import { Spinner, DotsLoader } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: "Changes saved", description: "Your update was applied.", variant: "success" })}>
      Trigger toast
    </Button>
  );
}

export const feedbackEntries: CatalogEntry[] = [
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Inline banner for success/info/warning/error messages.",
    render: () => (
      <div className="max-w-md space-y-2">
        <Alert variant="success" title="Success" description="Your changes have been saved." />
        <Alert variant="error" title="Error" description="Something went wrong." />
      </div>
    ),
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description: "Temporary notification that appears in the corner of the screen.",
    render: () => <ToastDemo />,
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Feedback",
    description: "Linear and circular progress indicators.",
    render: () => (
      <div className="flex max-w-xs items-center gap-6">
        <Progress value={65} label="Uploading" className="flex-1" />
        <CircularProgress value={75} />
      </div>
    ),
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Feedback",
    description: "Loading spinner, plus a dots-loader variant.",
    render: () => (
      <div className="flex items-center gap-4">
        <Spinner />
        <DotsLoader />
      </div>
    ),
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Placeholder block shown while content is loading.",
    render: () => (
      <div className="max-w-xs space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ),
  },
  {
    slug: "empty-state",
    name: "Empty State",
    category: "Feedback",
    description: "Placeholder shown when a list or view has no data.",
    render: () => <EmptyState icon={<Inbox className="size-6" />} title="No data found" description="There is nothing to show here." />,
  },
];
