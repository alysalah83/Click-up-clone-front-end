import SortBtn from "@/features/task/views/Board/components/SortBtn";
import { usePathname } from "next/navigation";

function HeaderFeatures() {
  const pathname = usePathname();
  const isInBoardPage = pathname.includes("/board");

  return (
    <div className="flex items-center gap-4">
      {isInBoardPage && <SortBtn />}
    </div>
  );
}

export default HeaderFeatures;
