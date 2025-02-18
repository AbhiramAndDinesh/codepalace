"use client";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Link from "next/link";
import { themeQuartz, iconSetQuartzBold } from "ag-grid-community";
import { Questionsdata } from "../../problems/page";
import { deleteProblemFromCollection } from "@/actions/collection";
import { toast } from "sonner";
import { BookmarkX } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface DifficultyProps {
  value: string;
}

const deleteProblem = async (collection_id: string, problem_id: number) => {
  try {
    const res = await deleteProblemFromCollection(collection_id, problem_id);
    if (!res) {
      toast.error("Failed to remove problem from collection");
    }
    if (res?.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
};

const DeleteProblemComponent = (props) => {
  return (
    <div className="h-full flex items-center">
      <BookmarkX
        className="hover:cursor-pointer text-gray-500 hover:text-red-500"
        size={20}
        onClick={() =>
          deleteProblem(props.data.collection_id, props.data.problem_id)
        }
      />
    </div>
  );
};

const DifficultyComponent = (props: DifficultyProps) => {
  // const value = props.value;
  let background = "text-green-400/75";
  if (props.value === "Medium") background = "text-orange-400/75";
  if (props.value === "Hard") background = "text-red-500/75";
  return (
    <div className="">
      <p className={`font-spaceGrotesk ${background}`}>{props.value}</p>
    </div>
  );
};

const GridExample = ({ data }: { data: Questionsdata[] }) => {
  const myTheme = themeQuartz.withPart(iconSetQuartzBold).withParams({
    accentColor: "#EF4444",
    backgroundColor: "#1A1919",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
      ref: "foregroundColor",
      mix: 0.07,
      onto: "backgroundColor",
    },
    foregroundColor: "#9CA3AF",
    headerFontSize: 14,
    headerFontWeight: 600,
    spacing: 8,
  });

  const [colDefs, setColDefs] = useState([
    {
      field: "solved",
      headerName: "Status",
      filter: true,
      width: 120,
      cellRenderer: (props) => {
        return (
          <input
            type="checkbox"
            checked={props.value}
            className="mt-2.5 w-[1rem] h-[1rem] appearance-none rounded border-[1px] border-red-500 checked:bg-red-500/75 checked:border-none relative checked:after:content-['✔'] text-background checked:after:absolute checked:after:left-[0.2rem] checked:after:top-[0.03rem] checked:after:text-xs"
          />
        );
      },
    },
    {
      field: "title",
      filter: true,
      minWidth: 200,
      cellRenderer: (props) => {
        return (
          <Link href={`/problems/${props.data.slug}`} className="font-medium">
            {props.value}
          </Link>
        );
      },
      flex: 1,
    },
    {
      field: "difficulty",
      filter: true,
      cellRenderer: DifficultyComponent,
      width: 150,
    },
    {
      headerName: "Delete",
      cellRenderer: DeleteProblemComponent,
      width: 100,
    },
  ]);

  return (
    <div className="h-full">
      <div className="h-full max-md:hidden">
        <AgGridReact<Questionsdata>
          rowData={data}
          // @ts-expect-error - I don't know why this ts error is occuring
          columnDefs={colDefs}
          theme={myTheme}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
      <div className="h-full md:hidden">
        <AgGridReact<Questionsdata>
          rowData={data}
          // @ts-expect-error - I don't know why this ts error is occuring
          columnDefs={colDefs}
          theme={myTheme}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default GridExample;
