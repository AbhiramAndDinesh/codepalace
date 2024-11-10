"use server";
import { prisma } from "@/prisma";

export const getQuestions = async () => {
  try {
    const questions = await prisma.problem.findMany({
      where: {
        inCourse: false,
      },
      orderBy: {
        problem_id: "asc",
      },
    });
    return questions;
  } catch (error) {
    console.log("Error in actions/question.ts > getQuestion", error);
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
