import Image from "next/image";
import Link from "next/link";

const CoursePage = () => {
  return (
    <div className="pt-10">
      <h1 className="text-gray-300 text-3xl font-spaceGrotesk">Courses</h1>
      <div className="w-full flex gap-5 py-5">
        <Link
          className="course max-sm:text-sm text-xl relative"
          href="/course/java"
        >
          <p className="z-1">Java</p>
          <Image
            src="/java2.svg"
            width={150}
            height={150}
            alt="java logo"
            className="absolute top-[-40px] right-[-40px] rotate-12 max-sm:hidden"
          />
        </Link>
        <Link
          className="course max-sm:text-sm text-xl relative"
          href={"/course/python"}
        >
          <p className="z-1">Python</p>
          <Image
            src="/python.svg"
            width={210}
            height={210}
            alt="java logo"
            className="absolute top-[-45px] right-[-60px] rotate-12 max-sm:hidden"
          />
        </Link>
      </div>
    </div>
  );
};

export default CoursePage;
