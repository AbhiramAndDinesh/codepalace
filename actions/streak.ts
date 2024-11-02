import { prisma } from "@/prisma";

export const addStreak = async (user_id: string) => {
  //
  //
  const userData = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });
  const present = userData?.streak || 0;
  await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      streak: present + 1,
    },
  });
};

export const makeStreakZero = async () => {
  const yesterdayStart = new Date();
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  yesterdayStart.setHours(0, 0, 0, 0);

  const yesterdayEnd = new Date();
  yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
  yesterdayEnd.setHours(23, 59, 59, 999);
  const users = await prisma.user.findMany({});
  users.forEach(async (user) => {
    const yesterdaySubmissions = await prisma.submission.findMany({
      where: {
        user_id: user.id,
        submittedAt: {
          gte: yesterdayStart,
          lt: yesterdayEnd,
        },
      },
    });

    if (yesterdaySubmissions.length === 0) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          streak: 0,
        },
      });
    }
  });
};
