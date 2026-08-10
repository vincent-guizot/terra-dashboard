import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/components/ui/toast";
import { products, type Product } from "@/lib/mock-data";

/**
 * "Add Product" form.
 *
 * Terra Dashboard ships with static mock data (`src/lib/mock-data.ts`) and
 * no backend, so submitting here pushes the new row into the in-memory
 * `products` array (visible until reload) and shows a success toast. Wire
 * this up to your real API call / mutation when you connect a backend.
 */
export function ProductCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState<Product["status"]>("In Stock");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Product name is required.";
    if (!category.trim()) next.category = "Category is required.";
    if (!price.trim()) next.price = "Price is required.";
    else if (!/^\$?\d+(\.\d{1,2})?$/.test(price.trim())) next.price = "Enter a valid price, e.g. 59.00";
    if (!stock.trim()) next.stock = "Stock quantity is required.";
    else if (!/^\d+$/.test(stock.trim())) next.stock = "Stock must be a whole number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const newProduct: Product = {
      id: `p${products.length + 1}`,
      name: name.trim(),
      category: category.trim(),
      price: price.trim().startsWith("$") ? price.trim() : `$${price.trim()}`,
      stock: Number(stock),
      status,
    };
    products.unshift(newProduct);

    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Product added", description: `${newProduct.name} was added to the catalog.`, variant: "success" });
      navigate("/products");
    }, 400);
  }

  return (
    <div>
      <PageHeader
        title="Add Product"
        description="Create a new product in your catalog."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Products", href: "/products" },
          { label: "Add Product" },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate("/products")}>
            <ArrowLeft className="size-4" /> Back to Products
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product details</CardTitle>
              <CardDescription>Basic information shown across the catalog and product page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-name">Product name</Label>
                <Input id="product-name" placeholder="e.g. Wireless Keyboard" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <Input id="product-category" placeholder="e.g. Accessories" value={category} onChange={(e) => setCategory(e.target.value)} error={errors.category} />
                </div>
                <div>
                  <Label htmlFor="product-status">Status</Label>
                  <Select id="product-status" value={status} onChange={(e) => setStatus(e.target.value as Product["status"])}>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea id="product-description" placeholder="Short description shown on the product detail page..." rows={4} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product image</CardTitle>
              <CardDescription>PNG or JPG, up to 5MB.</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing &amp; inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-price">Price</Label>
                <Input id="product-price" placeholder="59.00" value={price} onChange={(e) => setPrice(e.target.value)} error={errors.price} />
              </div>
              <div>
                <Label htmlFor="product-stock">Stock quantity</Label>
                <Input id="product-stock" placeholder="128" inputMode="numeric" value={stock} onChange={(e) => setStock(e.target.value)} error={errors.stock} />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" loading={submitting}>
              <Save className="size-4" /> Save Product
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/products")}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
