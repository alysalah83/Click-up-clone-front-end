import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useEffect,
  // useEffect,
} from "react";
// import { useModal } from "../ui/ModalCompound";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ControlledFormInput from "./Input/ControlledInput";
import { useRouter } from "next/navigation";
import { useModal } from "./ModalCompound";
import { ActionResponse } from "../types/action.types";
import { Button } from "./Button";

interface CreateFormProps {
  children?: ReactNode;

  theAction: (...args: any) => Promise<ActionResponse>;
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
          <ErrorMessage
            error={actionStatus.error.message}
            errorObject={actionStatus.error.errors}
          />
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
