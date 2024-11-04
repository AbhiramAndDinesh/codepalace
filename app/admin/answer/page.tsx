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
import { createAnswer, existingAnswer } from "@/actions/admin/answer";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  problemid: z.number().min(1).max(10000000),
  answer: z.string(),
});

export default function AnswerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemid: 0,
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const problem_id = await existingAnswer(values.problemid);
      if (problem_id.status===500) {
        toast.error("Problem ID does not exist");
        return;
      }
      await createAnswer({
        problemid: Number(values.problemid),
        answer: values.answer,
      });
      console.log(values);
      toast.success("Answer submitted successfully");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the Answer. Please try again.");
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
              name="problemid"
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
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the code here" {...field} />
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
