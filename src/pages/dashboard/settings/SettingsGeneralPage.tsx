import { ContainerCard } from "@/components/layout/container-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function SettingsGeneralPage() {
  return (
    <ContainerCard className="max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="workspace">Workspace name</Label>
          <Input id="workspace" defaultValue="Terra Dashboard" />
        </div>
        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Select id="timezone" defaultValue="wib">
            <option value="wib">Asia/Jakarta (GMT+7)</option>
            <option value="utc">UTC</option>
            <option value="est">America/New York (GMT-4)</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="lang">Language</Label>
          <Select id="lang" defaultValue="en">
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </Select>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button>Save changes</Button>
      </div>
    </ContainerCard>
  );
}
