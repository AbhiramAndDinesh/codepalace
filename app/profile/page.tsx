"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";

import UsernameForm from "@/components/profile/username-form";
import CodechefUsernameForm from "@/components/profile/ccusername-form";
import CodeforcesUsernameForm from "@/components/profile/cfusername-form";
import LeetcodeUsernameForm from "@/components/profile/lcusername-form";
import { getLeaderboardProfile, getUserfromEmail } from "@/actions/user";
import UserForm from "@/components/profile/newuserform";

export default function Page() {
  const { data: session } = useSession();
  const { email, id } = useUser();

  const userEmail = session?.user?.email;
  const [userid,setUserid] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    console.log("This came from the useUser: ", id, email);
    async function fetchProfile() {
      if (userEmail) {
        const userx = await getLeaderboardProfile(userEmail);
        const useridx = await getUserfromEmail(userEmail);
        setUser(userx);
        setUserid(useridx);
      }
    }
    fetchProfile();
  }, [userEmail, id, email]);

  if (!user) {
    console.log(userid)
    return (
      <div className="">
        <UserForm user_id=""/>
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
