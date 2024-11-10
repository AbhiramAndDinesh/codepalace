import Link from "next/link";
import { getCourses, getUserCourses } from "@/actions/course";
import { auth } from "@/auth";
export default async function CoursePage() {
  const session = await auth();
  const courses = await getCourses();
  if (!session?.user) return <div>Not signed in</div>;
  if (!courses) return <div>Loading</div>;
  const usercourses = await getUserCourses(session.user.id);
  console.log(usercourses);
  const courses_ = courses.filter(
    (cour) =>
      !usercourses.some((cours) => cour.course_id === cours.course.course_id),
  );
  return (
    <div className="min-h-screen min-w-[100vw] p-10">
      <div>
        <h1>My coursese</h1>
        {usercourses.map((course) => (
          <Link
            key={course.course_id}
            className=""
            href={`/courses/${course.course.slug}`}
          >
            <div className="min-w-[700px] min-h-[20%] rounded-md shadow-md p-3">
              {course.course.name}
            </div>
          </Link>
        ))}
      </div>
      <div>
        <h1>Explore courses</h1>
        {courses_.map((course) => (
          <Link
            key={course.course_id}
            className=""
            href={`/courses/${course.slug}`}
          >
            <div className="min-w-[700px] min-h-[20%] rounded-md shadow-md p-3">
              {course.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
