import { ContainerCard } from "@/components/layout/container-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

export function SettingsBillingPage() {
  return (
    <ContainerCard className="max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-muted">Current plan</p>
          <p className="text-lg font-semibold text-text-primary">Team — $49/month</p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      <Divider className="my-5" />
      <div>
        <p className="mb-2 text-sm font-medium text-text-primary">Payment method</p>
        <div className="flex items-center justify-between rounded-md border border-border-default p-3 text-sm">
          <span className="text-text-secondary">Visa ending in 4242</span>
          <Button size="sm" variant="outline">Update</Button>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="destructive">Cancel subscription</Button>
      </div>
    </ContainerCard>
  );
}
