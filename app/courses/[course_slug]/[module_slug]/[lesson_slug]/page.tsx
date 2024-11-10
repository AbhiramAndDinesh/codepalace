import { getLessonBySlug } from "@/actions/lesson";
import ProblemPage from "@/components/lesson/CourseProblemPage";
import DocumentPage from "@/components/lesson/DocumentPage";
import VideoPage from "@/components/lesson/VideoPage";

const LessonPage = async ({
  params,
}: {
  params: Promise<{
    course_slug: string;
    module_slug: string;
    lesson_slug: string;
  }>;
}) => {
  const c_slug = (await params).course_slug;
  const m_slug = (await params).module_slug;
  const l_slug = (await params).lesson_slug;
  const lesson = await getLessonBySlug(l_slug, m_slug, c_slug);
  if (!lesson) return <div>Loading...</div>;
  if (lesson.video)
    return (
      <div>
        {`${c_slug}  ${m_slug} ${l_slug} ${lesson.name} ${lesson.module_id}`}
        <VideoPage url={lesson.video.url} />
      </div>
    );
  if (lesson.document) return <DocumentPage text={lesson.document.value} />;
  if (lesson.problem) return <ProblemPage id={lesson.problem.problem_id} />;
};

export default LessonPage;
