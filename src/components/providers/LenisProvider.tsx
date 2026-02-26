'use client';

import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from 'framer-motion';

interface LenisProviderProps {
    children: React.ReactNode;
};

export default function LenisProvider({ children  }: LenisProviderProps) {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
    function update(data: { timestamp: number }) {
        const time = data.timestamp
        lenisRef.current?.lenis?.raf(time)
    }

        frame.update(update, true)

        return () => cancelFrame(update)
    }, [])

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.035,
                smoothWheel:true,
                autoRaf: false,
            }}
        >
            {children}
        </ReactLenis>
    )
};


