"use client";

import BackgroundVideo from "next-video/background-video";
import desktopHero from "../../../videos/desktop-hero.mp4.json"

export default function DesktopHeroSection() {
    return (
        <section className="h-screen w-screen min-h-screen hidden md:block overflow-hidden relative ">
            <BackgroundVideo src={desktopHero} autoPlay={true} muted={true} loop={true} playsInline={true} className="video-container w-screen h-screen object-cover ">
                <div className="absolute p-20 lg:p-24 xl:p-28 2xl:p-32 mt-(--header-height) inset-0 z-50 @container mx-auto w-full bg-transparent flex flex-col select-none justify-center items-center">
                    <h2 className="text-black text-shadow-2xs text-shadow-accent-glow flex-1 min-w-fit md:min-w-3xs lg:min-w-2xs xl:min-w-xs 2xl:min-w-sm self-start font-extrabold font-inter text-left text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl">
                        What if<br/>I fall ?<br/><br/>Oh,<br/>but my darling,<br/>what if<br/>you fly ?
                    </h2>
                    {/* <p className="text-text-secondary flex-1 font-bold font-roboto text-lg text-left lg:text-xl xl:text-xl 2xl:text-2xl">
                        A React component for adding video to your Next.js application.
                        It extends both the video element and your Next app with features
                        for automatic video optimization.
                    </p> */}
                </div>
            </BackgroundVideo>
        </section>
    );
};