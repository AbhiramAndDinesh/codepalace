"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import UsernameForm from "@/components/profile/username-form";
import CodechefUsernameForm from "@/components/profile/ccusername-form";
import CodeforcesUsernameForm from "@/components/profile/cfusername-form";
import LeetcodeUsernameForm from "@/components/profile/lcusername-form";
import { getLeaderboardProfile } from "@/actions/user";
import UserForm from "@/components/profile/newuserform";
export default function Page() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [user, setUser] = useState<any>(null);
  console.log("userEmail", userEmail);
  useEffect(() => {
    async function fetchProfile() {
      if (userEmail) {
        const userx = await getLeaderboardProfile(userEmail);
        setUser(userx);
      }
    }
    fetchProfile();
  }, [userEmail]);

  if (!user) {
    return (
      <div className="">
        <UserForm/>
      </div>
    );
  }
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <UsernameForm initialData={user} user_id={user?.user_id} />
      <CodechefUsernameForm initialData={user} user_id={user?.user_id} />
      <CodeforcesUsernameForm initialData={user} user_id={user?.user_id} />
      <LeetcodeUsernameForm initialData={user} user_id={user?.user_id} />
    </div>
  );
}
