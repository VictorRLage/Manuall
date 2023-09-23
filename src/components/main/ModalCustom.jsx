import { useState, useEffect, useRef } from "react";

export default function ModalCustom({
    canClose = false,
    canCloseOnItselfClick = false,
    modalGettr,
    modalSettr,
    tempo,
    w,
    h,
    children,
}) {
    const modal_custom = useRef(null);
    const modal_custom_bg = useRef(null);

    const [lastTimeout, setLastTimeout] = useState(0);

    useEffect(() => {
        if (canClose && tempo) clearTimeout(lastTimeout);

        if (modalGettr) {
            setTimeout(() => {
                modal_custom.current.style.transform = "scale(1)";
                modal_custom_bg.current.style.opacity = "0.4";
            }, 1);
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
            modal_custom_bg.current.style.opacity = "0";
            clearTimeout(lastTimeout);

            modal_custom.current.style.transform = "scale(0.97)";
            modalSettr?.(false);
        }
    };

    return (
        <>
            {modalGettr && (
                <>
                    <div
                        className="left-0 top-0 fixed justify-center items-center h-screen w-screen z-40 bg-black transition-all duration-300"
                        style={{
                            opacity: "0",
                        }}
                        ref={modal_custom_bg}
                    />
                    <div
                        onClick={closeModal}
                        className="left-0 top-0 fixed justify-center items-center h-screen w-screen z-50 flex"
                        ref={modal_custom}
                    >
                        <div
                            className="bg-white flex flex-col justify-around items-center rounded-xl"
                            style={{ width: w, height: h }}
                        >
                            {children}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
