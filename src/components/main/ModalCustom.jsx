import { useState, useEffect, useRef } from "react";

export default function ModalCustom({
    canClose = false,
    canCloseOnItselfClick = false,
    modalGettr,
    modalSettr,
    tempo,
    children,
    backgroundStyle,
    modalStyle,
}) {
    const modal_custom = useRef(null);

    const [lastTimeout, setLastTimeout] = useState(0);

    useEffect(() => {
        if (canClose && tempo) clearTimeout(lastTimeout);

        if (modalGettr) {
            if (canClose && tempo) {
                setLastTimeout(
                    setTimeout(() => {
                        modalSettr?.(false);
                    }, tempo),
                );
            }
        }
    }, [modalGettr]);

    const closeModal = ({ target }) => {
        if (!canCloseOnItselfClick && target !== modal_custom.current) return;

        if (canClose) {
            clearTimeout(lastTimeout);
            modalSettr?.(false);
        }
    };

    return (
        modalGettr && (
            <>
                <div
                    className="left-0 top-0 fixed justify-center items-center h-screen w-screen z-40 bg-black"
                    style={{
                        animation: "opacity_in 300ms forwards",
                        ...backgroundStyle
                    }}
                />
                <div
                    onClick={closeModal}
                    className="left-0 top-0 fixed justify-center items-center h-screen w-screen z-50 flex"
                    ref={modal_custom}
                >
                    <div
                        className="bg-white flex flex-col justify-around items-center rounded-xl"
                        style={{
                            animation: "pop_up 150ms",
                            ...modalStyle,
                        }}
                    >
                        {children}
                    </div>
                </div>
            </>
        )
    );
}
