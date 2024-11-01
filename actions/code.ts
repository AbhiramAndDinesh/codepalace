"use server";

import { prisma } from "@/prisma";
import axios from "axios";

interface SubmitSchema {
  source_code: string;
  language: "c" | "c++" | "python" | "java" | "javascript" | "go";
  email: string;
  problem_id: number;
}

export const executeSubmit = async ({
  source_code,
  language,
  email,
  problem_id,
}: SubmitSchema) => {
  const languageId = {
    "c++": 54,
    c: 50,
    go: 22,
    python: 71,
    java: 62,
    javascript: 63,
  };
  const language_id = languageId[language];
  // Get Testcases of the question
  const testcases = await prisma.testcase.findMany({
    where: {
      problem_id,
    },
  });

  // Add source_code and language to each testcases
  const submissions = testcases.map((testcase) => ({
    stdin: testcase.stdin,
    expected_output: testcase.expected_output,
    source_code,
    language_id,
  }));
  const optionsPost = {
    method: "POST",
    url: "http://43.204.98.127:2358/submissions",
    params: {
      base64_encoded: "false",
      wait: "true",
      fields: "status,time,token,language",
    },
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      language_id: 71,
      source_code: 'print("Hello")\nprint("Hello")',
      stdin: "",
      expected_output: "Hello\nHell",
    },
  };
  console.log("Check post 1: reached", source_code, submissions);
  try {
    // Run testcases in the judge0
    const failed = [];
    for (let i = 0; i < submissions.length; i++) {
      const response = await axios.request({
        method: "POST",
        url: "http://43.204.98.127:2358/submissions",
        params: {
          base64_encoded: "false",
          wait: "true",
          fields: "status,time,token,language",
        },
        headers: {
          "Content-Type": "application/json",
        },
        data: submissions[i],
      });
      console.log(response.data);
      if (response.data.status.description !== "Accepted") {
        failed.push(response.data);
      }
    }

    // console.log("Check post 2: reached");
    // const tokens_list: string[] = response.data.map(
    //   (obj: { token: string }) => obj.token,
    // );

    // Get tokens from the response
    // const tokens = tokens_list.join(",");
    // console.log(tokens);
    // Get the result of the testcases
    // const getResponse = await axios.request({
    //   method: "GET",
    //   url: "http://43.204.98.127:2358/submissions/batch",
    //   params: {
    //     tokens,
    //     base64_encoded: "false",
    //     fields: "expected_output,stdout,time,exit_code",
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const result_data = getResponse.data.submissions;
    // console.log("Checkpost 3: reached", result_data);
    const total_testcases = submissions.length;

    // for (let i = 0; i < result_data.length; i++) {
    //   if (!(result_data[i].expected_output === result_data[i].stdout)) {
    //     failed.push(result_data[i]);
    //   }
    // }

    if (failed.length === 0) {
      console.log("Reached here: Checkpost 3", email);
      const user = await prisma.user.findMany({
        where: {
          email,
        },
      });
      const user_id = user[0]?.id;
      console.log(user, user_id);
      if (user_id) {
        const alreadySolved = await prisma.jSolvedUsers.findMany({
          where: { user_id, problem_id },
        });
        if (!alreadySolved) {
          await prisma.jSolvedUsers.create({ data: { user_id, problem_id } });
        }
        console.log("Done");
      }
    }

    // Return total number of testcases and the list of testcases which failed
    return { total_testcases, failed };
  } catch (error) {
    console.log(error);
  }
};
