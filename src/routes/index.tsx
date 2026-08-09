import { createBrowserRouter } from "react-router-dom";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { BlankLayout } from "@/layouts/BlankLayout";
import { SettingsLayout } from "@/layouts/SettingsLayout";
import { ProtectedRoute } from "./ProtectedRoute";

import { HomePage } from "@/pages/dashboard/home/HomePage";
import { CustomersPage } from "@/pages/dashboard/customers/CustomersPage";
import { CustomerDetailPage } from "@/pages/dashboard/customers/CustomerDetailPage";
import { ProductsPage } from "@/pages/dashboard/products/ProductsPage";
import { ProductDetailPage } from "@/pages/dashboard/products/ProductDetailPage";
import { OrdersPage } from "@/pages/dashboard/orders/OrdersPage";
import { OrderDetailPage } from "@/pages/dashboard/orders/OrderDetailPage";
import { ProjectsPage } from "@/pages/dashboard/projects/ProjectsPage";
import { ProjectDetailPage } from "@/pages/dashboard/projects/ProjectDetailPage";
import { InvoicesPage } from "@/pages/dashboard/invoices/InvoicesPage";
import { InvoiceDetailPage } from "@/pages/dashboard/invoices/InvoiceDetailPage";
import { TasksPage } from "@/pages/dashboard/tasks/TasksPage";
import { AnalyticsPage } from "@/pages/dashboard/analytics/AnalyticsPage";
import { CalendarPage } from "@/pages/dashboard/calendar/CalendarPage";
import { MessagesPage } from "@/pages/dashboard/messages/MessagesPage";
import { NotificationsPage } from "@/pages/dashboard/notifications/NotificationsPage";
import { ProfilePage } from "@/pages/dashboard/profile/ProfilePage";
import { SettingsGeneralPage } from "@/pages/dashboard/settings/SettingsGeneralPage";
import { SettingsSecurityPage } from "@/pages/dashboard/settings/SettingsSecurityPage";
import { SettingsNotificationsPage } from "@/pages/dashboard/settings/SettingsNotificationsPage";
import { SettingsBillingPage } from "@/pages/dashboard/settings/SettingsBillingPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { OnboardingPage } from "@/pages/auth/OnboardingPage";

import { NotFoundPage } from "@/pages/error/NotFoundPage";
import { ErrorPage } from "@/pages/error/ErrorPage";
import { ComponentsIndexPage } from "@/pages/catalog/ComponentsIndexPage";
import { LayoutIndexPage } from "@/pages/catalog/LayoutIndexPage";
import { TypographyPage } from "@/pages/foundations/TypographyPage";
import { ComponentCatalogPage } from "@/pages/catalog/ComponentCatalogPage";
import { Navigate } from "react-router-dom";

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
          { path: "/dashboard", element: <HomePage /> },
          { path: "/customers", element: <CustomersPage /> },
          { path: "/customers/:id", element: <CustomerDetailPage /> },
          { path: "/products", element: <ProductsPage /> },
          { path: "/products/:id", element: <ProductDetailPage /> },
          { path: "/orders", element: <OrdersPage /> },
          { path: "/orders/:id", element: <OrderDetailPage /> },
          { path: "/projects", element: <ProjectsPage /> },
          { path: "/projects/:id", element: <ProjectDetailPage /> },
          { path: "/invoices", element: <InvoicesPage /> },
          { path: "/invoices/:id", element: <InvoiceDetailPage /> },
          { path: "/tasks", element: <TasksPage /> },
          { path: "/analytics", element: <AnalyticsPage /> },
          { path: "/calendar", element: <CalendarPage /> },
          { path: "/messages", element: <MessagesPage /> },
          { path: "/notifications", element: <NotificationsPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/typography", element: <TypographyPage /> },
          { path: "/components", element: <ComponentsIndexPage /> },
          { path: "/components/:slug", element: <ComponentCatalogPage kind="atomic" /> },
          { path: "/layout-components", element: <LayoutIndexPage /> },
          { path: "/layout-components/:slug", element: <ComponentCatalogPage kind="layout" /> },
          {
            path: "/settings",
            element: <SettingsLayout />,
            children: [
              { index: true, element: <Navigate to="/settings/general" replace /> },
              { path: "general", element: <SettingsGeneralPage /> },
              { path: "security", element: <SettingsSecurityPage /> },
              { path: "notifications", element: <SettingsNotificationsPage /> },
              { path: "billing", element: <SettingsBillingPage /> },
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
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "onboarding", element: <OnboardingPage /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: "/error", element: <ErrorPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
