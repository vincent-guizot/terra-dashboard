import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-text-primary">Reset your password</h1>
      <p className="mt-1 text-sm text-text-muted">We'll email you a link to reset it.</p>

      <form className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </div>
        <Button className="w-full">Send reset link</Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        <Link to="/auth/login" className="font-medium text-primary-700 hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
