"use server";

import { prisma } from "@/prisma";

interface ProblemSchema {
  title: string;
  statement: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const createQuestion = async ({
  title,
  statement,
  difficulty,
}: ProblemSchema) => {
  try {
    const res = await prisma.problem.create({
      data: {
        title,
        statement,
        difficulty,
      },
    });
    return res.problem_id;
  } catch (error) {
    console.log("Error in /actions/admin/question > createQuestion", error);
  }
};
