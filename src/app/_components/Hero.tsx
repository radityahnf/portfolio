import { poppins } from "@/app/utils/fonts";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Hero() {
  return (
    <div className="flex lg:flex-row flex-col-reverse items-center justify-between lg:mx-[177px] lg:my-[230px] mx-6 my-[80px] ">
      <div>
        <h1 className={`${poppins} font-bold lg:text-[58px] text-[32px] text-primaryBlue`}>
          Hi!
        </h1>
        <h1 className={`${poppins} font-bold lg:text-[58px] text-[32px] text-primaryBlue`}>
          My name is
        </h1>
        <h1
          className={`${poppins} font-bold lg:text-[58px] text-[32px] bg-gradient-to-r from-lightBlue to-primaryPink inline-block text-transparent bg-clip-text `}
        >
          Muhammad Raditya Hanif
        </h1>
      </div>

      <div className="lg:ml-[200px] lg:ml-[50px]" >
        <Avatar className=" bg-gradient-to-r from-lightBlue to-primaryPink lg:h-80 lg:w-80 h-[300px] w-[300px] bg-clip-border">
            <AvatarImage src="./avatar-transparent.png"></AvatarImage>
        </Avatar>
      </div>
    </div>
  );
}
