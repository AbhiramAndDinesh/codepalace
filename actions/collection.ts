"use server";
import { prisma } from "@/prisma";
import { getQuestions, userSolvedIds } from "./question";

export const isOwner = async (user_id: string, collection_id: string) => {
  try {
    const res = await prisma.collection.findUnique({
      where: {
        collection_id: collection_id,
      },
    });
    if (res?.owner_id === user_id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      "Error in finding the owner of collection actions>collection.ts",
      error
    );
    return false;
  }
};

export const isCollectionPublic = async (
  user_id: string,
  collection_id: string
) => {
  try {
    const res = await prisma.collection.findUnique({
      where: { collection_id: collection_id, owner_id: user_id },
      select: {
        isPublic: true,
      },
    });
    if (res?.isPublic === true) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(
      "error in finding the collection is public or not actions>collection.ts>isCollectionPublic",
      error
    );
    return false;
  }
};

export const saveCollection = async (
  user_id: string,
  collection_id: string
) => {
  try {
    const owner = await isOwner(user_id, collection_id);
    if (owner) {
      return;
    }
    await prisma.jUserCollection.create({
      data: {
        user_id: user_id,
        collection_id: collection_id,
      },
    });
    await prisma.collection.update({
      where: {
        collection_id,
      },
      data: {
        saved: {
          increment: 1,
        },
      },
    });
    return { success: true, status: 200 };
  } catch (error) {
    console.log("Error in savecollection actions>collection.ts", error);
  }
};

export const unsaveCollection = async (
  user_id: string,
  collection_id: string
) => {
  try {
    const owner = await isOwner(user_id, collection_id);
    if (owner) {
      return;
    }
    await prisma.jUserCollection.deleteMany({
      where: {
        user_id: user_id,
        collection_id: collection_id,
      },
    });
    await prisma.collection.update({
      where: {
        collection_id: collection_id,
      },
      data: {
        saved: {
          decrement: 1,
        },
      },
    });
    return { success: true, status: 200 };
  } catch (error) {
    console.log(
      "Error in unsaving the collection actions>collection.ts>unsaveCollection",
      error
    );
  }
};

export const createCollection = async ({
  user_id,
  name,
  slug,
}: {
  user_id: string;
  name: string;
  slug: string;
}) => {
  try {
    await prisma.collection.create({
      data: {
        owner_id: user_id,
        name,
        slug,
      },
    });
    return { status: 200, sucess: true };
  } catch (error) {
    console.log("Error in actions/collection.ts > createCollection", error);
    return { status: 400, success: false };
  }
};

export const makePublic = async ({
  user_id,
  collection_id,
}: {
  user_id: string;
  collection_id: string;
}) => {
  try {
    const check = await isOwner(user_id, collection_id);
    if (!check) {
      return { status: 401, success: false };
    }
    await prisma.collection.update({
      where: {
        collection_id,
      },
      data: {
        isPublic: true,
      },
    });
    return { status: 200, sucess: true };
  } catch (error) {
    console.log("Error in actions/collection.ts > makePublic", error);
  }
};

export const makePrivate = async ({
  user_id,
  collection_id,
}: {
  user_id: string;
  collection_id: string;
}) => {
  try {
    const check = await isOwner(user_id, collection_id);
    if (!check) {
      return;
    }
    await prisma.jUserCollection.deleteMany({
      where: {
        collection_id,
      },
    });
    await prisma.collection.update({
      where: {
        collection_id,
      },
      data: {
        isPublic: false,
      },
    });
    return { status: 200, sucess: true };
  } catch (error) {
    console.log("Error in actions/collection.ts > makePrivate", error);
  }
};

export const getUserPrivateCollections = async ({
  user_id,
}: {
  user_id: string;
}) => {
  try {
    const userCollections = await prisma.collection.findMany({
      where: {
        owner_id: user_id,
      },
    });
    return userCollections;
  } catch (error) {
    console.log(
      "Error in actions/collection.ts > getUserSavedCollections",
      error
    );
  }
};

export const getUserPrivateCollections2 = async ({
  user_id,
}: {
  user_id: string;
}) => {
  try {
    const userCollections = await prisma.collection.findMany({
      where: {
        owner_id: user_id,
      },
      select: {
        collection_id: true,
        name: true,
      },
    });
    return userCollections;
  } catch (error) {
    console.log(
      "Error in actions/collection.ts > getUserSavedCollections",
      error
    );
  }
};

export const getUserSavedCollections = async ({
  user_id,
}: {
  user_id: string;
}) => {
  try {
    const userCollections = await prisma.jUserCollection.findMany({
      where: {
        user_id,
      },
      include: {
        collections: true,
      },
    });
    const collections = [];
    for (let i = 0; i < userCollections.length; i++) {
      collections.push(userCollections[i].collections);
    }
    return collections;
  } catch (error) {
    console.log(
      "Error in actions/collection.ts > getUserPrivateCollections",
      error
    );
  }
};

