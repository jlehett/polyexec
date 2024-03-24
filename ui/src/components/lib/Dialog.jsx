import localStyles from './dialog.module.scss';

function Dialog({
    isOpen,
    children,
}) {

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className={localStyles.overlay}/>
            <div className={localStyles.dialog}>
                {children}
            </div>
        </>
    );
}

export default Dialog;
