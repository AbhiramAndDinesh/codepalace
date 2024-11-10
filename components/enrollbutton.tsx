"use client";
import { enrollCourse } from "@/actions/course";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function EnrollButton({
  props,
}: {
  props: { slug: string; user_id: string };
}) {
  const router = useRouter();
  const handleEnroll = async () => {
    try {
      await enrollCourse(props.slug, props.user_id);
      toast.success("Enrolled in the course successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to enroll in the course");
      console.log(error);
    }
  };
  return <Button onClick={handleEnroll}>Enroll</Button>;
}
