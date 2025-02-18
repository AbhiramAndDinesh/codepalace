"use client";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeQuartz, iconSetQuartzBold } from "ag-grid-community";
import { Button } from "@/components/ui/button";

ModuleRegistry.registerModules([AllCommunityModule]);

interface LeaderBoardInterface {
  user_id: string;
  username: string;
  codechefRating: number | null;
  codechefProblemsSolved: number | null;
  codechefContestsAttended: number | null;
  codeforcesRating: number | null;
  codeforcesContestsAttended: number | null;
  leetcodeRating: number | null;
  leetcodeProblemsSolved: number | null;
  leetcodeContestsAttended: number | null;
}

const GridExample = ({ data }: { data: LeaderBoardInterface[] }) => {
  const [allVisible, setAllVisible] = useState(false);
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
    spacing: 12,
  });
  const [colDefs, setColDefs] = useState([
    { field: "user_id", pinned: "left", width: 100 },
    { field: "username", pinned: "left", filter: true },
    { field: "codechefRating", filter: true },
    { field: "codechefProblemsSolved", filter: true, hide: false },
    { field: "codechefContestsAttended", filter: true, hide: false },
    { field: "codeforcesRating", filter: true },
    { field: "codeforcesContestsAttended", filter: true, hide: false },
    { field: "leetcodeRating", filter: true },
    { field: "leetcodeProblemsSolved", filter: true, hide: false },
    { field: "leetcodeContestsAttended", filter: true, hide: false },
  ]);

  const [colDefsMobile, setColDefsMobile] = useState([
    { field: "user_id", width: 100 },
    { field: "username", filter: true },
    { field: "codechefRating", filter: true },
    { field: "codechefProblemsSolved", filter: true, hide: false },
    { field: "codechefContestsAttended", filter: true, hide: false },
    { field: "codeforcesRating", filter: true },
    { field: "codeforcesContestsAttended", filter: true, hide: false },
    { field: "leetcodeRating", filter: true },
    { field: "leetcodeProblemsSolved", filter: true, hide: false },
    { field: "leetcodeContestsAttended", filter: true, hide: false },
  ]);

  const columnStateChange = () => {
    if (allVisible) {
      setColDefs([
        { field: "user_id", pinned: "left", width: 100 },
        { field: "username", pinned: "left", filter: true },
        { field: "codechefRating", filter: true },
        { field: "codechefProblemsSolved", filter: true, hide: false },
        { field: "codechefContestsAttended", filter: true, hide: false },
        { field: "codeforcesRating", filter: true },
        { field: "codeforcesContestsAttended", filter: true, hide: false },
        { field: "leetcodeRating", filter: true },
        { field: "leetcodeProblemsSolved", filter: true, hide: false },
        { field: "leetcodeContestsAttended", filter: true, hide: false },
      ]);

      setColDefsMobile([
        { field: "user_id", width: 100 },
        { field: "username", filter: true },
        { field: "codechefRating", filter: true },
        { field: "codechefProblemsSolved", filter: true, hide: false },
        { field: "codechefContestsAttended", filter: true, hide: false },
        { field: "codeforcesRating", filter: true },
        { field: "codeforcesContestsAttended", filter: true, hide: false },
        { field: "leetcodeRating", filter: true },
        { field: "leetcodeProblemsSolved", filter: true, hide: false },
        { field: "leetcodeContestsAttended", filter: true, hide: false },
      ]);
      setAllVisible(false);
    } else {
      setColDefs([
        { field: "user_id", pinned: "left", width: 100 },
        { field: "username", pinned: "left", filter: true },
        { field: "codechefRating", filter: true },
        { field: "codechefProblemsSolved", filter: true, hide: true },
        { field: "codechefContestsAttended", filter: true, hide: true },
        { field: "codeforcesRating", filter: true },
        { field: "codeforcesContestsAttended", filter: true, hide: true },
        { field: "leetcodeRating", filter: true },
        { field: "leetcodeProblemsSolved", filter: true, hide: true },
        { field: "leetcodeContestsAttended", filter: true, hide: true },
      ]);

      setColDefsMobile([
        { field: "user_id", width: 100 },
        { field: "username", filter: true },
        { field: "codechefRating", filter: true },
        { field: "codechefProblemsSolved", filter: true, hide: true },
        { field: "codechefContestsAttended", filter: true, hide: true },
        { field: "codeforcesRating", filter: true },
        { field: "codeforcesContestsAttended", filter: true, hide: true },
        { field: "leetcodeRating", filter: true },
        { field: "leetcodeProblemsSolved", filter: true, hide: true },
        { field: "leetcodeContestsAttended", filter: true, hide: true },
      ]);
      setAllVisible(true);
    }
  };

  return (
    <div className="h-full relative">
      <Button
        className="absolute -top-3 -right-7 rotate-[30deg] p-1 bg-red-500/65 rounded-none border border-background text-background hover:bg-red-500 z-[100] w-[100px] font-spaceGrotesk text-sm"
        onClick={columnStateChange}
      >
        {allVisible ? "Show More" : "Show Less"}
      </Button>
      <div className="h-full max-md:hidden">
        <AgGridReact<LeaderBoardInterface>
          rowData={data}
          // @ts-expect-error - I don't know why this ts error is occuring
          columnDefs={colDefs}
          theme={myTheme}
          pagination={true}
        />
      </div>
      <div className="h-full md:hidden">
        <AgGridReact<LeaderBoardInterface>
          rowData={data}
          // @ts-expect-error - I don't know why this ts error is occuring
          columnDefs={colDefsMobile}
          theme={myTheme}
        />
      </div>
    </div>
  );
};

export default GridExample;
