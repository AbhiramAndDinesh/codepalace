import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const CollectionsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="min-h-[100vh] max-w-screen-md mx-auto p-5">
        <GridPattern
          width={50}
          height={50}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] z-[-10]",
          )}
        />
        {children}
      </div>
    </div>
  );
};

export default CollectionsLayout;
