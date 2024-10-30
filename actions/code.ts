"use server";

import { prisma } from "@/prisma";
import axios from "axios";

interface SubmitSchema {
  source_code: string;
  language_id: string;
  user_id: string;
  problem_id: number;
}

export const executeSubmit = async ({
  source_code,
  language_id,
  user_id,
  problem_id,
}: SubmitSchema) => {
  // Get Testcases of the question
  const testcases = await prisma.testcase.findMany({
    where: {
      problem_id,
    },
  });

  // Add source_code and language to each testcases
  const data = testcases.map((testcase) => ({
    ...testcase,
    source_code,
    language_id,
  }));
  const optionsPost = {
    method: "POST",
    url: "http://43.204.98.127:2358/submissions/batch",
    params: {
      base64_encoded: "false",
      wait: "true",
      fields: "*",
    },
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    // Run testcases in the judge0
    const response = await axios.request(optionsPost);
    const tokens_list: string[] = response.data.map(
      (obj: { token: string }) => obj.token,
    );

    // Get tokens from the response
    const tokens = tokens_list.join(",");

    // Get the result of the testcases
    const getResponse = await axios.request({
      method: "GET",
      url: "http://43.204.98.127:2358/submissions/batch",
      params: {
        tokens,
        base64_encoded: "false",
        fields: "expected_output,stdout,time,exit_code",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result_data = getResponse.data.submissions;
    const total_testcases = result_data.length;
    const failed = [];

    for (let i = 0; i < result_data.length; i++) {
      if (!(result_data[i].expected_output === result_data[i].stdout)) {
        failed.push(result_data[i]);
      }
    }

    if (failed.length === 0) {
      await prisma.jSolvedUsers.create({ data: { user_id, problem_id } });
    }

    // Return total number of testcases and the list of testcases which failed
    return { total_testcases, failed };
  } catch (error) {
    console.log(error);
  }
};
