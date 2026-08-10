/**
 * Branding / site configuration.
 *
 * This is the single place to edit when rebranding Terra Dashboard
 * for a specific company or product. Nothing else in the codebase
 * should hardcode the app name, logo, or tagline directly.
 */
export const siteConfig = {
  appName: "Terra Dashboard",
  appShortName: "Terra",
  tagline: "Consistent layouts. Better experiences.",
  description:
    "A reusable dashboard design system built with React, TypeScript and Tailwind CSS.",
  logo: {
    // To use a company logo image instead of the default icon mark,
    // set `src` to an asset path (e.g. "/logo.svg" in /public, or an
    // imported asset). LogoBox automatically renders the image when
    // `src` is set, and falls back to the Hexagon icon mark otherwise.
    icon: "hexagon",
    src: "/logo/terra-icon-dark.png",
    // src: undefined as string | undefined,
    alt: "Terra Dashboard logo",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Terra Dashboard by Vincent Sadino G. All rights reserved.`,
  },
  social: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
