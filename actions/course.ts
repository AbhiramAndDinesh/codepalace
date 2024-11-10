"use server";
import { prisma } from "@/prisma";

export const getCourses = async () => {
  try {
    const courses = await prisma.course.findMany({});
    return courses;
  } catch (error) {
    console.log("Error in actions/admin/courses.ts > getCourses", error);
    return [];
  }
};

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

export const getCourseModules = async (course_slug: string) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        slug: course_slug,
      },
      include: {
        modules: true,
      },
    });
    if (!course) return [];
    return course.modules;
  } catch (error) {
    console.log("Error in actions/admin/course.ts > getCourseModules", error);
    return [];
  }
};

export const enrollCourse = async (slug: string, user_id: string) => {
  try {
    const res = await prisma.course.findUnique({
      where: {
        slug,
      },
      select: {
        course_id: true,
      },
    });
    if (res) {
      await prisma.enrolled.create({
        data: {
          course_id: res.course_id,
          user_id,
        },
      });
    }
  } catch (error) {
    console.log("error in actions/course.ts getCourseBySlug", error);
  }
};

export const getUserCourses = async (user_id: string) => {
  try {
    const courses = await prisma.enrolled.findMany({
      where: {
        user_id,
      },
      include: {
        course: {
          select: {
            name: true,
            course_id: true,
            slug: true,
            image: true,
          },
        },
      },
    });
    return courses;
  } catch (error) {
    console.log("Error in getting users courses");
    console.log("error in actions/admin/course.ts >getUsercourses", error);
  }
};
