import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui/toast";
import { invoices, type Invoice } from "@/lib/mock-data";

/** "Add Invoice" form. Pushes into the in-memory mock `invoices` array. */
export function InvoiceCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [issued, setIssued] = useState<Date | null>(new Date());
  const [due, setDue] = useState<Date | null>(null);
  const [status, setStatus] = useState<Invoice["status"]>("Unpaid");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!customer.trim()) next.customer = "Customer / company is required.";
    if (!amount.trim()) next.amount = "Amount is required.";
    else if (!/^\$?\d+(\.\d{1,2})?$/.test(amount.trim())) next.amount = "Enter a valid amount, e.g. 1240.00";
    if (!due) next.due = "Due date is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const newInvoice: Invoice = {
      id: `INV-${1000 + invoices.length + 1}`,
      customer: customer.trim(),
      issued: (issued ?? new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      due: (due as Date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      amount: amount.trim().startsWith("$") ? amount.trim() : `$${amount.trim()}`,
      status,
    };
    invoices.unshift(newInvoice);

    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Invoice created", description: `${newInvoice.id} was created for ${newInvoice.customer}.`, variant: "success" });
      navigate("/invoices");
    }, 400);
  }

  return (
    <div>
      <PageHeader
        title="Add Invoice"
        description="Create a new invoice for billing."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Invoices", href: "/invoices" },
          { label: "Add Invoice" },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate("/invoices")}>
            <ArrowLeft className="size-4" /> Back to Invoices
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Invoice details</CardTitle>
              <CardDescription>Who this invoice is billed to and how much.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="invoice-customer">Customer / company</Label>
                <Input id="invoice-customer" placeholder="e.g. Acme Co" value={customer} onChange={(e) => setCustomer(e.target.value)} error={errors.customer} />
              </div>
              <div>
                <Label htmlFor="invoice-amount">Amount</Label>
                <Input id="invoice-amount" placeholder="1240.00" value={amount} onChange={(e) => setAmount(e.target.value)} error={errors.amount} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Issued date</Label>
                  <DatePicker value={issued} onChange={setIssued} />
                </div>
                <div>
                  <Label>Due date</Label>
                  <DatePicker value={due} onChange={setDue} />
                  {errors.due && <p className="mt-1.5 text-xs text-danger-500">{errors.due}</p>}
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
              <Label htmlFor="invoice-status">Payment status</Label>
              <Select id="invoice-status" value={status} onChange={(e) => setStatus(e.target.value as Invoice["status"])}>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </Select>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" loading={submitting}>
              <Save className="size-4" /> Save Invoice
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/invoices")}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
