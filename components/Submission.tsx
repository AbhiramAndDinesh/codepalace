"use client";
import { format } from "date-fns";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from "react";
interface Submissionstype {
  submission_id: string;
  code: string;
  accepted: boolean;
  failed_cases: number;
  time: string;
  memory: string;
  language?: string;
  submittedAt: Date;
}

const Submission = ({ item }: { item: Submissionstype }) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  return (
    <div className="w-full transition-all">
      <button
        onClick={() => setOpened(!opened)}
        // ${item.accepted ? "border-green-500" : "border-red-500"}
        className={`flex w-full p-2 justify-between items-center border-[1px] border-gray-500/30 rounded-md`}
      >
        {item.accepted ? (
          <p className="text-green-500 py-1 px-2 rounded text-sm font-spaceGrotesk font-semibold">
            Accepted
          </p>
        ) : (
          <p className="text-red-500 py-1 px-2 text-sm font-spaceGrotesk font-semibold rounded">
            {item.failed_cases} testcases failed
          </p>
        )}
        <div className="flex gap-4 text-gray-400 text-xs">
          <p>{Number(item.time) * 1000}</p>
          <p>{format(item.submittedAt, "dd MMM yyyy '-' hh:mm a")}</p>
        </div>
      </button>

      {opened && (
        <div className="mt-2 rounded-md overflow-clip animate-in">
          <SyntaxHighlighter language="c++" style={vs2015}>
            {item.code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default Submission;
