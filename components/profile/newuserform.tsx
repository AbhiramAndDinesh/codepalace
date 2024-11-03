"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(1),
  codechefusername: z.string().min(1),
  leetcodeusername: z.string().min(1),
  codeforcesusername: z.string().min(1),
});

export default function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className=" max-w-3xl flex flex-col gap-2 ">
    //     <FormField
    //       control={form.control}
    //       name="username"
    //       render={({ field }) => (
    //         <FormItem className="">
    //           <FormLabel>Username</FormLabel>
    //           <FormControl>
    //             <Input placeholder="johndoe" type="text" {...field} />
    //           </FormControl>
    //           <FormDescription>
    //             This is your unique public display name.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     <FormField
    //       control={form.control}
    //       name="codechefusername"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Codechef Username</FormLabel>
    //           <FormControl>
    //             <Input placeholder="codechef_username" type="text" {...field} />
    //           </FormControl>

    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="leetcodeusername"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Leetcode Username</FormLabel>
    //           <FormControl>
    //             <Input placeholder="leetcode_username" type="text" {...field} />
    //           </FormControl>

    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     <FormField
    //       control={form.control}
    //       name="codeforcesusername"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Codeforces Username</FormLabel>
    //           <FormControl>
    //             <Input
    //               placeholder="codeforces_username"
    //               type="text"
    //               {...field}
    //             />
    //           </FormControl>

    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg border-4 bg-gray-100 shadow-lg w-[400px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto "
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 1" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codechefusername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codechef Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leetcodeusername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leetcod Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codeforcesusername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codeforces Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
