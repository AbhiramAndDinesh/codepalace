import { getQuestionBySlug, userSolved } from "@/actions/admin/question";
import { signIn } from "@/auth";
import Playground from "@/components/Playground";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { auth } from "@/auth";
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
    <div className="h-screen">
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <button
          type="submit"
          className="bg-black px-2 py-1 rounded-sm text-white"
        >
          Sign in
        </button>
      </form>
      {solved && <div className="bg-green-500">Solved</div>}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={45} minSize={20}>
          <div className="w-full bg-blue-200 h-full">
            <h1>{problem.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: problem.statement }} />
          </div>
        </ResizablePanel>
        <ResizableHandle
          className="w-[5px] hover:bg-blue-500 bg-dark-layer-2"
          withHandle
        />
        <ResizablePanel className="h-full" defaultSize={65} minSize={40}>
          <div className="w-full h-full p-3 bg-red-400">
            <Playground language="python" problem_id={problem.problem_id} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProblemPage;
