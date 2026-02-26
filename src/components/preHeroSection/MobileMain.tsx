"use client";

import BackgroundVideo from "next-video/background-video";
import mobileHero from "../../../videos/mobile-hero.mp4.json";

export default function MobileMain() {
    return (
        <div
            className="w-full h-full px-8 pt-2 flex items-center justify-center"
        >
            <BackgroundVideo src={mobileHero} autoPlay={false} startTime={2000} muted={true} loop={true} className="video-container h-full" />
        </div>
    );
};