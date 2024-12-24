"use client";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import SparklesText from "@/components/ui/sparkles-text";

const Module = ({ name, progress }: { name: string; progress: number }) => {
  return (
    <div className="relative h-[120px]">
      <div className="h-full hover:cursor-pointer border bg-[#1A1919] border-red-500 border-dashed text-gray-300 hover:translate-x-2 hover:-translate-y-2 transition-all duration-100 rounded-md p-3 w-full flex justify-center items-center">
        <p className="font-spaceGrotesk text-sm text-[#B7B7B7]">{name}</p>
      </div>
      <div className="absolute h-full rounded-md z-[-1] border border-red-500 border-dashed bg-red-500 w-full top-0 left-0"></div>
    </div>
  );
};

const ModulesPage = () => {
  const params = useParams();
  const name = params.name;
  return (
    <div className="pt-10">
      <SparklesText
        sparklesCount={3}
        text={`${name}`}
        className="text-3xl font-spaceGrotesk font-semibold mb-1 text-[#EDEDED] capitalize"
      />
      ;
      <p className="text-[#B7B7B7] text-lg font-gabarito mb-10">
        Master the fundamentals of Java programming with our comprehensive
        course. Learn essential concepts, build real-world projects, and set a
        strong foundation for your coding journey.
      </p>
      <div className="flex gap-3 justify-between items-center mb-10">
        <h3 className="text-[#B7B7B7] text-lg">Progress:</h3>
        <Progress
          value={30}
          className="grow text-red-500 border border-red-600 h-[15px] bg-background"
        />
        <h3 className="text-lg text-[#B7B7B7]">30%</h3>
      </div>
      <h2 className="text-2xl text-[#EDEDED] font-spaceGrotesk mb-5 font-medium">
        Modules
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <Module name="Module 1" progress={40} />
        <Module name="Module 1" progress={40} />
        <Module name="Module 1" progress={40} />
        <Module name="Module 1" progress={40} />
        <Module name="Module 1" progress={40} />
        <Module name="Module 1" progress={40} />
      </div>
    </div>
  );
};

export default ModulesPage;
