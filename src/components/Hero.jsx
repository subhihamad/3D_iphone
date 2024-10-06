import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { smallHeroVideo, heroVideo } from "../utils";

const Hero = () => {
  useGSAP(() => {
    gsap.to("p", {
      opacity: 1,
      duration: 1,
      ease: "bounce.inOut",
    });
    gsap.to('#cta',{
      opacity: 1,
      y:-50,
      duration:1
    })
  });
  const [videoSrc, setVideoSrc] = useState();
  const isMobile = useMediaQuery({ maxWidth: 760 });
  useEffect(() => {
    if (isMobile) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  },[isMobile]);
  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title">iphone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center  translate-y-20 opacity-0">
        <a href="#highlights" className="btn">Buy</a>
        <a className="font-normal text-xl">From $199 month or $999</a>
      </div>
    </section>
  );
};

export default Hero;
