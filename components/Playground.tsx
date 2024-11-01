"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { executeSubmit } from "@/actions/code";

const Playground = ({
  language,
  problem_id,
}: {
  language: string;
  problem_id: number;
}) => {
  const [code, setCode] = useState("");

  const [lang, setLang] = useState<
    "c" | "c++" | "python" | "java" | "javascript" | "go"
    // @ts-expect-error error will not occur
  >(language);
  const { data: session } = useSession();

  const handleSubmit = () => {
    // console.log(code, problem_id, session?.user?.email, lang);
    executeSubmit({
      source_code: code,
      problem_id,
      email: session?.user?.email || "a",
      language: lang,
    }).then((res) => {
      if (res?.failed.length === 0) {
        alert("All good");
      } else {
        alert(`${res?.failed.length}/${res?.total_testcases} failed`);
      }
    });
  };

  return (
    <div className="w-full h-full">
      <Select onValueChange={(e) => setLang(e)} defaultValue={lang}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="javascript">Javascript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
        </SelectContent>
      </Select>

      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60} className="relative">
          <Editor
            height="100%"
            defaultLanguage={lang}
            defaultValue={code}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: {
                enabled: false,
              },
            }}
            onChange={(e) => {
              if (e) {
                setCode(e);
              } else {
                setCode("");
              }
            }}
            language={lang}
          />
          <Button
            className="bg-green-600 hover:bg-green-200 hover:text-green-600 font-[500] text-white px-2 py-1 rounded-sm absolute bottom-1 right-1"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="min-h-[5px] hover:bg-blue-500 bg-dark-layer-2"
        />
        <ResizablePanel
          defaultSize={40}
          className="bg-red-500"
          minSize={20}
          maxSize={80}
        >
          {session?.user?.email}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Playground;
