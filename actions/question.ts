"use server";
import { prisma } from "@/prisma";

export const getQuestions = async () => {
  try {
    const questions = await prisma.problem.findMany({});
    return questions;
  } catch (error) {
    console.log("Error in actions/question.ts > getQuestion", error);
  }
};
