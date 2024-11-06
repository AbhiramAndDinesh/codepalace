"use server";
import { prisma } from "@/prisma";

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
      error,
    );
    return false;
  }
};

export const saveCollection = async (
  user_id: string,
  collection_id: string,
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
  } catch (error) {
    console.log("Error in savecollectio actions>collection.ts", error);
  }
};

export const unsaveCollection = async (
  user_id: string,
  collection_id: string,
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
      error,
    );
  }
};

export const createCollection = async ({
  user_id,
  name,
}: {
  user_id: string;
  name: string;
}) => {
  try {
    await prisma.collection.create({
      data: {
        owner_id: user_id,
        name,
      },
    });
  } catch (error) {
    console.log("Error in actions/collection.ts > createCollection", error);
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
      return;
    }
    await prisma.collection.update({
      where: {
        collection_id,
      },
      data: {
        isPublic: true,
      },
    });
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
      error,
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
      error,
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
      error,
    );
  }
};

export const isSavedCollection = async (
  user_id: string,
  collection_id: string,
) => {
  try {
    const res = await prisma.jUserCollection.findMany({
      where: {
        user_id: user_id,
        collection_id: collection_id,
      },
    });
    if (!res) {
      return false;
    } else return true;
  } catch (error) {
    console.log(
      "Error in finding issavedCollection actions>collection>isSavedCollection",
      error,
    );
  }
};
