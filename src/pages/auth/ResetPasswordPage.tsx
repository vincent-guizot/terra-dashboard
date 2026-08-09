import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ResetPasswordPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-text-primary">Set a new password</h1>
      <p className="mt-1 text-sm text-text-muted">Make sure it's at least 8 characters.</p>

      <form className="mt-6 space-y-4">
        <div>
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div>
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" type="password" placeholder="••••••••" />
        </div>
        <Button className="w-full">Reset password</Button>
      </form>
    </div>
  );
}
