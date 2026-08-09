import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function RegisterPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-text-primary">Create an account</h1>
      <p className="mt-1 text-sm text-text-muted">Start your 14-day free trial, no card required.</p>

      <form className="mt-6 space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Jane Doe" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Checkbox label="I agree to the Terms of Service and Privacy Policy" />
        <Button className="w-full">Create account</Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-medium text-primary-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
