"use client";

import BackgroundVideo from "next-video/background-video";
import desktopHero from "../../../videos/desktop-hero.mp4.json"


export default function DesktopMain() {
    return (
        <div className="w-full min-w-fit h-full flex gap-8 lg:gap-15 xl:gap-22 @container mx-auto justify-between px-6 pt-6 video-container  ">
            <span className="flex-1 text-text-muted text-center font-inter font-semibold text-lg lg:text-xl xl:text-xl 2xl:text-2xl block md:hidden lg:block lg:min-w-28 xl:min-w-40 2xl:min-w-48 self-end pb-6 lg:pb-10 xl:pb-12 2xl:pb-16">
                [ Scroll Down ]
            </span>
            <BackgroundVideo src={desktopHero} autoPlay={false} startTime={2000} muted={true} loop={true} className="video-container flex-4 h-full" />
            <div className="flex-1 min-w-fit md:min-w-3xs lg:min-w-2xs xl:min-w-xs 2xl:min-w-sm self-end pb-32 lg:pb-26 xl:pb-20 2xl:pb-16">
                <p className="text-[#171A1E] font-bold font-roboto text-lg text-left lg:text-xl xl:text-xl 2xl:text-2xl ">
                    Driven by Obsession, Centered on Improving, Embracing Growth
                </p>
            </div>
        </div>
    );
}