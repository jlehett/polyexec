import { useState, useEffect } from 'react';

export default function useAutoScrollToBottom({ initiallyEnabled, scrollableElementRef }) {
    const [isEnabled, setIsEnabled] = useState(initiallyEnabled);

    useEffect(() => {
        if (isEnabled) {
            return startAutoScrollingObserver(scrollableElementRef);
        }
    }, [isEnabled]);
    
    return {
        isEnabled,
        setIsEnabled,
        toggleIsEnabled: () => setIsEnabled(prev => !prev),
    }
}

function startAutoScrollingObserver(ref) {
    if (!ref?.current?.children) return;

    const resizeObserver = new ResizeObserver(() => {
        scrollToBottom(ref);
    });

    resizeObserver.observe(ref.current.children[0]);

    return () => {
        resizeObserver.disconnect();
    };
}

function scrollToBottom(ref) {
    if (!ref.current) return;

    ref.current.scrollTop = ref.current.scrollHeight;
}