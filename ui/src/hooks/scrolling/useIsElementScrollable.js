import { useState, useEffect } from 'react';

export default function useIsElementScrollable(ref) {
    const [isScrollable, setIsScrollable] = useState(false);
    
    useEffect(() => {
        return startTrackingElementHeight(setIsScrollable, ref);
    }, []);

    return isScrollable;
}

function startTrackingElementHeight(setIsScrollable, ref) {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
        setIsScrollable(isElementScrollable(ref));
    });

    resizeObserver.observe(ref.current);

    return () => {
        resizeObserver.disconnect();
    };
}

function isElementScrollable(ref) {
    return ref.current.scrollHeight > ref.current.offsetHeight;
}