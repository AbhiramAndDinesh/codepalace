"use server";

import { prisma } from "@/prisma";

export const isEnrolled = async (slug: string, user_id: string) => {
  try {
    const res = await prisma.enrolled.findFirst({
      where: {
        user_id,
        course: {
          slug,
        },
      },
    });

    if (res) return true;
    return false;
  } catch (error) {
    console.log("Error in finding the user is enrolled in the course or not");
    console.log("Error in actions/module.ts >isEnrolled", error);
  }
};

export const getModuleBySlug = async (slug: string, course_slug: string) => {
  try {
    const mod = await prisma.module.findFirst({
      where: {
        slug,
        course: {
          slug: course_slug,
        },
      },
      include: {
        lessons: true,
      },
    });
    return mod;
  } catch (error) {
    console.log(
      "Error in getting courseMoudle actions>module.ts>getModules",
      error,
    );
  }
};
//module completion
