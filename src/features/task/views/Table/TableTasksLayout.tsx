import Body from "./Body";
import TableAddTaskRow from "../../components/AddTaskRow/AddTaskRow";
import CheckTaskProvider from "../../context/CheckTaskProvider";
import Header from "./Header";
import ActionsRow from "../../components/ActionsRow";

function TableTasksLayout() {
  return (
    <section className="w-full min-w-3xl overflow-x-hidden md:overflow-x-auto">
      <CheckTaskProvider>
        <Header />
        <Body />
        <ActionsRow />
      </CheckTaskProvider>

      <TableAddTaskRow styleFor="table" />
    </section>
  );
}

export default TableTasksLayout;
