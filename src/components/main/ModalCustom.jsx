import { useState, useEffect } from "react";

export default function ModalCustom({ canClose, modalGettr, modalSettr, tempo, w, h, children }) {

    const [lastTimeout, setLastTimeout] = useState(0)

    useEffect(() => {

        if (canClose && tempo) {
            clearTimeout(lastTimeout)

            setLastTimeout(
                setTimeout(() => {
                    modalSettr?.(false)
                }, tempo)
            )
        }

    }, [modalGettr]) // eslint-disable-line

    const closeModal = () => {
        if (canClose) {
            clearTimeout(lastTimeout)
            modalSettr?.(false)
        }
    }

    return (
        <div onClick={closeModal} style={{display: modalGettr ? "flex" : "none"}} className="fixed justify-center items-center h-screen w-screen bg-blur z-50">
            <div className="bg-white flex flex-col justify-around items-center rounded-xl" style={{width: w, height: h}}>
                {children}
            </div>
        </div>
    )
}
