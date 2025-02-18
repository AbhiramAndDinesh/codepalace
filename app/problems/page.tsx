import { getQuestions, userSolvedIds } from "@/actions/question";
import { auth } from "@/auth";
import GridExample from "./ag-grid";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export interface Questionsdata {
  problem_id: number;
  title: string;
  slug: string;
  statement: string;
  difficulty: string;
  points: number;
  language: string;
  inCourse: boolean;
  lesson_id: string | null;
  createdAt: Date;
  updatedAt: Date;
  solved: boolean;
}
const QuestionsPage = async () => {
  const session = await auth();
  const user_id = session?.user?.id || "";
  const questions_ = await getQuestions();
  const solved_ids = await userSolvedIds(user_id);
  const solved_ = new Set<number>();
  for (let i = 0; solved_ids && i < solved_ids.length; i++) {
    solved_.add(solved_ids[i].problem_id);
  }
  const questions: Array<Questionsdata> = [];
  // questions_?.map((ques) => {
  //   questions.push({
  //     ...ques,
  //     solved: solved.has(ques.problem_id),
  //   });
  // });
  for (let i = 0; questions_ && i < questions_.length; i++) {
    questions.push({
      ...questions_[i],
      solved: solved_.has(questions_[i].problem_id),
    });
  }
  if (!questions) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="p-3 pt-16 left-0 right-0 max-w-screen-md m-auto">
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] z-[-10]",
        )}
      />
      <h3 className="text-4xl mb-3 font-spaceGrotesk font-semibold text-red-500">
        Problems
      </h3>
      <div className="h-[80vh]">
        <GridExample data={questions} />
      </div>
    </div>
  );
};

export default QuestionsPage;
