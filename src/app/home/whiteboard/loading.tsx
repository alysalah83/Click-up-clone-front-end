import MiniSpinner from "@/components/ui/MiniSpinner";

function loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MiniSpinner width="large" padding="p-1.5" />
    </div>
  );
}

export default loading;
