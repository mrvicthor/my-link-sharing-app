import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { useNotification } from "@/hooks/useNotification";

const PreviewHeader = () => {
  const { setNotification } = useNotification();
  return (
    <header className=" h-[4.875rem] container">
      <nav className="bg-[#ffffff] w-full  flex h-full rounded-md items-center justify-between pl-6 pr-4">
        <NavLink
          to="/profile"
          className="text-[#633cff] border border-[#633CFF] px-4 py-2 text-sm rounded-md font-medium"
        >
          Back to Editor
        </NavLink>
        <Button
          variant={"saveButton"}
          className="bg-[#633cff]"
          onClick={() => setNotification(true)}
        >
          Share Link
        </Button>
      </nav>
    </header>
  );
};

export default PreviewHeader;
