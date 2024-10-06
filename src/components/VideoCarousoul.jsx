import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousoul = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const [video, setVideo] = useState({
    videoId: 0,
    startPlay: false,
    isPlaying: false,
    isEnd: false,
    isLastVideo: false,
  });
  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, isPlaying, startPlay, videoId } = video;
  useGSAP(()=>{
    gsap.to('#slider',{
      transform:`translateX(${-100 * videoId}%)`,
      duration:2,
      ease:'power2.inOut'
    })
    gsap.to("#video",{
        scrollTrigger:{
            trigger:'#video',
            toggleActions:'restart none none none',
        },onComplete:()=>{
            setVideo(prev=>({
                ...prev,
                startPlay:true,
                isPlaying:true
            }))
        }
    }) 
  },[isEnd,videoId])
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    if (span[videoId]) {
      //animate the progress of the video
      let animate = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress=Math.ceil(animate.progress()*100);
          if(progress != currentProgress){
            currentProgress=progress;
            gsap.to(videoDivRef.current[videoId],{
              width:window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
            })
          }
          gsap.to(span[videoId],{
            width:`${currentProgress}%`,
            backgroundColor:'white'
          })
        },
        onComplete: () => {
          if(isPlaying){
            gsap.to(videoDivRef.current[videoId],{
              width:'12px',
            })
            gsap.to(videoSpanRef.current[videoId],{
              backgroundColor:'#afafaf',
            })
          }
        },
      });
      if(videoId==0){
        animate.restart();
      }
      const animateUpdate=()=>{
        animate.progress(videoRef.current[videoId]?.currentTime / hightlightsSlides[videoId].videoDuration);
      }
      if(isPlaying){
        gsap.ticker.add(animateUpdate);
      }else{
        gsap.ticker.remove(animateUpdate);
      }
    }
  }, [videoId, startPlay]);
  const handleProcess=(action,i)=>{
    switch(action){
        case 'video-end':
            setVideo(prev=>({...prev,isEnd:true,videoId:i+1}))
            break;
        case 'video-last':
            setVideo(prev=>({...prev,isLastVideo:true}))
            break;
        case 'video-reset':
            setVideo(prev=>({...prev,isLastVideo:false,videoId:0}))
            break;
        case 'play':
            setVideo(prev=>({...prev,isPlaying:!prev.isPlaying}))
            break;
        case 'pause':
            setVideo(prev=>({...prev,isPlaying:false}))
            break;
        default:
            return video
    }
  }
  const handleLoadedMetaData=(i,e)=>setLoadedData((prev)=>([...prev,e]));
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div id="slider" className="sm:pr-20 pr-10" key={list.id}>
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  muted
                  preload="auto"
                  className={`${list.id==2 && 'translate-x-44 pointer-events-none'}`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() =>
                    setVideo((prevVideo) => ({ ...prevVideo, isPlaying: true }))
                  }
                  onLoadedMetadata={(e)=>{handleLoadedMetaData(i,e)}}
                  onEnded={()=> i !==3 ? handleProcess('video-end',i) : handleProcess('video-last',i)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p className="md:text-2xl text-xl" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute rounded-full h-full w-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousoul;
