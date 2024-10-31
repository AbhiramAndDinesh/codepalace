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
import { createTestcase } from "@/actions/admin/testcase";

const formSchema = z.object({
  problem_id: z.number().min(1).max(10000000),
  stdin: z.string(),
  expected_output: z.string(),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem_id: 0,
      stdin: "",
      expected_output: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createTestcase({
        problem_id: values.problem_id,
        stdin: values.stdin,
        expected_output: values.expected_output,
      });
      console.log(values);
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
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="problem_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: 1"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        if (e.target) {
                          field.onChange(e.target.valueAsNumber);
                        }
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stdin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expected_output"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Output</FormLabel>
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
