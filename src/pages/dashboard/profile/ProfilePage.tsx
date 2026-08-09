import { PageHeader } from "@/components/layout/page-header";
import { ContainerCard } from "@/components/layout/container-card";
import { ContentGrid } from "@/components/layout/content-grid";
import { ProfileCard } from "@/components/composite/profile-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ProfilePage() {
  return (
    <div>
      <PageHeader
        title="Profile"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Profile" }]}
      />
      <ContentGrid cols={3} gap="lg">
        <ProfileCard
          name="Vincent G."
          role="Administrator"
          email="vincent@terra.app"
          phone="+1 (555) 012-3456"
          badge="Active"
          stats={[
            { label: "Projects", value: "12" },
            { label: "Tasks", value: "48" },
            { label: "Years", value: "3" },
          ]}
        />
        <ContainerCard className="sm:col-span-2 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" defaultValue="Vincent G." />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Administrator" disabled />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="vincent@terra.app" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 012-3456" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us a little about yourself" />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </ContainerCard>
      </ContentGrid>
    </div>
  );
}
