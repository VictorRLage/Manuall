import { useEffect, useState } from "react"

function ModalAviso(props) {

    const [lastTimeout, setLastTimeout] = useState(0)

    useEffect(() => {

        clearTimeout(lastTimeout)

        setLastTimeout(
            setTimeout(() => {
                props.modal.plotarModal(false)
            }, props.maxSegundosEmTela)
        )

    }, [props.modal.modal]) // eslint-disable-line

    return (
        <div className="fixed justify-center items-center h-screen w-screen bg-blur" style={{ display: `${props.modal.modal ? "flex" : "none"}` }}>
            <div className="bg-white flex flex-col items-center rounded-xl border border-solid border-gray-300 h-48 w-144 p-6" >
                <span className="text-4xl text-verde-padrao text-center font-extrabold mt-2">{props.errorTitulo}</span>
                <span className="text-xl text-black text-center font-base">{props.errorMsg}</span>
                <button onClick={() => {clearTimeout(lastTimeout); props.modal.plotarModal(false)}} className="bg-verde-padrao text-white w-56 h-10 rounded-xl font-bold mt-6">Continuar</button>
                {/* <img src="https://pbs.twimg.com/media/FwhlZqPakAA1LtI?format=jpg&name=900x900" alt="" /> */}
            </div>
        </div>
    )
}

export default ModalAviso