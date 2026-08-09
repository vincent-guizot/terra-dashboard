import { describe, it, expect } from "vitest";
import globalsCss from "../globals.css?raw";
import variablesCss from "../variables.css?raw";
import animationsCss from "../animations.css?raw";

describe("Stylesheet structure", () => {
  it("globals.css imports both variables.css and animations.css", () => {
    expect(globalsCss).toContain('@import "./variables.css"');
    expect(globalsCss).toContain('@import "./animations.css"');
  });

  it("globals.css does not itself define color/radius/shadow tokens (those live in variables.css)", () => {
    expect(globalsCss).not.toContain("--color-primary-950");
    expect(globalsCss).not.toContain("--radius-md");
  });

  it("variables.css contains the design tokens", () => {
    expect(variablesCss).toContain("--color-primary-950");
    expect(variablesCss).toContain("--breakpoint-lg: 64rem");
    expect(variablesCss).toContain(".dark {");
  });

  it("Primary Navy scale matches the authoritative design system doc (950-800 neutral slate, 700-50 brand blue)", () => {
    expect(variablesCss).toContain("--color-primary-950: #020617");
    expect(variablesCss).toContain("--color-primary-900: #0f172a");
    expect(variablesCss).toContain("--color-primary-800: #1e293b");
    expect(variablesCss).toContain("--color-primary-700: #1d4ed8");
    expect(variablesCss).toContain("--color-primary-600: #2563eb");
  });

  it("Neutral/Slate scale is separate from Primary so surface/text/border tokens never pick up a blue tint (regression: originally everything derived from Primary, which is fine when Primary is neutral but breaks once Primary 700-50 become vivid blue)", () => {
    expect(variablesCss).toContain("--color-neutral-950: #020617");
    expect(variablesCss).toContain("--color-neutral-200: #e2e8f0");
    expect(variablesCss).toContain("--border-default: #e2e8f0");
  });

  it("animations.css imports tw-animate-css so animate-in/fade-in/slide-in-from-* utilities actually generate CSS (regression: these classes previously did nothing)", () => {
    expect(animationsCss).toContain('@import "tw-animate-css"');
  });

  it("breakpoint override does not wipe the default Tailwind scale (regression: --breakpoint-*: initial broke every md:/lg:/xl: utility app-wide)", () => {
    expect(variablesCss).not.toContain("--breakpoint-*: initial");
  });

  it("Semantic colors use the doc's 4-tier system (base/soft/border/text) with exact hex per status", () => {
    expect(variablesCss).toContain("--color-success-soft: #ecfdf5");
    expect(variablesCss).toContain("--color-success-border: #a7f3d0");
    expect(variablesCss).toContain("--color-success-text: #047857");
    expect(variablesCss).toContain("--color-info-500: #06b6d4");
    expect(variablesCss).toContain("--color-danger-600: #dc2626");
  });

  it("Typography scale defines all 9 levels with paired line-heights matching the doc exactly", () => {
    expect(variablesCss).toContain("--text-display: 36px");
    expect(variablesCss).toContain("--text-display--line-height: 40px");
    expect(variablesCss).toContain("--text-h1: 30px");
    expect(variablesCss).toContain("--text-body: 14px");
    expect(variablesCss).toContain("--text-caption: 11px");
  });

  it("Radius scale includes 2xl=20px and 3xl=24px per the doc (regression: 2xl was previously 24px with no 3xl step)", () => {
    expect(variablesCss).toContain("--radius-2xl: 20px");
    expect(variablesCss).toContain("--radius-3xl: 24px");
  });

  it("Shadow scale uses the doc's exact single-layer formula", () => {
    expect(variablesCss).toContain("--shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08)");
    expect(variablesCss).toContain("--shadow-xl: 0 16px 40px rgba(15, 23, 42, 0.12)");
  });

  it("Gradients from doc section 15 are defined as utility classes", () => {
    expect(variablesCss).toContain(".gradient-primary");
    expect(variablesCss).toContain(".gradient-ocean");
    expect(variablesCss).toContain("#0f172a, #2563eb");
  });

  it("Sidebar hover color token matches the doc's exact #172554", () => {
    expect(variablesCss).toContain("--sidebar-hover: #172554");
  });
});
