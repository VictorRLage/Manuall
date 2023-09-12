import { useState, useEffect } from "react";

export default function ModalCustom(props) {

    const [lastTimeout, setLastTimeout] = useState(0)

    useEffect(() => {

        if (props.canClose && props.tempo) {
            clearTimeout(lastTimeout)

            setLastTimeout(
                setTimeout(() => {
                    props.modalSettr?.(false)
                }, props.tempo)
            )
        }

    }, [props.modalGettr]) // eslint-disable-line

    const closeModal = () => {
        if (props.canClose) {
            clearTimeout(lastTimeout)
            props.modalSettr?.(false)
        }
    }

    return (
        <div onClick={closeModal} style={{display: props.modalGettr ? "flex" : "none"}} className="fixed justify-center items-center h-screen w-screen bg-blur z-50">
            <div className="bg-white flex flex-col justify-around items-center rounded-xl" style={{width: props.w, height: props.h}}>
                {props.children}
            </div>
        </div>
    )
}
