"use server";

import { prisma } from "@/prisma";
interface Answer {
  problemid: number;
  answer: string;
}

export const existingAnswer = async (problemid: number) => {
  try {
    const res = await prisma.answers.findUnique({
      where: {
        problemid,
      },
    });
    if (res) {
      return { status: 500 };
    } else {
      return { status: 200 };
    }
  } catch (error) {
    console.log("error in /actions/admin/answer.ts > existingAnswer", error);
  }
};

export const createAnswer = async ({ problemid, answer }: Answer) => {
  try {
    await prisma.answers.upsert({
      create: {
        problemid,
        answer,
      },
      update: {
        answer,
      },
      where: {
        problemid,
      },
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("error in /actions/admin/answer.ts > createAnswer", error);
  }
};
