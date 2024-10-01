import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const Loader = () => {
  return (
    <div className="flex justify-center mt-4">
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  );
};

export default Loader;
