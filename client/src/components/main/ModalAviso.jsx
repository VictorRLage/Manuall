import { useEffect, useState } from "react"

function ModalAviso(props) {

    const [lastTimeout, setLastTimeout] = useState(0)

    useEffect(() => {

        clearTimeout(lastTimeout)

        setLastTimeout(
            setTimeout(() => {
                props.modal(false)
            }, props.tempo)
        )

    }, []) // eslint-disable-line

    return (
        <div onClick={()=>{props.modal(false)}} className='z-50 fixed h-screen w-screen bg-blur flex justify-center items-center'>
            <div className='h-46 w-144 bg-white rounded-lg flex flex-col items-center p-10 gap-6'>
                <span id="titulo" className="text-5xl font-medium">{props.titulo}</span>
                <span id="descricao" className="text-xl font-medium ">{props.descricao}</span>
            </div>
        </div>
    )
}

export default ModalAviso