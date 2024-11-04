import { getQuestionBySlug, userSolved } from "@/actions/admin/question";
import Playground from "@/components/Playground";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProblemPage = async ({ params }: { params: { slug: string } }) => {
  const problem = await getQuestionBySlug((await params).slug);
  const session = await auth();
  let solved = false;
  if (session?.user && problem) {
    solved = await userSolved({
      user_id: session.user.id!,
      problem_id: problem?.problem_id,
    });
  }

  if (!problem)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1 className="text-3xl"> Loading...</h1>
      </div>
    );

  return (
    <div className="min-h-screen">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={45} minSize={20} className="bg-blue-200">
          <Tabs defaultValue="question">
            <TabsList className="bg-red-100 w-full flex justify-evenly">
              <TabsTrigger value="question" className="flex-grow">
                Question
              </TabsTrigger>
              <TabsTrigger value="answer" className="flex-grow">
                Answer
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex-grow">
                Submissions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="question" className="bg-green-200">
              <div className="w-full h-screen">
                <h1>{problem.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: problem.statement }} />
              </div>
            </TabsContent>
            <TabsContent value="answer">Change your password here.</TabsContent>
            <TabsContent value="submission">
              Change your password here.
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle
          className="w-[5px] hover:bg-blue-500 bg-dark-layer-2"
          withHandle
        />
        <ResizablePanel className="h-screen" defaultSize={65} minSize={40}>
          <div className="w-full h-full p-3 bg-red-400">
            <Playground language="python" problem_id={problem.problem_id} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProblemPage;
