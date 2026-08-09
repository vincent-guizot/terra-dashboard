export const revenueData = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 3800 },
  { name: "Mar", value: 5100 },
  { name: "Apr", value: 4700 },
  { name: "May", value: 6200 },
  { name: "Jun", value: 5800 },
  { name: "Jul", value: 7100 },
];

export const trafficSourceData = [
  { name: "Direct", value: 42 },
  { name: "Search", value: 28 },
  { name: "Social", value: 18 },
  { name: "Referral", value: 8 },
  { name: "Email", value: 4 },
];

export const orderVolumeData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 98 },
  { name: "Wed", value: 145 },
  { name: "Thu", value: 132 },
  { name: "Fri", value: 168 },
  { name: "Sat", value: 89 },
  { name: "Sun", value: 76 },
];

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Inactive" | "Pending";
  spent: string;
  joined: string;
}

export const customers: Customer[] = [
  { id: "c1", name: "Sarah Chen", email: "sarah@acme.co", company: "Acme Co", status: "Active", spent: "$4,230", joined: "Jan 12, 2026" },
  { id: "c2", name: "Marco Rossi", email: "marco@buildly.io", company: "Buildly", status: "Active", spent: "$2,180", joined: "Feb 3, 2026" },
  { id: "c3", name: "Aiko Tanaka", email: "aiko@nova.dev", company: "Nova Dev", status: "Pending", spent: "$0", joined: "Mar 21, 2026" },
  { id: "c4", name: "Liam O'Connor", email: "liam@fluxbase.com", company: "FluxBase", status: "Inactive", spent: "$980", joined: "Nov 8, 2025" },
  { id: "c5", name: "Priya Nair", email: "priya@shiplane.co", company: "Shiplane", status: "Active", spent: "$6,540", joined: "Dec 30, 2025" },
];

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export const products: Product[] = [
  { id: "p1", name: "Wireless Keyboard", category: "Accessories", price: "$59.00", stock: 128, status: "In Stock" },
  { id: "p2", name: "4K Webcam", category: "Electronics", price: "$89.00", stock: 12, status: "Low Stock" },
  { id: "p3", name: "Standing Desk", category: "Furniture", price: "$349.00", stock: 0, status: "Out of Stock" },
  { id: "p4", name: "Noise Cancelling Headset", category: "Audio", price: "$129.00", stock: 64, status: "In Stock" },
];

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: string;
  status: "Paid" | "Pending" | "Refunded" | "Cancelled";
}

export const orders: Order[] = [
  { id: "#3021", customer: "Sarah Chen", date: "Aug 2, 2026", total: "$240.00", status: "Paid" },
  { id: "#3022", customer: "Marco Rossi", date: "Aug 3, 2026", total: "$89.00", status: "Pending" },
  { id: "#3023", customer: "Aiko Tanaka", date: "Aug 4, 2026", total: "$430.00", status: "Paid" },
  { id: "#3024", customer: "Liam O'Connor", date: "Aug 5, 2026", total: "$120.00", status: "Refunded" },
  { id: "#3025", customer: "Priya Nair", date: "Aug 6, 2026", total: "$610.00", status: "Cancelled" },
];

export interface Invoice {
  id: string;
  customer: string;
  issued: string;
  due: string;
  amount: string;
  status: "Paid" | "Unpaid" | "Overdue";
}

export const invoices: Invoice[] = [
  { id: "INV-1001", customer: "Acme Co", issued: "Jul 20, 2026", due: "Aug 20, 2026", amount: "$1,240.00", status: "Paid" },
  { id: "INV-1002", customer: "Buildly", issued: "Jul 28, 2026", due: "Aug 28, 2026", amount: "$860.00", status: "Unpaid" },
  { id: "INV-1003", customer: "FluxBase", issued: "Jun 15, 2026", due: "Jul 15, 2026", amount: "$430.00", status: "Overdue" },
];

export const projects = [
  { id: "pr1", name: "Website Redesign", description: "Full revamp of marketing site & design system.", status: "In Progress", statusVariant: "info" as const, progress: 65, members: ["Sarah Chen", "Marco Rossi"], dueDate: "Aug 20" },
  { id: "pr2", name: "Mobile App v2", description: "Native rewrite with offline sync support.", status: "Planning", statusVariant: "neutral" as const, progress: 12, members: ["Aiko Tanaka"], dueDate: "Sep 10" },
  { id: "pr3", name: "API Migration", description: "Move legacy endpoints to the new gateway.", status: "Review", statusVariant: "warning" as const, progress: 88, members: ["Liam O'Connor", "Priya Nair"], dueDate: "Aug 12" },
  { id: "pr4", name: "Design System 2.0", description: "Terra Dashboard component library rollout.", status: "Completed", statusVariant: "success" as const, progress: 100, members: ["Sarah Chen", "Priya Nair"], dueDate: "Jul 30" },
];
