import { poppins } from "@/app/utils/fonts";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function AboutMe() {
  return (
    <div className="flex flex-col lg:items-center lg:mx-[177px] lg:my-[230px] mx-6 my-[80px]">
      <h1
        className={`${poppins} grow font-bold lg:text-[48px] text-[28px] text-primaryBlue`}
      >
        About Me
      </h1>
      <p
        className={`${poppins} grow lg:text-[32px] text-[20px] text-black/50 mt-[20px] mb-[40px]`}
      >
        I&apos;m a third-year Computer Science student at University of Indonesia, specializing in Fullstack Web Development. Passionate to learn new
        technologies and improve both my hard and soft skills. Take a look at my resume to learn more!
      </p>
      <a 
        href="/aboutme/resume.pdf" 
        download="resume.pdf"
        className="px-6 py-3 mt-4 text-white bg-primaryBlue rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out "
      >
        Download Resume
      </a>
    </div>
  );
}
