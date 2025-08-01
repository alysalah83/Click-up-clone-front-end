import { FormEventHandler, memo, useEffect, useRef, useState } from "react";

interface RenameFormProps {
  initialName: string;
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onSave: (name: string) => void;
}

function RenameForm({ onClose, initialName, onSave }: RenameFormProps) {
  const [nameValue, setNameValue] = useState(initialName);
  const containerRef = useRef<HTMLFormElement | null>(null);
  const isValid = nameValue.trim().length > 0;

  useEffect(() => {
    if (!containerRef.current) return;

    const handleClickOutside = function (e: MouseEvent) {
      if (e.target instanceof Node && containerRef.current?.contains(e.target))
        return;
      else onSave(nameValue);
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [onSave, nameValue]);

  const handleRename: FormEventHandler<HTMLFormElement> = function (e) {
    e.preventDefault();
    if (!isValid) return;
    if (initialName === nameValue) return;

    onSave(nameValue);
    onClose();
  };

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="w-full"
      ref={containerRef}
      onSubmit={handleRename}
    >
      <input
        onChange={(e) => setNameValue(e.target.value)}
        autoFocus
        value={nameValue}
        name="name"
        type="text"
        className="w-full text-sm text-neutral-100 outline-0"
        title="Rename Task"
      />
    </form>
  );
}

export default memo(RenameForm);
