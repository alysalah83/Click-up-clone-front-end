import { getTasksPriorityCount } from "@/lib/api/server/task/getTask";
import DashboardPriorityPieChart from "./DashboardPriorityPieChart";
import { TASK_PRIORITIES_LIST } from "@/shared/tasks/consts/task.consts";

async function DashboardPriorityPie() {
  const { urgent, high, normal, low } = await getTasksPriorityCount();
  const [urgentObj, highObj, normalObj, lowObj] = TASK_PRIORITIES_LIST;
  const data = [
    {
      name: "Urgent",
      value: urgent,
      fill: urgentObj.colorHex,
    },
    { name: "High", value: high, fill: highObj.colorHex },
    { name: "Normal", value: normal, fill: normalObj.colorHex },
    { name: "Low", value: low, fill: lowObj.colorHex },
  ];

  return (
    <>
      <h2 className="text-xl font-semibold">Priorities</h2>
      <div className="w-full">
        <DashboardPriorityPieChart data={data} />
      </div>
    </>
  );
}

export default DashboardPriorityPie;
