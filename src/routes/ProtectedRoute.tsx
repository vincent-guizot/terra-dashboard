import { Outlet } from "react-router-dom";

/**
 * Dummy auth guard placeholder.
 *
 * Replace the `isAuthenticated` check with real auth state (context,
 * cookie/session check, or a query to your auth provider) once a
 * backend is wired up. For now it always allows access so the
 * dashboard routes are browsable during development.
 */
const isAuthenticated = true;

export function ProtectedRoute() {
  if (!isAuthenticated) {
    // return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}
