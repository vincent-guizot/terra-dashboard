import { describe, it, expect, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils";
import { LogoBox } from "@/components/layout/logo-box";
import { siteConfig } from "@/config/site";

describe("LogoBox", () => {
  afterEach(() => {
    // reset any test-time mutation of siteConfig.logo.src
    (siteConfig.logo as { src?: string }).src = undefined;
  });

  it("renders the app short name by default (variant='full', size='md')", () => {
    renderWithRouter(<LogoBox />);
    expect(screen.getByText(siteConfig.appShortName)).toBeInTheDocument();
  });

  it("renders the full app name at size='lg' (used in AuthLayout)", () => {
    renderWithRouter(<LogoBox size="lg" />);
    expect(screen.getByText(siteConfig.appName)).toBeInTheDocument();
  });

  it("hides the text label entirely when variant='icon' (used in collapsed sidebar)", () => {
    renderWithRouter(<LogoBox variant="icon" />);
    expect(screen.queryByText(siteConfig.appShortName)).not.toBeInTheDocument();
  });

  it("falls back to the Hexagon icon mark when siteConfig.logo.src is not set", () => {
    const { container } = renderWithRouter(<LogoBox />);
    expect(container.querySelector("svg.lucide-hexagon")).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("renders an <img> instead of the icon mark once siteConfig.logo.src is set (this is the company-logo swap point)", () => {
    (siteConfig.logo as { src?: string }).src = "/company-logo.svg";
    const { container } = renderWithRouter(<LogoBox />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/company-logo.svg");
    expect(
      container.querySelector("svg.lucide-hexagon"),
    ).not.toBeInTheDocument();
  });
});
