import { Fugaz_One } from "next/font/google";

import { useMediaQuery } from "../../hooks/useMediaQuery";


import Silk from "@/components/Silk";
import Header from "@/src/components/header/Header";
import DesktopMain from "@/src/components/preHeroSection/DesktopMain";
import MobileMain from "@/src/components/preHeroSection/MobileMain";

const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function    PreHeroSection() {

    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <section className="h-screen w-screen flex flex-col overflow-x-hidden bg-base-bg">
            <div className="relative flex-1 max-h-[25vh] min-h-[25vh]">
                <Silk
                    speed={1.5}
                    scale={0.75}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
                <div className="absolute inset-0 z-50 @container mx-auto w-full bg-transparent flex items-center justify-center select-none">
                    <h1 className={`${fugazOne.className} text-base-surface text-center font-black text-[20cqw] @3xs:text-[16cqw] @2xs:text-[16cqw] @xs:text-[18cqw] @sm:text-[18cqw] @md:text-[18cqw] @lg:text-[18cqw] @xl:text-[16cqw] @2xl:text-[14cqw] @3xl:text-[12cqw] @4xl:text-[10cqw]`}>rsd.exe</h1>
                </div>
            </div>
            <div className="min-h-[10vh]">
                <Header />
            </div>
            <div className="min-h-[65vh]">
                {
                    isDesktop ? <DesktopMain /> : <MobileMain />
                }
            </div>
        </section>
    );
};