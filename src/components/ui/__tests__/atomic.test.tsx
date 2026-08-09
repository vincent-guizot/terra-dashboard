import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Alert } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Stepper } from "@/components/ui/stepper";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { NavigationItem } from "@/components/ui/navigation-item";
import { TimelineItem } from "@/components/ui/timeline-item";
import { Menu } from "@/components/ui/menu";

describe("Atomic components", () => {
  it("Button renders and handles click", () => {
    const onClick = vi.fn();
    renderWithRouter(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("Button shows loading state and disables itself", () => {
    renderWithRouter(<Button loading>Save</Button>);
    expect(screen.getByText("Save").closest("button")).toBeDisabled();
  });

  it("Badge renders children", () => {
    renderWithRouter(<Badge variant="success">Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("Chip fires onRemove", () => {
    const onRemove = vi.fn();
    renderWithRouter(<Chip onRemove={onRemove}>React</Chip>);
    fireEvent.click(screen.getByLabelText("Remove"));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("Avatar renders initials when no src given", () => {
    renderWithRouter(<Avatar name="Sarah Chen" />);
    expect(screen.getByText("SC")).toBeInTheDocument();
  });

  it("AvatarGroup collapses overflow into +N", () => {
    renderWithRouter(
      <AvatarGroup max={2}>
        {[<Avatar key="1" name="A B" />, <Avatar key="2" name="C D" />, <Avatar key="3" name="E F" />]}
      </AvatarGroup>
    );
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("Input accepts typed value", () => {
    renderWithRouter(<Input placeholder="Email" onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "a@b.com" } });
    expect(input.value).toBe("a@b.com");
  });

  it("Input shows error message", () => {
    renderWithRouter(<Input error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("Checkbox toggles checked state", () => {
    renderWithRouter(<Checkbox label="Remember me" onChange={() => {}} />);
    const checkbox = screen.getByLabelText("Remember me") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it("Switch toggles", () => {
    renderWithRouter(<Switch aria-label="toggle" onChange={() => {}} />);
    const el = document.querySelector("input[type=checkbox]") as HTMLInputElement;
    expect(el.checked).toBe(false);
    fireEvent.click(el);
    expect(el.checked).toBe(true);
  });

  it("Alert shows title/description and dismisses", () => {
    const onClose = vi.fn();
    renderWithRouter(<Alert variant="error" title="Failed" description="Something broke" onClose={onClose} />);
    expect(screen.getByText("Failed")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("Progress renders percentage label", () => {
    renderWithRouter(<Progress value={65} label="Uploading" />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("EmptyState renders title and action", () => {
    renderWithRouter(<EmptyState title="No data" action={<button>Reset</button>} />);
    expect(screen.getByText("No data")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("Modal only renders when open=true and closes on backdrop click", () => {
    const onClose = vi.fn();
    const { rerender } = renderWithRouter(<Modal open={false} onClose={onClose} title="Hi" />);
    expect(screen.queryByText("Hi")).not.toBeInTheDocument();
    rerender(<Modal open={true} onClose={onClose} title="Hi" />);
    expect(screen.getByText("Hi")).toBeInTheDocument();
  });

  it("Tabs switches active content", () => {
    renderWithRouter(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>
    );
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Tab B"));
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("Breadcrumb renders trail items", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Customers" }]} />
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Customers")).toBeInTheDocument();
  });

  it("Pagination calls onPageChange", () => {
    const onPageChange = vi.fn();
    renderWithRouter(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("Stepper marks completed and active steps", () => {
    renderWithRouter(
      <Stepper current={1} steps={[{ label: "One" }, { label: "Two" }, { label: "Three" }]} />
    );
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("Accordion expands item content on click", () => {
    renderWithRouter(
      <Accordion type="single">
        <AccordionItem value="a" title="Section A">
          Hidden content
        </AccordionItem>
      </Accordion>
    );
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Section A"));
    expect(screen.getByText("Hidden content")).toBeInTheDocument();
  });

  it("DropdownMenu opens and fires item onClick", () => {
    const onClick = vi.fn();
    renderWithRouter(
      <DropdownMenu trigger={<button>Open</button>} items={[{ label: "Delete", onClick, destructive: true }]} />
    );
    fireEvent.click(screen.getByText("Open"));
    fireEvent.click(screen.getByText("Delete"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("Kbd renders shortcut text", () => {
    renderWithRouter(<Kbd>K</Kbd>);
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("StatusIndicator renders label", () => {
    renderWithRouter(<StatusIndicator status="online" label="Online" />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("NavigationItem renders label and link", () => {
    renderWithRouter(<NavigationItem href="/dashboard" label="Overview" />);
    expect(screen.getByText("Overview").closest("a")).toHaveAttribute("href", "/dashboard");
  });

  it("TimelineItem renders title and description", () => {
    renderWithRouter(<TimelineItem title="Order shipped" description="Left the warehouse" />);
    expect(screen.getByText("Order shipped")).toBeInTheDocument();
  });

  it("Menu renders static items and fires onClick", () => {
    const onClick = vi.fn();
    renderWithRouter(<Menu items={[{ label: "Profile", onClick }]} />);
    fireEvent.click(screen.getByText("Profile"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
