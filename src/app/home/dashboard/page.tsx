import DashboardLayout from "@/features/dashboard/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

function DashboardPage() {
  return (
    <main className="p-8">
      <DashboardLayout />
    </main>
  );
}

export default DashboardPage;
