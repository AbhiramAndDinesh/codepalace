import { getQuestions, userSolvedIds } from "@/actions/question";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/auth";

// import { headers } from "next/headers";
interface Questionsdata {
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
  // const headersList = headers();
  // const referer = (await headersList).get("referer");
  // const url = referer ? new URL(referer) : null;
  // const pathname = url?.pathname || "/";
  //
  const session = await auth();
  const user_id = session?.user?.id || "";
  const arr = [1, 2, 3, 4, 5, 6];
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
    <div className="p-10">
      {/* <div className="flex gap-2 italic text-sm text-[#909399] items-center">
        <Link href={"/"}>home</Link>
        <ChevronRight size={14} />
        <p>problems</p>
      </div> */}

      <div className="w-full flex gap-5 py-5">
        <div className="course">
          <p>Learn Java</p>
        </div>
        <div className="course">
          <p>Learn Python</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl mb-5 font-spaceGrotesk text-gray-300">
          Collections
        </h3>
        <div className="w-full grid sm:grid-cols-3 grid-cols-2 gap-2 mb-5">
          {arr.map((index) => (
            <div key={index} className="relative">
              <div className="hover:cursor-pointer border bg-[#1A1919] border-red-700 border-dashed text-gray-300 hover:translate-x-1 hover:-translate-y-1 transition-all duration-100 rounded-md p-3 w-full flex justify-center items-center">
                <p className="font-spaceGrotesk text-sm text-red-600">
                  collection {index}fsjkdlfaksd
                </p>
              </div>
              <div className="absolute h-full rounded-md z-[-1] border border-red-700 border-dashed bg-red-700 w-full top-0 left-0"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <DataTable columns={columns} data={questions} />
      </div>
    </div>
  );
};

export default QuestionsPage;
