import { ContainerCard } from "@/components/layout/container-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Switch } from "@/components/ui/switch";

export function SettingsSecurityPage() {
  return (
    <ContainerCard className="max-w-2xl">
      <h3 className="mb-4 text-sm font-semibold text-text-primary">Change password</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div>
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
        <div>
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" type="password" />
        </div>
      </div>
      <Divider className="my-6" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-primary">Two-factor authentication</p>
          <p className="text-xs text-text-muted">Require a code in addition to your password.</p>
        </div>
        <Switch />
      </div>
      <div className="mt-6 flex justify-end">
        <Button>Update security</Button>
      </div>
    </ContainerCard>
  );
}
