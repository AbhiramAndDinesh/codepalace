"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkUserProfile, createProfile } from "@/actions/user";

const formSchema = z.object({
  username: z.string().min(1),
  codechefusername: z.string().min(1),
  leetcodeusername: z.string().min(1),
  codeforcesusername: z.string().min(1),
});

export default function UserForm({ user_id }: { user_id: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      codechefusername: "",
      leetcodeusername: "",
      codeforcesusername: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await checkUserProfile(values);
      if (res?.error) {
        toast.error(res.error);
      } else {
        await createProfile({ user_id, ...values });
        toast.success("Profile created successfully");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
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
