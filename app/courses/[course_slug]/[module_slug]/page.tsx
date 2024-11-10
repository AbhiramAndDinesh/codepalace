import { getModuleBySlug } from "@/actions/module";
import Link from "next/link";
import { auth } from "@/auth";

const ModulePage = async ({
  params,
}: {
  params: Promise<{ course_slug: string; module_slug: string }>;
}) => {
  const session = await auth();
  if (!session?.user) return <div>Not signed in</div>;
  const m_slug = (await params).module_slug;
  const c_slug = (await params).course_slug;
  const mod = await getModuleBySlug(m_slug, c_slug);
  if (!mod) return <div>Loading</div>;

  const lessons = mod.lessons;
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {lessons.map((lesson) => (
        <div className="flex gap-5" key={lesson.slug}>
          <p>{lesson.priority}</p>
          <p>{lesson.type}</p>
          <Link
            href={`/courses/${c_slug}/${m_slug}/${lesson.slug}`}
            className="hover:text-blue-200"
          >
            {lesson.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ModulePage;
