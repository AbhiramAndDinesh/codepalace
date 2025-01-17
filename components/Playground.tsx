"use client";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useSession } from "next-auth/react";
import { executeRun, executeSubmit } from "@/actions/code";
import { Textarea } from "./ui/textarea";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const Playground = ({
  language,
  problem_id,
}: {
  language: string;
  problem_id: number;
}) => {
  const [code, setCode] = useState("");
  const [effectChain, setEffectChain] = useState(0);
  const [lang, setLang] = useState<
    "c" | "c++" | "python" | "java" | "javascript" | "go"
    // @ts-expect-error error will not occur
  >(language);
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");

  const { data: session } = useSession();
  const [successfullsolved, setSuccessfullsolved] = useState(false);

  useEffect(() => {
    const createStorage = () => {
      const savedCode = localStorage.getItem(`${problem_id}`);
      if (!savedCode) {
        const x: {
          java: string;
          python: string;
          c: string;
          javascript: string;
          "c++": string;
          go: string;
        } = {
          "c++": "",
          java: "",
          python: "",
          c: "",
          javascript: "",
          go: "",
        };
        localStorage.setItem(`${problem_id}`, JSON.stringify(x));
      }
    };
    const loadCode = () => {
      const stringCode = localStorage.getItem(`${problem_id}`);
      const codeObj = JSON.parse(stringCode!);
      setCode(codeObj[lang]);
    };
    createStorage();
    loadCode();
    setEffectChain(1);
  }, [problem_id, lang]);

  useEffect(() => {
    if (effectChain == 1) {
      const savedCode = localStorage.getItem(`${problem_id}`);
      const newCode = JSON.parse(savedCode!);
      newCode[lang] = code;
      localStorage.setItem(`${problem_id}`, JSON.stringify(newCode));
    }
  }, [effectChain, code, lang, problem_id]);

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
        setSuccessfullsolved(true);
      } else {
        alert(`${res?.failed.length}/${res?.total_testcases} failed`);
      }
    });
  };

  const handleRun = () => {
    console.log("Running run", { code, lang, stdin });
    executeRun({
      source_code: code,
      language: lang,
      stdin: stdin,
    }).then((res) => {
      console.log("Result: ", res);
      setStdout(res);
    });
  };

  return (
    <div className="w-full h-full">
      {/* {successfullsolved && (
        <Fireworks className="" autorun={{ speed: 7, duration: 750 }} />
      )} */}

      <ResizablePanelGroup direction="vertical">
        <ResizablePanel
          defaultSize={60}
          maxSize={90}
          className="relative border border-gray-500 rounded-lg"
        >
          <div className="min-h-10 bg-[#1c1818] border-b border-gray-500 flex justify-end pb-1 items-center">
            <Select
              onValueChange={(
                e: "c" | "c++" | "python" | "java" | "javascript" | "go",
              ) => setLang(e)}
              defaultValue={lang}
            >
              <SelectTrigger className="w-[100px] text-gray-400 border-0 shadow-none translate-y-0.5">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="bg-secondaryDark w-[100px] border-gray-500">
                <SelectItem value="javascript" className="bg-secondaryDark">
                  Javascript
                </SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="c++">C++</SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
            value={code}
            onChange={(e) => {
              if (e) {
                setCode(e);
              }
            }}
            language={lang}
          />
          <div className="flex gap-1 absolute bottom-1 right-1">
            <Button
              className="bg-gray-400 duration-0 hover:bg-secondaryDark hover:text-red-500 font-spaceGrotesk text-secondaryDark font-semibold px-2 py-1 rounded-[5px] w-[70px]"
              onClick={handleRun}
            >
              Run
            </Button>
            <Button
              className="bg-red-500 duration-0 hover:bg-secondaryDark border-red-500 hover:text-red-500 font-spaceGrotesk text-secondaryDar font-semibold rounded-[5px] px-2 py-1 w-[80px]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </ResizablePanel>
        <ResizableHandle className="min-h-[5px] bg-background" />
        <ResizablePanel
          defaultSize={40}
          className="border border-gray-500 rounded-lg"
          maxSize={40}
        >
          <Textarea
            className="focus:border-none border-none hover:cursor-default border-gray-500"
            onChange={(e) => {
              setStdin(e.target.value);
            }}
          />

          {stdout && (
            <div className="">
              <h3>Output:</h3>
              <Textarea
                disabled
                defaultValue={stdout}
                className="focus:border-none border-none hover:cursor-default border-gray-500"
              />
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Playground;
