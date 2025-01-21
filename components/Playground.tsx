"use client";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { ChevronUp, Play, Upload } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { executeRun, executeSubmit } from "@/actions/code";

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
  const [stdout, setStdout] = useState(
    "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  );
  const [sheet, setSheet] = useState<boolean>(false);

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
    <div className="h-full border border-gray-500 rounded-lg overflow-clip relative transition-all">
      {successfullsolved && (
        <Fireworks className="" autorun={{ speed: 7, duration: 750 }} />
      )}
      <div className="min-h-10 border-b border-gray-500 flex justify-end pb-1 items-center ">
        <Select
          onValueChange={(
            e: "c" | "c++" | "python" | "java" | "javascript" | "go",
          ) => setLang(e)}
          defaultValue={lang}
        >
          <SelectTrigger className="w-[100px] text-gray-400 font-spaceGrotesk border-0 shadow-none translate-y-0.5">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-secondaryDark font-spaceGrotesk w-[100px] border-gray-500">
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
        height="90%"
        defaultLanguage={lang}
        defaultValue={code}
        theme="vs-dark"
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
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
      <div className="w-full bottom-0 bg-background absolute min-h-10 pl-3 pr-4 border-t border-gray-500 flex items-center justify-between z-20">
        <button
          className="font-spaceGrotesk text-gray-400 hover:text-white text-sm  flex gap-1 items-center"
          onClick={() => setSheet(!sheet)}
        >
          <ChevronUp className={`h-4 w-4 ${sheet && "rotate-180"}`} />
          Console
        </button>
        <div className="flex gap-5">
          <button
            className="font-spaceGrotesk text-gray-400 hover:text-white text-sm flex gap-1 items-center"
            onClick={handleRun}
          >
            <Play className="w-4 h-4" />
            Run
          </button>
          <button
            className="font-spaceGrotesk text-red-500 hover:text-red-300 text-sm flex gap-1 items-center"
            onClick={handleSubmit}
          >
            <Upload className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
      <div
        className={`absolute w-full h-full bg-background border-gray-500 p-3 ${sheet ? "translate-y-[-30%] border-t opacity-100" : "opacity-0"} transition-all z-10`}
      >
        <div className="flex gap-2 h-[25%]">
          <div className="w-1/2 h-full">
            <div className="text-gray-400 font-spaceGrotesk mb-1 text-sm">
              Input
            </div>
            <textarea
              className="w-full h-full bg-background text-gray-400 text-sm p-2 rounded-lg border border-gray-500 focus:outline-none resize-none font-gabarito"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
            ></textarea>
          </div>
          <div className="w-1/2">
            <div className="text-gray-400 font-spaceGrotesk mb-1 text-sm">
              Output
            </div>
            <textarea
              className="w-full h-full bg-background text-gray-400 text-sm p-2 rounded-lg border border-gray-500 focus:outline-none resize-none font-gabarito"
              value={stdout}
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
