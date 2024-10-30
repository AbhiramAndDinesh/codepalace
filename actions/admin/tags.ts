"use server";

import { prisma } from "@/prisma";

export const createTag = async ({ name }: { name: string }) => {
  try {
    await prisma.tag.create({
      data: {
        name,
      },
    });
  } catch (error) {
    console.log("Error in /actions/admin/tags.ts > createTag", error);
  }
};

export const addTagToQuestion = async ({
  problem_id,
  tag_id,
}: {
  problem_id: number;
  tag_id: number;
}) => {
  try {
    await prisma.junctionTags.create({
      data: {
        problem_id,
        tag_id,
      },
    });
  } catch (error) {
    console.log("Error in /actions/admin/tags.ts > addTagToQuestion", error);
  }
};
