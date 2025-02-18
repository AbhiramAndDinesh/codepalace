"use client";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Link from "next/link";
import { themeQuartz, iconSetQuartzBold } from "ag-grid-community";
import { Questionsdata } from "./page";

ModuleRegistry.registerModules([AllCommunityModule]);

interface DifficultyProps {
  value: string;
}

const DifficultyComponent = (props: DifficultyProps) => {
  // const value = props.value;
  let background = "text-green-400/75";
  if (props.value === "Medium") background = "text-orange-400/75";
  if (props.value === "Hard") background = "text-red-500/75";
  // return (
  //   <div className={`${background} px-2 py-1 text-sm rounded-sm inline`}>
  //     <p className="text-right">{value}</p>
  //   </div>
  // );
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
