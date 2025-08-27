import DashboardStatusPie from "./DashboardStatusPie";
import DashboardStatusCards from "./DashboardStatusCards";
import DashboardPriorityPie from "./DashboardPriorityPie";

async function DashboardLayout() {
  return (
    <main className="grid grid-cols-1 gap-6 text-neutral-600 lg:grid-cols-2 dark:text-neutral-400">
      <section className="col-span-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardStatusCards />
      </section>
      <section className="rounded-xl border border-neutral-200 bg-neutral-200 p-4 dark:border-neutral-600 dark:bg-neutral-900">
        <DashboardStatusPie />
      </section>
      <section className="col-span-1 rounded-xl border border-neutral-200 bg-neutral-200 p-4 dark:border-neutral-600 dark:bg-neutral-900">
        <DashboardPriorityPie />
      </section>
    </main>
  );
}

export default DashboardLayout;
