"use client";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Link from "next/link";
import { themeQuartz, iconSetQuartzBold } from "ag-grid-community";
import { Questionsdata } from "@/app/problems/page";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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

const Editgrid = ({
  data,
  handleSelect,
}: {
  data: Questionsdata[];
  handleSelect: (value: number, isChecked: boolean) => void;
}) => {
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
      field: "problem_id",
      headerName: "Selected",
      filter: true,
      width: 120,
      cellRenderer: (props) => {
        return (
          <Checkbox
            // className="border border-red-500 checked:bg-red-500/75 "
            className={cn("appearance-none rounded border-red-500")}
            value={props.value}
            onCheckedChange={(checked) => {
              handleSelect(props.value, checked as boolean);
            }}
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

export default Editgrid;
