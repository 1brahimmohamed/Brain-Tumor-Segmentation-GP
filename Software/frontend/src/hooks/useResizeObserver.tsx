import React, { useEffect } from 'react';

let lastWidth = 0;
let lastHeight = 0;

/**
 * A custom React hook that observes the size of an element and calls a callback function when it changes.
 *
 * @param {React.RefObject<HTMLDivElement> | null} ref - The reference to the element to observe.
 * @param {(width: number, height: number) => void} onResize - The callback function to call when the size of the element changes.
 * @return {void} This hook does not return anything.
 */
const useResizeObserver = (
    ref: React.RefObject<HTMLDivElement> | null,
    onResize: (width: number, height: number) => void
): void => {
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
