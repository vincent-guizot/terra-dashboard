import { Globe, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border-default px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-text-muted">{siteConfig.footer.copyright}</p>
        <div className="flex items-center gap-3 text-text-muted">
          <a href={siteConfig.social.twitter} aria-label="Social" className="hover:text-text-primary">
            <MessageCircle className="size-4" />
          </a>
          <a href={siteConfig.social.github} aria-label="Website" className="hover:text-text-primary">
            <Globe className="size-4" />
          </a>
          <a href={siteConfig.social.linkedin} aria-label="Contact" className="hover:text-text-primary">
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
