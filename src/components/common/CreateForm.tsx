import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useEffect,
  // useEffect,
} from "react";
// import { useModal } from "../ui/ModalCompound";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";
import ControlledFormInput from "./ControlledFormInput";
import { ActionStatus } from "@/types/index.types";
import { useRouter } from "next/navigation";
import { useModal } from "../ui/ModalCompound";

interface CreateFormProps {
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theAction: (...args: any) => Promise<ActionStatus>;
  inputPlaceholder: string;
  headerTitle: string;
  headerText: string;
  inputLabel: string;
  actionFor: "workspace" | "list";
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
}

function CreateForm({
  children,
  theAction,
  inputPlaceholder,
  headerTitle,
  headerText,
  inputLabel,
  actionFor,
  setInputValue: setNameValue,
  inputValue: nameValue,
}: CreateFormProps) {
  const { push } = useRouter();
  const [actionStatus, action, isPending] = useActionState(theAction, {
    status: "idle",
  });
  const { toggleModal } = useModal();

  const isFormValid = nameValue.trim().length > 0;

  useEffect(() => {
    if (actionStatus.status === "success" && "payload" in actionStatus) {
      push(`/home/${actionStatus.payload.listId}/table`);
      toggleModal();
    }
  }, [push, actionStatus, toggleModal]);

  return (
    <form
      action={action}
      className="flex max-w-80 flex-col gap-5 p-6 text-neutral-700 lg:max-w-lg lg:min-w-lg dark:text-neutral-500"
    >
      <header className="flex flex-col gap-2">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          {headerTitle}
        </h2>
        <p className="text-sm">{headerText}</p>
      </header>
      <main className="flex flex-col gap-2">
        <h3 className="font-medium text-neutral-600 dark:text-neutral-400">
          {inputLabel}
        </h3>
        <div className="flex items-center gap-3">
          {children}
          <div className="w-full">
            <ControlledFormInput
              disabled={isPending}
              name="name"
              type="text"
              placeholder={inputPlaceholder}
              setOutValue={setNameValue}
            />
          </div>
        </div>
      </main>
      <footer className="mt-3 flex justify-between">
        {actionStatus.status === "error" && (
          <ErrorMessage error={actionStatus.error} />
        )}
        <Button
          disabled={isPending || !isFormValid}
          pending={isPending}
          size="medium"
          ariaLabel={`${actionFor} create button`}
          extraClasses="ml-auto"
        >
          Create
        </Button>
      </footer>
    </form>
  );
}

export default CreateForm;