export const deleteCollection = async ({
  user_id,
  collection_id,
}: {
  user_id: string;
  collection_id: string;
}) => {
  try {
    const owner = await isOwner(user_id, collection_id);
    if (!owner) {
      return;
    }
    await prisma.collection.delete({
      where: {
        collection_id,
      },
    });
    return { status: 200, success: true };
  } catch (error) {
    console.log("Error in actions/collection.ts > deleteCollection", error);
  }
};

export const getTopCollections = async ({}) => {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: {
        saved: "desc",
      },
      take: 6,
    });
    return collections;
  } catch (error) {
    console.log("Error in actions/collection.ts >getTopCollections", error);
  }
};

export const getCollectionbySlug = async (slug: string) => {
  try {
    const res = await prisma.collection.findUnique({
      where: {
        slug: slug,
      },
    });
    return res;
  } catch (error) {
    console.log(
      "Error in finding collectiond actions>collection>getCollectionbySlug",
      error
    );
  }
};

export const isSavedCollection = async (
  user_id: string,
  collection_id: string
) => {
  try {
    const res = await prisma.jUserCollection.findMany({
      where: {
        user_id: user_id,
        collection_id: collection_id,
      },
    });
    if (res.length > 0) {
      return true;
    } else return false;
  } catch (error) {
    console.log(
      "Error in finding issavedCollection actions>collection>isSavedCollection",
      error
    );
  }
};

export const addProblemToCollection = async (
  values: string[],
  problem_id: number
) => {
  if (values.length > 0) {
    values.map(async (value) => {
      try {
        await prisma.jCollectionProblem.create({
          data: {
            collection_id: value,
            problem_id,
          },
        });
      } catch (error) {
        console.log(
          "Error in created jcollectionsproblem actions>collection>jcollectionproblem",
          error
        );
      }
    });
  }
};

export const deleteProblemFromCollection = async (
  collection_id: string,
  problem_id: number
) => {
  try {
    await prisma.jCollectionProblem.deleteMany({
      where: {
        collection_id,
        problem_id,
      },
    });
    return { status: 200, success: true };
  } catch (error) {
    console.log(
      "Error in actions/collection.ts > deleteProblemFromCollection",
      error
    );
  }
};

export const getCollectionQuestions = async (
  collection_id: string,
  user_id: string
) => {
  try {
    const question_ids = await prisma.jCollectionProblem.findMany({
      where: {
        collection_id,
      },
      include: {
        problem: true,
      },
    });

    const solved_ = await userSolvedIds(user_id);
    const solved_ids = new Set<number>();
    solved_?.map((x) => {
      solved_ids.add(x.problem_id);
    });
    const questions = [];
    for (let i = 0; i < question_ids.length; i++) {
      questions.push({
        ...question_ids[i].problem,
        collection_id,
        solved: solved_ids.has(question_ids[i].problem.problem_id),
      });
    }
    return questions;
  } catch (error) {
    console.log(
      "Error in actions/collection.ts > getCollectionQuetions",
      error
    );
  }
};

export const getAddtoCollectionQuestions = async (
  collection_id: string,
  user_id: string
) => {
  try {
    const existingQuestions = await getCollectionQuestions(
      collection_id,
      user_id
    );
    const existingQues = new Set();
    if (existingQuestions) {
      for (let i = 0; i < existingQuestions.length; i++) {
        existingQues.add(existingQuestions[i].problem_id);
      }
    }
    const questions = await getQuestions();
    const questionsTobeAdded = [];
    if (questions) {
      for (let i = 0; i < questions.length; i++) {
        // console.log(existingQues.has(questions[i].problem_id));
        if (!existingQues.has(questions[i].problem_id)) {
          questionsTobeAdded.push(questions[i]);
        }
      }
    }
    // console.log(questionsTobeAdded)
    return questionsTobeAdded;
  } catch (error) {
    console.log(
      "Error in actions/collection.ts >getAddtoCollectionsQuestions",
      error
    );
    return { status: 500, success: false };
  }
};

export const addQuestionstoCollection = async (
  collection_id: string,
  problem_ids: Array<number>
) => {
  try {
    const problems = [];
    for (let i = 0; i < problem_ids.length; i++) {
      problems.push({
        collection_id: collection_id,
        problem_id: problem_ids[i],
      });
    }
    await prisma.jCollectionProblem.createMany({
      data: [...problems],
    });
    return { status: 200, success: true };
  } catch (error) {
    console.log(
      "Error in actions/collections.ts >addQuestionstoCOllection",
      error
    );
    return { status: 500, success: false };
  }
};
