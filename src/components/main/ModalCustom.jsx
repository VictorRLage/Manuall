import { useState, useEffect } from "react";

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
    const [lastTimeout, setLastTimeout] = useState(0);

    useEffect(() => {
        if (canClose && tempo) clearTimeout(lastTimeout);

        if (modalGettr) {
            const modalCustom = document.getElementById("modalCustom");
            const modalCustomBg = document.getElementById("modalCustomBg");

            setTimeout(() => {
                modalCustom.style.transform = "scale(1)";
                modalCustomBg.style.opacity = "0.4";
            }, 1);
            if (canClose && tempo) {
                setLastTimeout(
                    setTimeout(() => {
                        modalSettr?.(false);
                    }, tempo)
                );
            }
        }
    }, [modalGettr]); // eslint-disable-line

    const closeModal = ({ target }) => {
        if (!canCloseOnItselfClick && target.id !== "modalCustom") return;

        if (canClose) {
            const modalCustom = document.getElementById("modalCustom");
            const modalCustomBg = document.getElementById("modalCustomBg");

            modalCustomBg.style.opacity = "0";
            clearTimeout(lastTimeout);

            setTimeout(() => {
                modalCustom.style.transform = "scale(0.97)";
                modalSettr?.(false);
            }, 150);
        }
    };

    return (
        <>
            <div
                className="fixed justify-center items-center h-screen w-screen z-40 bg-black transition-all"
                style={{
                    display: modalGettr ? "block" : "none",
                    opacity: "0",
                }}
                id="modalCustomBg"
            />
            <div
                onClick={closeModal}
                className="fixed justify-center items-center h-screen w-screen z-50"
                style={{ display: modalGettr ? "flex" : "none" }}
                id="modalCustom"
            >
                <div
                    className="bg-white flex flex-col justify-around items-center rounded-xl"
                    style={{ width: w, height: h }}
                >
                    {children}
                </div>
            </div>
        </>
    );
}
