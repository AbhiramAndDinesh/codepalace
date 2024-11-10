"use server";
import { prisma } from "@/prisma";

export const getLessonBySlug = async (
  slug: string,
  module_slug: string,
  course_slug: string,
) => {
  try {
    const lesson = await prisma.lesson.findFirst({
      where: {
        slug,
        module: {
          slug: module_slug,
          course: {
            slug: course_slug,
          },
        },
      },
      include: {
        video: true,
        document: true,
        problem: true,
      },
    });
    return lesson;
  } catch (error) {
    console.log("Error in actions/lesson.ts > getLessonBySlug: ", error);
  }
};
