import type { ReactNode } from "react";

export interface CatalogEntry {
  slug: string;
  name: string;
  category: string;
  description: string;
  render: () => ReactNode;
}
