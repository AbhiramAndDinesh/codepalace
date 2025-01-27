import { getQuestionBySlug, userSolved } from "@/actions/question";
import ReactMarkdown from "react-markdown";
import Playground from "@/components/Playground";
import { CheckCheck } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { auth } from "@/auth";

// import { signIn } from "@/auth"
// <form
//   action={async () => {
//     "use server";
//     await signIn();
//   }}
// >
//   <button
//     className="bg-white px-5 py-3 text-black rounded-full"
//     type="submit"
//   >
//     Sign in
//   </button>
// </form>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getSubmissions } from "@/actions/code";
import React from "react";
import Submission from "@/components/Submission";

interface Submissionstype {
  submission_id: string;
  code: string;
  accepted: boolean;
  failed_cases: number;
  time: string;
  memory: string;
  submittedAt: Date;
}
const ProblemPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const problem = await getQuestionBySlug((await params).slug);
  const session = await auth();
  let solved = false;
  let submissions: Submissionstype[] | undefined = [];
  if (session?.user && problem) {
    solved = await userSolved({
      user_id: session.user.id!,
      problem_id: problem?.problem_id,
    });
    submissions =
      (await getSubmissions(problem.problem_id, session.user.id!)) || [];
  }

  if (!problem)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="text-3xl"> Loading...</h1>
      </div>
    );
  const answer = problem.Answers == null ? "No answer" : problem.Answers.answer;
  return (
    <div className="min-h-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="max-h-[100vh] p-3">
        <ResizablePanel
          defaultSize={45}
          minSize={20}
          className="border border-gray-500 rounded-lg mr-0.5"
        >
          <Tabs defaultValue="problem" className="w-full h-[100vh]">
            <div className="w-full border-b border-gray-500">
              <TabsList className="">
                <TabsTrigger value="problem" className="pt-1.5">
                  Problem
                </TabsTrigger>
                <TabsTrigger value="ide" className="pt-1.5 lg:hidden">
                  Ide
                </TabsTrigger>
                <TabsTrigger value="solution" className="pt-1.5">
                  Solution
                </TabsTrigger>
                <TabsTrigger value="submissions" className="pt-1.5">
                  Submissions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="problem" className="h-full relative">
              {solved && (
                <CheckCheck className="text-red-500 w-6 h-6 absolute right-2 z-20" />
              )}

              <div className="w-full h-full">
                <h1>
                  <code>{problem.title}</code>
                </h1>
                <ReactMarkdown>{problem.statement}</ReactMarkdown>
              </div>
            </TabsContent>
            <TabsContent value="ide" className="h-full">
              <div className="w-full h-full">
                <Playground language="python" problem_id={problem.problem_id} />
              </div>
            </TabsContent>
            <TabsContent value="submissions">
              <div className="flex flex-col items-center px-2 gap-2 transition-all">
                {submissions.map((item) => {
                  return <Submission item={item} key={item.submission_id} />;
                })}
              </div>
            </TabsContent>

            <TabsContent value="solution">
              <ReactMarkdown>{answer}</ReactMarkdown>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle className="w-[5px] bg-background" />
        <ResizablePanel
          defaultSize={65}
          minSize={40}
          className="lg:flex hidden"
        >
          <div className="w-full h-full">
            <Playground language="python" problem_id={problem.problem_id} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProblemPage;
