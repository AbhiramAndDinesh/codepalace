"use server";

import { prisma } from "@/prisma";

interface ProblemSchema {
  title: string;
  statement: string;
  difficulty: "Easy" | "Medium" | "Hard";
  slug: string;
  points: number;
}

export const createQuestion = async ({
  title,
  statement,
  difficulty,
  slug,
  points,
}: ProblemSchema) => {
  try {
    const res = await prisma.problem.create({
      data: {
        title,
        statement,
        slug,
        difficulty,
        points,
      },
    });
    return res.problem_id;
  } catch (error) {
    console.log("Error in /actions/admin/question > createQuestion", error);
  }
};

export const getQuestionBySlug = async (slug: string) => {
  try {
    const question = await prisma.problem.findUnique({
      where: {
        slug,
      },
      include: {
        Answers: {
          select: {
            answer: true,
          },
        },
      },
    });
    console.log(question);
    return question;
  } catch (error) {
    console.log("Error action/admin/question.ts > getQuestionBySlug", error);
  }
};

export const userSolved = async ({
  user_id,
  problem_id,
}: {
  user_id: string;
  problem_id: number;
}) => {
  try {
    const res = await prisma.jSolvedUsers.findMany({
      where: {
        user_id,
        problem_id,
      },
    });
    if (res.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};
