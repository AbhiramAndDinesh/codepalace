import { useSession } from "next-auth/react";

import { prisma } from "@/prisma";
import UsernameForm from "@/components/profile/username-form";
import CodechefUsernameForm from "@/components/profile/ccusername-form";
import CodeforcesUsernameForm from "@/components/profile/cfusername-form";
import LeetcodeUsernameForm from "@/components/profile/lcusername-form";
export default async function page() {
  const profile = await prisma.leaderboard.findUnique({
    where: {
      user_id: "cm2yqqbd5000010h3r0aqodh9",
    },
  });
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <UsernameForm initialData={profile} user_id={profile?.user_id} />
      <CodechefUsernameForm initialData={profile} user_id={profile?.user_id} />
      <CodeforcesUsernameForm initialData={profile} user_id={profile?.user_id} />
      <LeetcodeUsernameForm initialData={profile} user_id={profile?.user_id} />
    </div>
  );
}
