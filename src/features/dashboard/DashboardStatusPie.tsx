import { getTasksCounts } from "@/lib/api/server/task/getTask";

import DashboardStatusPieChart from "./DashboardStatusPieChart";

async function DashboardStatusPie() {
  const { completeCount, inProgressCount, toDoCount } = await getTasksCounts();

  const data = [
    { name: "toDo", value: toDoCount },
    { name: "inProgress", value: inProgressCount },
    { name: "complete", value: completeCount },
  ];

  return (
    <>
      <h2 className="text-xl font-semibold">Workload by Status</h2>
      <div className="text- flex h-64 w-full items-center">
        <DashboardStatusPieChart data={data} />
      </div>
    </>
  );
}

export default DashboardStatusPie;
