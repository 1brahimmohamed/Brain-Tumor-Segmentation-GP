import React,{ useEffect, useRef, useState } from 'react';



const useResizeObserver = (ref: React.RefObject<HTMLDivElement> | null, onResize: (width: number, height: number) => void) => {
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width, height } = entry.contentRect;
                onResize(width, height);
            }
        });

        if (ref?.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref?.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, onResize]);
};

export default useResizeObserver;
