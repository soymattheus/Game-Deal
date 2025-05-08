import { DashboardProvider } from "./dashboard";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  );
}