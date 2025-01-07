import React from "react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-5">
      <DotPattern
        className={cn(
          "[mask-image:linear-gradient(to_bottom,gray,transparent,transparent)]",
        )}
      />
      <div className="max-w-screen-md m-auto">{children}</div>
    </div>
  );
};

export default CourseLayout;
