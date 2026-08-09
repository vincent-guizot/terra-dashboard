import { useState } from "react";
import { Stepper } from "@/components/ui/stepper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const steps = [
  { label: "Workspace", description: "Name your workspace" },
  { label: "Team", description: "Invite teammates" },
  { label: "Done", description: "You're all set" },
];

export function OnboardingPage() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="grid gap-8 sm:grid-cols-[160px_1fr]">
      <Stepper steps={steps} current={current} />
      <div>
        {current === 0 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="wname">Workspace name</Label>
              <Input id="wname" placeholder="Acme Inc" />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select id="industry" defaultValue="">
                <option value="">Select industry</option>
                <option>Technology</option>
                <option>Retail</option>
                <option>Finance</option>
              </Select>
            </div>
          </div>
        )}
        {current === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="invite">Invite by email</Label>
              <Input id="invite" placeholder="teammate@company.com" />
            </div>
          </div>
        )}
        {current === 2 && <p className="text-sm text-text-secondary">Your workspace is ready to go.</p>}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
            Back
          </Button>
          <Button onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}>
            {current === steps.length - 1 ? "Finish" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
