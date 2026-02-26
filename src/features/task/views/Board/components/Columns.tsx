"use client";

import Column from "./Column";
import { ActiveColumnFormProvider } from "../contexts/ActiveColumnFormProvider";
import AddTaskStatus from "../../../../status/components/AddStatus";
import DragProvider from "../contexts/DragProvider";
import { useStatuses } from "@/features/status/hooks/useStatuses";
import ColumnLoader from "./Loader";

function Columns() {
  const { statuses, isPending } = useStatuses();

  return (
    <main className="flex h-full flex-col gap-4 p-4 after:min-w-[0.1px] after:content-[''] lg:flex-row">
      <ActiveColumnFormProvider>
        <DragProvider>
          {isPending ? (
            <ColumnLoader columnCount={4} />
          ) : (
            statuses?.map((status) => (
              <Column statusItem={status} key={status.id} />
            ))
          )}
        </DragProvider>
      </ActiveColumnFormProvider>
      <AddTaskStatus />
    </main>
  );
}

export default Columns;
