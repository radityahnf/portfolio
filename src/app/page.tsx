import Hero from "./_components/Hero";
import Projects from "./_components/Projects";
import Techstack from "./_components/Techstack";
import AboutMe from "./_components/AboutMe";

export default function Home() {
  return (
    <>
      <div>
        <div  id="home" className="mb-[30px] w-[10px] invisible">
          <button></button>
        </div>
        <Hero></Hero>
      </div>
      <div >
        <div  id="aboutMe" className="mb-[30px] w-[10px] invisible">
          <button></button>
        </div>

        <AboutMe></AboutMe>
      </div>
      <div >
        <div  id="techstack"className="mb-[30px] w-[10px] invisible">
          <button></button>
        </div>

        <Techstack></Techstack>
      </div>
      <div >
        <div  id="projects" className="mb-[30px] w-[10px] invisible">
          <button></button>
        </div>

        <Projects></Projects>
      </div>
    </>
  );
}
