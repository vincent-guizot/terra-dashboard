import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";

export function NotFoundPage() {
  return (
    <EmptyState
      icon={<SearchX className="size-6" />}
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      action={
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      }
    />
  );
}
