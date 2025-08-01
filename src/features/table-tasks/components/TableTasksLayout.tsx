import TableTasksBody from "./TableTasksBody";
import TableAddTaskRow from "./TableAddTaskRow";
import CheckTaskProvider from "../context/CheckTaskProvider";
import TableTasksHeader from "./TableTasksHeader";
import TaskFeaturesRow from "@/shared/tasks/components/TaskFeaturesRow";

function TableTasksLayout({
  token,
  listId,
}: {
  token: string;
  listId: string;
}) {
  return (
    <section className="w-full min-w-3xl overflow-x-hidden md:overflow-x-auto">
      <CheckTaskProvider listId={listId} token={token}>
        <TableTasksHeader />
        <TableTasksBody listId={listId} token={token} />
        <TaskFeaturesRow />
      </CheckTaskProvider>

      <TableAddTaskRow />
    </section>
  );
}

export default TableTasksLayout;
