function ModalCustom(props) {
    return (
        <div className="flex fixed justify-center items-center h-screen w-screen bg-blur">
            <div className="bg-white flex flex-col justify-around items-center rounded-xl border border-solid border-gray-300" style={{width: props.w, height: props.h}}>
                {props.children}
            </div>
        </div>
    )
}

export default ModalCustom