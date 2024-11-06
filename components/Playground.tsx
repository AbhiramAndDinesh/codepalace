"use client";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
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
  const toggle = () => {
    setSuccessfullsolved(!successfullsolved);
  };
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
      {successfullsolved && (
        <Fireworks className="" autorun={{ speed: 7, duration: 750 }} />
      )}
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
            theme="light"
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
          <div className="flex gap-2 absolute bottom-1 right-1">
            <Button
              className="bg-blue-600 hover:bg-blue-200 hover:text-blue-600 font-[500] text-white px-2 py-1 rounded-sm"
              onClick={handleRun}
            >
              Run
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-200 hover:text-green-600 font-[500] text-white px-2 py-1 rounded-sm"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="min-h-[5px] hover:bg-blue-500 bg-dark-layer-2"
        />
        <ResizablePanel
          defaultSize={40}
          className="bg-white"
          minSize={20}
          maxSize={80}
        >
          <Textarea
            className="bg-gray-200"
            onChange={(e) => {
              setStdin(e.target.value);
            }}
          />

          {stdout && (
            <div className="bg-gray-500">
              <h3>Output:</h3>
              <Textarea
                disabled
                defaultValue={stdout}
                className="focus:border-none border-none hover:cursor-default"
              />
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Playground;
