import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { BlankLayout } from "@/layouts/BlankLayout";
import { SettingsLayout } from "@/layouts/SettingsLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PageLoader } from "./PageLoader";

/**
 * Route-level code splitting.
 *
 * Every page component below is lazy-loaded via `React.lazy()` so it ships
 * in its own JS chunk, downloaded only when that route is actually visited
 * — instead of one large bundle shipped up front. Layouts (DashboardLayout,
 * AuthLayout, etc.) are imported eagerly since they render immediately on
 * every route change (sidebar, header) and splitting them would just add a
 * loading flash with no benefit.
 *
 * `withSuspense()` wraps each lazy element in a <Suspense> boundary with a
 * shared <PageLoader /> fallback, so route definitions below stay one-liners.
 */
function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

const HomePage = lazy(() => import("@/pages/dashboard/home/HomePage").then((m) => ({ default: m.HomePage })));
const CustomersPage = lazy(() => import("@/pages/dashboard/customers/CustomersPage").then((m) => ({ default: m.CustomersPage })));
const CustomerCreatePage = lazy(() => import("@/pages/dashboard/customers/CustomerCreatePage").then((m) => ({ default: m.CustomerCreatePage })));
const CustomerDetailPage = lazy(() => import("@/pages/dashboard/customers/CustomerDetailPage").then((m) => ({ default: m.CustomerDetailPage })));
const ProductsPage = lazy(() => import("@/pages/dashboard/products/ProductsPage").then((m) => ({ default: m.ProductsPage })));
const ProductCreatePage = lazy(() => import("@/pages/dashboard/products/ProductCreatePage").then((m) => ({ default: m.ProductCreatePage })));
const ProductDetailPage = lazy(() => import("@/pages/dashboard/products/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage })));
const OrdersPage = lazy(() => import("@/pages/dashboard/orders/OrdersPage").then((m) => ({ default: m.OrdersPage })));
const OrderCreatePage = lazy(() => import("@/pages/dashboard/orders/OrderCreatePage").then((m) => ({ default: m.OrderCreatePage })));
const OrderDetailPage = lazy(() => import("@/pages/dashboard/orders/OrderDetailPage").then((m) => ({ default: m.OrderDetailPage })));
const ProjectsPage = lazy(() => import("@/pages/dashboard/projects/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ProjectCreatePage = lazy(() => import("@/pages/dashboard/projects/ProjectCreatePage").then((m) => ({ default: m.ProjectCreatePage })));
const ProjectDetailPage = lazy(() => import("@/pages/dashboard/projects/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })));
const InvoicesPage = lazy(() => import("@/pages/dashboard/invoices/InvoicesPage").then((m) => ({ default: m.InvoicesPage })));
const InvoiceCreatePage = lazy(() => import("@/pages/dashboard/invoices/InvoiceCreatePage").then((m) => ({ default: m.InvoiceCreatePage })));
const InvoiceDetailPage = lazy(() => import("@/pages/dashboard/invoices/InvoiceDetailPage").then((m) => ({ default: m.InvoiceDetailPage })));
const TasksPage = lazy(() => import("@/pages/dashboard/tasks/TasksPage").then((m) => ({ default: m.TasksPage })));
const TaskCreatePage = lazy(() => import("@/pages/dashboard/tasks/TaskCreatePage").then((m) => ({ default: m.TaskCreatePage })));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage })));
const CalendarPage = lazy(() => import("@/pages/dashboard/calendar/CalendarPage").then((m) => ({ default: m.CalendarPage })));
const MessagesPage = lazy(() => import("@/pages/dashboard/messages/MessagesPage").then((m) => ({ default: m.MessagesPage })));
const NotificationsPage = lazy(() => import("@/pages/dashboard/notifications/NotificationsPage").then((m) => ({ default: m.NotificationsPage })));
const ProfilePage = lazy(() => import("@/pages/dashboard/profile/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const SettingsGeneralPage = lazy(() => import("@/pages/dashboard/settings/SettingsGeneralPage").then((m) => ({ default: m.SettingsGeneralPage })));
const SettingsSecurityPage = lazy(() => import("@/pages/dashboard/settings/SettingsSecurityPage").then((m) => ({ default: m.SettingsSecurityPage })));
const SettingsNotificationsPage = lazy(() => import("@/pages/dashboard/settings/SettingsNotificationsPage").then((m) => ({ default: m.SettingsNotificationsPage })));
const SettingsBillingPage = lazy(() => import("@/pages/dashboard/settings/SettingsBillingPage").then((m) => ({ default: m.SettingsBillingPage })));

const LoginPage = lazy(() => import("@/pages/auth/LoginPage").then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage").then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage").then((m) => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage").then((m) => ({ default: m.ResetPasswordPage })));
const OnboardingPage = lazy(() => import("@/pages/auth/OnboardingPage").then((m) => ({ default: m.OnboardingPage })));

const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const ErrorPage = lazy(() => import("@/pages/error/ErrorPage").then((m) => ({ default: m.ErrorPage })));
const ComponentsIndexPage = lazy(() => import("@/pages/catalog/ComponentsIndexPage").then((m) => ({ default: m.ComponentsIndexPage })));
const LayoutIndexPage = lazy(() => import("@/pages/catalog/LayoutIndexPage").then((m) => ({ default: m.LayoutIndexPage })));
const TypographyPage = lazy(() => import("@/pages/foundations/TypographyPage").then((m) => ({ default: m.TypographyPage })));
const ComponentCatalogPage = lazy(() => import("@/pages/catalog/ComponentCatalogPage").then((m) => ({ default: m.ComponentCatalogPage })));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: withSuspense(<HomePage />) },
          { path: "/customers", element: withSuspense(<CustomersPage />) },
          { path: "/customers/new", element: withSuspense(<CustomerCreatePage />) },
          { path: "/customers/:id", element: withSuspense(<CustomerDetailPage />) },
          { path: "/products", element: withSuspense(<ProductsPage />) },
          { path: "/products/new", element: withSuspense(<ProductCreatePage />) },
          { path: "/products/:id", element: withSuspense(<ProductDetailPage />) },
          { path: "/orders", element: withSuspense(<OrdersPage />) },
          { path: "/orders/new", element: withSuspense(<OrderCreatePage />) },
          { path: "/orders/:id", element: withSuspense(<OrderDetailPage />) },
          { path: "/projects", element: withSuspense(<ProjectsPage />) },
          { path: "/projects/new", element: withSuspense(<ProjectCreatePage />) },
          { path: "/projects/:id", element: withSuspense(<ProjectDetailPage />) },
          { path: "/invoices", element: withSuspense(<InvoicesPage />) },
          { path: "/invoices/new", element: withSuspense(<InvoiceCreatePage />) },
          { path: "/invoices/:id", element: withSuspense(<InvoiceDetailPage />) },
          { path: "/tasks", element: withSuspense(<TasksPage />) },
          { path: "/tasks/new", element: withSuspense(<TaskCreatePage />) },
          { path: "/analytics", element: withSuspense(<AnalyticsPage />) },
          { path: "/calendar", element: withSuspense(<CalendarPage />) },
          { path: "/messages", element: withSuspense(<MessagesPage />) },
          { path: "/notifications", element: withSuspense(<NotificationsPage />) },
          { path: "/profile", element: withSuspense(<ProfilePage />) },
          { path: "/typography", element: withSuspense(<TypographyPage />) },
          { path: "/components", element: withSuspense(<ComponentsIndexPage />) },
          { path: "/components/:slug", element: withSuspense(<ComponentCatalogPage kind="atomic" />) },
          { path: "/layout-components", element: withSuspense(<LayoutIndexPage />) },
          { path: "/layout-components/:slug", element: withSuspense(<ComponentCatalogPage kind="layout" />) },
          {
            path: "/settings",
            element: <SettingsLayout />,
            children: [
              { index: true, element: <Navigate to="/settings/general" replace /> },
              { path: "general", element: withSuspense(<SettingsGeneralPage />) },
              { path: "security", element: withSuspense(<SettingsSecurityPage />) },
              { path: "notifications", element: withSuspense(<SettingsNotificationsPage />) },
              { path: "billing", element: withSuspense(<SettingsBillingPage />) },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: withSuspense(<LoginPage />) },
      { path: "register", element: withSuspense(<RegisterPage />) },
      { path: "forgot-password", element: withSuspense(<ForgotPasswordPage />) },
      { path: "reset-password", element: withSuspense(<ResetPasswordPage />) },
      { path: "onboarding", element: withSuspense(<OnboardingPage />) },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: "/error", element: withSuspense(<ErrorPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
