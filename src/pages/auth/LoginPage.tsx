import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";

export function LoginPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-text-primary">Welcome back</h1>
      <p className="mt-1 text-sm text-text-muted">Sign in to your Terra Dashboard account.</p>

      <form className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <Link to="/auth/forgot-password" className="text-sm text-primary-700 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button className="w-full">Sign in</Button>
      </form>

      <Divider label="or" className="my-6" />

      <p className="text-center text-sm text-text-muted">
        Don't have an account?{" "}
        <Link to="/auth/register" className="font-medium text-primary-700 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
