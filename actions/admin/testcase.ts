"use server";

import { prisma } from "@/prisma";

interface TestCase {
  problem_id: number;
  stdin: string;
  expected_output: string;
}

export const createTestcase = async ({
  problem_id,
  stdin,
  expected_output,
}: TestCase) => {
  try {
    await prisma.testcase.create({
      data: {
        problem_id,
        stdin,
        expected_output,
      },
    });
  } catch (error) {
    console.log("Error in /actions/admin/testcase.ts > createTestcase", error);
  }
};

export const deleteTestcase = async ({
  problem_id,
  stdin,
}: {
  problem_id: number;
  stdin: string;
}) => {
  try {
    await prisma.testcase.deleteMany({
      where: {
        problem_id,
        stdin,
      },
    });
  } catch (error) {
    console.log("Error in /actions/admin/testcase.ts > deleteTestcase", error);
  }
};
