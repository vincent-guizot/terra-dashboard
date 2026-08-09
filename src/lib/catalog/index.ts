import type { CatalogEntry } from "./types";
import { actionsEntries } from "./atomic-actions";
import { dataDisplayEntries } from "./atomic-data-display";
import { formControlsEntries } from "./atomic-form-controls";
import { feedbackEntries } from "./atomic-feedback";
import { overlayEntries } from "./atomic-overlay";
import { navigationEntries } from "./atomic-navigation";
import { layoutApplicationEntries } from "./layout-application";
import { layoutContentEntries } from "./layout-content";
import { layoutUtilityEntries } from "./layout-utility";

export type { CatalogEntry };

export const atomicCatalog: Record<string, CatalogEntry[]> = {
  Actions: actionsEntries,
  "Data Display": dataDisplayEntries,
  "Form Controls": formControlsEntries,
  Feedback: feedbackEntries,
  Overlay: overlayEntries,
  Navigation: navigationEntries,
};

export const layoutCatalog: Record<string, CatalogEntry[]> = {
  Application: layoutApplicationEntries,
  Content: layoutContentEntries,
  Utility: layoutUtilityEntries,
};

export const allAtomicEntries: CatalogEntry[] = Object.values(atomicCatalog).flat();
export const allLayoutEntries: CatalogEntry[] = Object.values(layoutCatalog).flat();

export function findAtomicEntry(slug: string): CatalogEntry | undefined {
  return allAtomicEntries.find((e) => e.slug === slug);
}

export function findLayoutEntry(slug: string): CatalogEntry | undefined {
  return allLayoutEntries.find((e) => e.slug === slug);
}
