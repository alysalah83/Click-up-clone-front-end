import DashboardStatusPie from "./DashboardStatusPie";
import DashboardStatusCards from "./DashboardStatusCards";
import DashboardPriorityPie from "./DashboardPriorityPie";

async function DashboardLayout() {
  return (
    <main className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="col-span-1 grid grid-cols-2 gap-4 text-neutral-400">
        <DashboardStatusCards />
      </section>
      <section className="rounded-xl border border-neutral-600 bg-neutral-900 p-4 text-neutral-400">
        <DashboardStatusPie />
      </section>
      <section className="col-span-1 rounded-xl border border-neutral-600 bg-neutral-900 p-4 text-neutral-400">
        <DashboardPriorityPie />
      </section>
    </main>
  );
}

export default DashboardLayout;
