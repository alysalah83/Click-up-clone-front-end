import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useModal } from "@/components/ui/ModalCompound";
import { ICONS_MAP } from "@/constants/iconsMap";
import { useActionState } from "react";
import { ActionStatus } from "@/types/index.types";

interface OptionsDeleteConfirm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteAction: (...args: any) => Promise<ActionStatus>;
  deletedName: string;
}

function OptionsDeleteConfirm({
  deleteAction,
  deletedName,
}: OptionsDeleteConfirm) {
  const { closeModal } = useModal();
  const [state, action, isPending] = useActionState(deleteAction, {
    status: "idle",
  });

  return (
    <section className="flex flex-col gap-5">
      <div className="flex max-w-xs min-w-md flex-col gap-4 p-6 pb-0">
        <div className="w-fit rounded-xl border border-red-500 bg-red-400/30 p-2">
          <ICONS_MAP.trash className="size-6 text-red-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-medium">Delete: {deletedName}</h3>
          <p className="text-sm font-medium text-neutral-500">
            All tasks and projects within this Space will be deleted.
            Additionally, automations will become inactive.
          </p>
        </div>
        {state.status === "error" && <ErrorMessage error={state.error} />}
      </div>
      <div className="flex w-full gap-2 rounded-br-xl rounded-bl-xl border-t border-neutral-700 bg-neutral-900 px-6 py-5">
        <Button
          type="secondary"
          stretch={true}
          disabled={isPending}
          ariaLabel="cancel delete confirmation"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <form action={action} className="w-full">
          <Button
            type="delete"
            stretch={true}
            disabled={isPending}
            pending={isPending}
            ariaLabel="confirm delete"
            pendingSpinnerWidth="medium"
          >
            Delete
          </Button>
        </form>
      </div>
    </section>
  );
}

export default OptionsDeleteConfirm;
