'use client'
import { poppins } from "@/app/utils/fonts";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Techstack() {
    const [api, setApi] = useState<CarouselApi>();
    const [autoplay, setAutoplay] = useState<>();
  
    useEffect(() => {
      if (!api) return;
  
      const play = () => {
        autoplay && clearInterval(autoplay);
        const interval = setInterval(() => {
          if (api.canScrollNext()) {
            api.scrollNext();
          } else {
            api.scrollTo(0);
          }
        }, 3000); 
        setAutoplay(interval);
      };
  
      play();
  
      return () => {
        autoplay && clearInterval(autoplay);
      };
    }, [api]);

  return (
    <div className="flex flex-col lg:items-center lg:mx-[177px] lg:my-[230px] mx-6 my-[80px]">
      <h1
        className={`${poppins} grow font-bold lg:text-[48px] text-[28px] text-primaryBlue`}
      >
        My Tech Stack
      </h1>
      <p
        className={`${poppins} grow lg:text-[32px] text-[20px] text-black/50 mt-[20px] mb-[40px]`}
      >
        Technologies I use
      </p>

      <div className="flex flex-col  space-y-20 lg:block hidden">
        <div className="flex flex-row justify-center items-center mt-[40px] lg:space-x-20">
          <Image
            src="/techstack/react.png"
            alt="React"
            height={100}
            width={110}
          />
          <Image
            src="/techstack/next.png"
            alt="Next.js"
            height={100}
            width={100}
          />
          <Image
            src="/techstack/django.png"
            alt="Django"
            height={100}
            width={100}
          />
          <Image
            src="/techstack/springboot.png"
            alt="Springboot"
            height={100}
            width={100}
          />
        </div>

        <div className="flex flex-row justify-center items-center mt-[40px] lg:space-x-20 ">
          <Image
            src="/techstack/flutter.png"
            alt="flutter"
            height={100}
            width={100}
          />
          <Image
            src="/techstack/kotlin.png"
            alt="kotlin"
            height={100}
            width={100}
          />
          <Image
            src="/techstack/express.png"
            alt="express"
            height={100}
            width={100}
          />
          <Image
            src="/techstack/postgresql.png"
            alt="postgresql"
            height={100}
            width={100}
          />
        </div>

        <div className="flex flex-row justify-center items-center mt-[40px] lg:space-x-40 ">
          <Image src="/techstack/gcp.png" alt="gcp" height={100} width={100} />
          <Image
            src="/techstack/docker.png"
            alt="docker"
            height={100}
            width={100}
          />
        </div>
      </div>

      <div className="w-2/3 self-center lg:hidden block">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent className="space-x-20">
            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/react.png"
                alt="React"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>React</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/next.png"
                alt="Next.js"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>NextJS</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/django.png"
                alt="Django"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>Django</p>
            </CarouselItem>

            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/springboot.png"
                alt="Springboot"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>Springboot</p>
            </CarouselItem>

            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/flutter.png"
                alt="flutter"
                height={180}
                width={180}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>Flutter</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/kotlin.png"
                alt="kotlin"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>Kotlin</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/express.png"
                alt="express"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>ExpressJS</p>
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/postgresql.png"
                alt="postgresql"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>PostgreSQL</p>
            </CarouselItem>

            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/gcp.png"
                alt="gcp"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>GCP</p>
            </CarouselItem>

            <CarouselItem className="flex flex-col justify-center items-center min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] ">
              <Image
                src="/techstack/docker.png"
                alt="docker"
                height={200}
                width={200}
              />
              <p className={`${poppins} text-[20px] mt-2 `}>Docker</p>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
