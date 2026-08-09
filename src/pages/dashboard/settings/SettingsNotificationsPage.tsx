import { ContainerCard } from "@/components/layout/container-card";
import { Switch } from "@/components/ui/switch";

const rows = [
  { label: "Email notifications", description: "Receive updates via email." },
  { label: "Push notifications", description: "Receive updates on this device." },
  { label: "Weekly digest", description: "A summary of activity every Monday." },
  { label: "Product updates", description: "News about new features and improvements." },
];

export function SettingsNotificationsPage() {
  return (
    <ContainerCard className="max-w-2xl divide-y divide-border-default">
      {rows.map((row, i) => (
        <div key={row.label} className={cnFirst(i)}>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-text-primary">{row.label}</p>
              <p className="text-xs text-text-muted">{row.description}</p>
            </div>
            <Switch defaultChecked={i < 2} />
          </div>
        </div>
      ))}
    </ContainerCard>
  );
}

function cnFirst(i: number) {
  return i === 0 ? "pt-0" : "";
}
