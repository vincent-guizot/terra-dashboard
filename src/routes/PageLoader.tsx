import { Spinner } from "@/components/ui/spinner";

/**
 * Suspense fallback shown while a route-level chunk (lazy-loaded page) is
 * still downloading. Kept intentionally minimal/fast so it doesn't cause
 * layout shift against the real page content.
 */
export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <Spinner size={28} />
    </div>
  );
}
