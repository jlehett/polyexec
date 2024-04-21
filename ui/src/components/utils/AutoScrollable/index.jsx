import { useRef } from 'react';
import { IconButton } from '@psionic/ui';
import KeyboardArrowDoubleDown from '@assets/keyboard-arrow-double-down';
import {
    useAutoScrollToBottom,
    useIsElementScrollable,
} from '@hooks/scrolling';
import localStyles from './index.module.scss';

export default function AutoScrollable({
    children,
    initiallyEnabled,
    ...passThruProps
}) {
    const ref = useRef();

    const {
        isEnabled,
        toggleIsEnabled,
    } = useAutoScrollToBottom({ initiallyEnabled, scrollableElementRef: ref });

    const isElementScrollable = useIsElementScrollable(ref);

    return (
        <>
            <div
                ref={ref}
                {...passThruProps}
                className={`${localStyles.autoScrollable} ${passThruProps?.className}`}
            >
                {children}
            </div>
            <div
                className={localStyles.overlay}
                style={{
                    width: `${ref.current?.offsetWidth}px`,
                    height: `${ref.current?.offsetHeight}px`,
                    top: `${ref.current?.offsetTop}px`,
                }}
            >
                {isElementScrollable && (
                    <IconButton
                        SvgIcon={KeyboardArrowDoubleDown}
                        size={24}
                        color={isEnabled ? 'white' : 'gray'}
                        onClick={toggleIsEnabled}
                        className={localStyles.scrollButton}
                    />
                )}
            </div>
        </>
    );
}
