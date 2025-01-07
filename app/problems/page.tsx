import { getQuestions } from "@/actions/question";
import { DataTable } from "./data-table";
import { columns } from "./columns";

// import { headers } from "next/headers";

const QuestionsPage = async () => {
  // const headersList = headers();
  // const referer = (await headersList).get("referer");
  // const url = referer ? new URL(referer) : null;
  // const pathname = url?.pathname || "/";
  //
  const arr = [1, 2, 3, 4, 5, 6];
  const questions = await getQuestions();

  if (!questions) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="p-10 absolute left-0 right-0 max-w-screen-md m-auto">
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
                  collection {index}
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
