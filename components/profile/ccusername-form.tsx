/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { toast } from "sonner";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Leaderboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "../ui/form";

interface CodechefUsernameFormProps {
  initialData: {
    codechefusername: Leaderboard["codechefusername"];
  };
  user_id: string;
}
const formSchema = z.object({
  codechefusername: z.string().min(1, {
    message: "codechefusername is required",
  }),
});

const CodechefUsernameForm = ({ initialData, user_id }: CodechefUsernameFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codechefusername: initialData?.codechefusername || "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile/${user_id}`, values);
      setIsEditing(!isEditing);
      toast.success("Profile updated successfully", { position: "top-right" });
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("codechefUsername already taken", {
        position: "top-right",
      });
      console.log("error occured during updating profile");
    }
    // console.log(values.codechefusername);
  };

  return (
    <div className="flex flex-col items-center">
      <div className=" p-4">
        <div className="font-medium flex items-center justify-between w-[300px]">
          Codechef Username
          <Button
            variant={"ghost"}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil size={16} />
                Edit
              </>
            )}
          </Button>
        </div>
        {!isEditing ? (
          <p
            className={cn(
              "text-sm mt-2 ",
              !initialData.codechefusername && "text-slate-500 italic"
            )}
          >
            {initialData.codechefusername || "no codechefusername"}
          </p>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-2 w-[300px] bg-white"
            >
              <FormField
                control={form.control}
                name="codechefusername"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Type your codechefusername"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CodechefUsernameForm;
