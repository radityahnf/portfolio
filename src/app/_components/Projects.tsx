import { poppins } from "../utils/fonts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/type/type";
import Image from "next/image";

export default function Projects() {
  const projects: Project[] = [
    {
      title: "Travelogue",
      description:
        "TraveLoGue invites locals to participate in sharing the beauty and diversity of Indonesia. TraveLoGue provide a platform for foreign tourist to discover activities that can be done while visiting cities in Indonesia – from tourism objects that have unique historical values, to a variety of creative local shops.",
      githubLink: "https://github.com/TraveLoGue-f12/TraveLoGue",
      deploymentLink: "https://trave-logue.adaptable.app/",
      image: "/project/travelogue.png",
    },
    {
      title: "NextShark Clone",
      description:
        "NextShark is the leading source covering Asian and Asian American news in business, culture, entertainment, politics, technology, and lifestyle.",
      githubLink: "https://github.com/radityahnf/nextshark",
      deploymentLink: "https://nextshark-clone.netlify.app/",
      image: "/project/nextshark.png",
    },
  ];

  return (
    <div className="flex flex-col lg:items-center lg:mx-[177px] lg:my-[230px] mx-6 my-[80px]">
      <h1
        className={`${poppins} grow font-bold lg:text-[48px] text-[28px] text-primaryBlue`}
      >
        Projects
      </h1>
      <p
        className={`${poppins} grow lg:text-[32px] text-[20px] text-black/50 mt-[20px] mb-[40px]`}
      >
        Personal projects I&apos;ve built so far
      </p>

      <div
        className={`flex flex-col  items-center md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 space-y-6 md:space-y-0`}
      >
        {projects.map((project) => (
          <Card key={project.title} className="max-w-[300px] max-h-[400px] min-h-[400px] min-w-[300px]">
            <Image
              src={project.image}
              alt={project.title}
              layout="responsive"
              width={400}
              height={250}
              className="max-w-full h-auto"
            />
            <CardHeader>
              <CardTitle
                className={`${poppins} text-[24px] font-bold text-ellipsis line-clamp-1 text-primaryBlue`}
              >
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[16px] text-gray-700 overflow-hidden text-ellipsis max-h-[4.8em] line-clamp-2">
                {project.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-end text-[16px] text-primaryBlue space-x-6">
              <button className="w-1/2 bg-white text-black/60 border-2 rounded-md hover:bg-lightBlue hover:text-white ">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </button>
              
              <button className="w-1/2 bg-white text-black/60 border-2 rounded-md hover:bg-lightBlue hover:text-white ">
               <a
                  href={project.deploymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Site
                </a>
              </button>
               
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
