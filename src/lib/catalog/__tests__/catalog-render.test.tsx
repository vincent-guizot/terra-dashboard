import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { allAtomicEntries, allLayoutEntries } from "@/lib/catalog";
import { ToastProvider } from "@/components/ui/toast";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

/**
 * Smoke-renders every single catalog demo (all 48 atomic + 18 layout =
 * 66 component pages) to guarantee none of them throw at render time.
 * This is what actually backs the "one dedicated page per component"
 * requirement — every entry must mount cleanly.
 */
describe("Catalog entries render without throwing", () => {
  for (const entry of [...allAtomicEntries, ...allLayoutEntries]) {
    it(`${entry.category} / ${entry.name} (slug: ${entry.slug})`, () => {
      expect(() =>
        render(
          <MemoryRouter>
            <ThemeProvider>
              <ToastProvider>
                <SidebarProvider>{entry.render()}</SidebarProvider>
              </ToastProvider>
            </ThemeProvider>
          </MemoryRouter>
        )
      ).not.toThrow();
    });
  }
});
