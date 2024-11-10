import { getCourseModules } from "@/actions/course";
import Link from "next/link";
import { auth } from "@/auth";
import { isEnrolled } from "@/actions/module";
import EnrollButton from "@/components/enrollbutton";
export default async function Modules({
  params,
}: {
  params: Promise<{ course_slug: string }>;
}) {
  const course_slug = (await params).course_slug;
  const modules = await getCourseModules(course_slug);
  console.log(modules);
  const session = await auth();
  if (!session?.user) return <div>Not signed in</div>;
  const user_id = session.user.id || "";
  const enrolled = await isEnrolled(course_slug, user_id);
  const slug = course_slug;
  if (!enrolled)
    return (
      <div className="h-screen flex items-center">
        <EnrollButton props={{ slug, user_id }} />
      </div>
    );
  return (
    <div>
      {modules.map((mod) => {
        return (
          <Link
            href={`/courses/${course_slug}/${mod.slug}`}
            key={`${mod.slug}`}
          >
            <div>{mod.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
