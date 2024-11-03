"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserfromEmail } from "@/actions/user";

interface UserContextType {
  email: string | null | undefined;
  id: string | null | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [id, setId] = useState("");
  useEffect(() => {
    const getUserId = async () => {
      if (email) {
        const user = await getUserfromEmail(email);
        console.log("Searching for user found this: ", user);
        setId(user!);
      }
    };
    getUserId();
  }, [email]);
  return (
    <UserContext.Provider value={{ email, id }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("Use user must be used within a theme provider");
  }

  return context;
}
