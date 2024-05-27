import React, { useEffect, useRef, useState } from 'react';

let lastWidth = 0;
let lastHeight = 0;

const useResizeObserver = (
    ref: React.RefObject<HTMLDivElement> | null,
    onResize: (width: number, height: number) => void
) => {
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width, height } = entry.contentRect;
                // make tolerance for 5px difference
                if (Math.abs(width - lastWidth) > 5 || Math.abs(height - lastHeight) > 5) {
                    lastWidth = width;
                    lastHeight = height;
                    onResize(width, height);
                }
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
