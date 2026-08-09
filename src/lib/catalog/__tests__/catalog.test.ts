import { describe, it, expect } from "vitest";
import { allAtomicEntries, allLayoutEntries, findAtomicEntry, findLayoutEntry } from "@/lib/catalog";

describe("Component catalog", () => {
  it("has exactly 48 atomic entries", () => {
    expect(allAtomicEntries).toHaveLength(48);
  });

  it("has exactly 18 layout entries", () => {
    expect(allLayoutEntries).toHaveLength(18);
  });

  it("every atomic entry has a unique slug", () => {
    const slugs = allAtomicEntries.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every layout entry has a unique slug", () => {
    const slugs = allLayoutEntries.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every atomic entry has a name, category, description and render fn", () => {
    for (const entry of allAtomicEntries) {
      expect(entry.name).toBeTruthy();
      expect(entry.category).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(typeof entry.render).toBe("function");
    }
  });

  it("every layout entry has a name, category, description and render fn", () => {
    for (const entry of allLayoutEntries) {
      expect(entry.name).toBeTruthy();
      expect(entry.category).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(typeof entry.render).toBe("function");
    }
  });

  it("findAtomicEntry resolves a known slug and returns undefined for unknown", () => {
    expect(findAtomicEntry("button")?.name).toBe("Button");
    expect(findAtomicEntry("does-not-exist")).toBeUndefined();
  });

  it("findLayoutEntry resolves a known slug and returns undefined for unknown", () => {
    expect(findLayoutEntry("app-shell")?.name).toBe("App Shell");
    expect(findLayoutEntry("does-not-exist")).toBeUndefined();
  });
});
