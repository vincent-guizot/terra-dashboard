import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ServerCrash } from "lucide-react";

export function ErrorPage() {
  return (
    <EmptyState
      icon={<ServerCrash className="size-6" />}
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      action={
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      }
    />
  );
}
