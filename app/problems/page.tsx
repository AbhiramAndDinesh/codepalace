import { getQuestions } from "@/actions/question";
import { DataTable } from "./data-table";
import { columns } from "./columns";
const QuestionsPage = async () => {
  const questions = await getQuestions();
  if (!questions) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="p-10">
      <h1 className="text-3xl">Problems Page</h1>
      <div className="w-[1000px]">
        <DataTable columns={columns} data={questions} />
      </div>
    </div>
  );
};

export default QuestionsPage;
