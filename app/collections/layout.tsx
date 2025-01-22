import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const CollectionsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="min-h-[100vh] max-w-screen-md mx-auto p-5">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] -z-20 h-[300px]"
          )}
        />
        {children}
      </div>
    </div>
  );
};

export default CollectionsLayout;
