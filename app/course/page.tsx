import Link from "next/link";

const CoursePage = () => {
  return (
    <div className="pt-10">
      <h1 className="text-gray-300 text-3xl font-spaceGrotesk">Courses</h1>
      <div className="w-full flex gap-5 py-5">
        <Link className="course" href="/course/java">
          <p>Learn Java</p>
        </Link>
        <Link className="course" href={"/course/python"}>
          <p>Learn Python</p>
        </Link>
      </div>
    </div>
  );
};

export default CoursePage;
