import DashboardHeader from "@/components/DashboardComp/DashboardHeader/DashboardHeader";
import Header from "@/components/Header/Header";

export default function MainLayout({ children }) {
  return (
    <div>
        <DashboardHeader />
        <main className="min-h-[calc(100vh-397px)]">{children}</main>
    </div>
  );
}