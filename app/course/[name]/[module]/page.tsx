import { FileText, Code, CirclePlay, CircleCheckBig } from "lucide-react";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";

const Lesson = ({
  name,
  type,
  completed,
}: {
  name: string;
  type: string;
  completed: boolean;
}) => {
  return (
    <div className="w-full h-[50px] flex gap-3 even:bg-gray-400/10 px-4 items-center">
      {/* <div></div> */}
      {type === "video" && <CirclePlay size={20} className="text-red-500" />}
      {type === "text" && <FileText size={20} className="text-red-500" />}
      {type === "problem" && <Code size={20} className="text-red-500" />}
      <p className="text-gray-300 max-sm:text-sm ml-2 font-gabarito">{name}</p>
      {completed && (
        <CircleCheckBig size={20} className="ml-auto text-red-300" />
      )}
    </div>
  );
};

const LessonsPage = () => {
  const lessons = [
    {
      title: "lesson 1",
      type: "video",
      completed: true,
    },
    {
      title: "lesson 2",
      type: "text",
      completed: true,
    },
    {
      title: "lesson 3",
      type: "problem",
      completed: true,
    },
    {
      title: "lesson 4",
      type: "video",
      completed: false,
    },
    {
      title: "lesson 5",
      type: "text",
      completed: false,
    },
    {
      title: "lesson 6",
      type: "problem",
      completed: false,
    },
  ];
  return (
    <div className="w-full pt-10">
      <h1 className="text-2xl font-spaceGrotesk text-[#EDEDED] mb-5 font-medium flex gap-10">
        Introduction to Java
        <AnimatedCircularProgressBar
          max={100}
          min={0}
          value={50}
          gaugePrimaryColor="#ef4444"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          className="h-[40px] w-[40px] text-xs text-[#B7B7B7] translate-y-[80px]"
        />
      </h1>

      <p className="text-[#B7B7B7] text-lg font-gabarito mb-10">
        This module introduces you to Java, its history, and why it remains a
        popular programming language. You will also learn to set up your
        development environment.
      </p>
      <div className="w-full border border-red-500 rounded-md">
        {lessons.map((lesson) => (
          <Lesson
            key={lesson.title}
            name={lesson.title}
            type={lesson.type}
            completed={lesson.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
