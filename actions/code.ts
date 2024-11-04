"use server";

import { prisma } from "@/prisma";
import axios from "axios";
import { addStreak } from "./streak";

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
  const user = await prisma.user.findMany({
    where: {
      email,
    },
  });
  const user_id = user[0]?.id;
  addStreak(user_id);
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
  let max_time = 0;
  let max_memory = 0;
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
          fields: "status,time,token,language,memory",
        },
        headers: {
          "Content-Type": "application/json",
        },
        data: submissions[i],
      });
      if (response.data.memory > max_memory) max_memory = response.data.memory;
      const time = parseFloat(response.data.time);
      if (time > max_time) max_time = time;
      if (response.data.status.description !== "Accepted") {
        failed.push(response.data);
      }
    }

    const total_testcases = submissions.length;

    if (failed.length === 0) {
      console.log(user, user_id);
      if (user_id) {
        const alreadySolved = await prisma.jSolvedUsers.findMany({
          where: { user_id, problem_id },
        });
        if (alreadySolved.length == 0) {
          await prisma.jSolvedUsers.create({ data: { user_id, problem_id } });
        }
        console.log("Done");
      }
    }

    // Return total number of testcases and the list of testcases which failed
    await prisma.submission.create({
      data: {
        problem_id,
        user_id,
        code: source_code,
        accepted: failed.length === 0,
        failed_cases: failed.length,
        time: max_time.toString(),
        memory: max_memory.toString(),
      },
    });
    return { total_testcases, failed };
  } catch (error) {
    console.log(error);
  }
};



export const getSubmissions = async(problem_id:number,user_id:string)=>{
  try{
      const submissions = await prisma.submission.findMany({
          where:{
              problem_id:problem_id,
              user_id:user_id
          },
          select:{
              submission_id:true,
              code:true,
              accepted:true,
              failed_cases:true,
              time:true,
              memory:true
          },
          orderBy:{
              submittedAt:"desc"
          }
      })
      // console.log(submissions);
      return submissions;
  }
  catch(error){
      console.log("error in /actions/submissions.ts > getSubmission",error);
  }
}