import { useEffect, useState } from "react";

export default function ModalAviso({ modal, tempo, titulo, descricao }) {

    const [lastTimeout, setLastTimeout] = useState(0)

    useEffect(() => {

        clearTimeout(lastTimeout)

        setLastTimeout(
            setTimeout(() => {
                modal(false)
            }, tempo)
        )

    }, []) // eslint-disable-line

    return (
        <div onClick={() => { clearTimeout(lastTimeout); modal(false) }} className="z-50 fixed h-screen w-screen bg-blur flex justify-center items-center">
            <div className="h-46 w-144 bg-white rounded-lg flex flex-col items-center p-10 gap-6">
                <span className="text-5xl font-medium">{titulo}</span>
                <span className="text-xl font-medium ">{descricao}</span>
            </div>
        </div>
    )
}
