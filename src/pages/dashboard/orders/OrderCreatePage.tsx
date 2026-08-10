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
import { orders, type Order } from "@/lib/mock-data";

/** "Add Order" form. Pushes into the in-memory mock `orders` array. */
export function OrderCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<Order["status"]>("Pending");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!customer.trim()) next.customer = "Customer name is required.";
    if (!total.trim()) next.total = "Order total is required.";
    else if (!/^\$?\d+(\.\d{1,2})?$/.test(total.trim())) next.total = "Enter a valid amount, e.g. 240.00";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const newOrder: Order = {
      id: `#${3020 + orders.length + 1}`,
      customer: customer.trim(),
      date: (date ?? new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      total: total.trim().startsWith("$") ? total.trim() : `$${total.trim()}`,
      status,
    };
    orders.unshift(newOrder);

    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Order created", description: `Order ${newOrder.id} was created for ${newOrder.customer}.`, variant: "success" });
      navigate("/orders");
    }, 400);
  }

  return (
    <div>
      <PageHeader
        title="Add Order"
        description="Manually create a new order."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Orders", href: "/orders" },
          { label: "Add Order" },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate("/orders")}>
            <ArrowLeft className="size-4" /> Back to Orders
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order details</CardTitle>
              <CardDescription>Who the order is for and when it was placed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="order-customer">Customer</Label>
                <Input id="order-customer" placeholder="e.g. Sarah Chen" value={customer} onChange={(e) => setCustomer(e.target.value)} error={errors.customer} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="order-total">Total</Label>
                  <Input id="order-total" placeholder="240.00" value={total} onChange={(e) => setTotal(e.target.value)} error={errors.total} />
                </div>
                <div>
                  <Label>Order date</Label>
                  <DatePicker value={date} onChange={setDate} />
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
              <Label htmlFor="order-status">Payment status</Label>
              <Select id="order-status" value={status} onChange={(e) => setStatus(e.target.value as Order["status"])}>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" loading={submitting}>
              <Save className="size-4" /> Save Order
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/orders")}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
