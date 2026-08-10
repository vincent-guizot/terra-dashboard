import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { customers, type Customer } from "@/lib/mock-data";

/** "Add Customer" form. Pushes into the in-memory mock `customers` array. */
export function CustomerCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Customer["status"]>("Active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Full name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!company.trim()) next.company = "Company is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const newCustomer: Customer = {
      id: `c${customers.length + 1}`,
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      status,
      spent: "$0",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    customers.unshift(newCustomer);

    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Customer added", description: `${newCustomer.name} was added to your customers.`, variant: "success" });
      navigate("/customers");
    }, 400);
  }

  return (
    <div>
      <PageHeader
        title="Add Customer"
        description="Create a new customer record."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Customers", href: "/customers" },
          { label: "Add Customer" },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate("/customers")}>
            <ArrowLeft className="size-4" /> Back to Customers
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer details</CardTitle>
              <CardDescription>Contact information for this customer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customer-name">Full name</Label>
                <Input id="customer-name" placeholder="e.g. Sarah Chen" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="customer-email">Email</Label>
                  <Input id="customer-email" type="email" placeholder="sarah@acme.co" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
                </div>
                <div>
                  <Label htmlFor="customer-company">Company</Label>
                  <Input id="customer-company" placeholder="e.g. Acme Co" value={company} onChange={(e) => setCompany(e.target.value)} error={errors.company} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="customer-status">Account status</Label>
              <Select id="customer-status" value={status} onChange={(e) => setStatus(e.target.value as Customer["status"])}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" loading={submitting}>
              <Save className="size-4" /> Save Customer
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/customers")}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
