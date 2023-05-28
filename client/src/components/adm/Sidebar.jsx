import logo from "../../assets/img/logo_manuall_extensa_verde.png"
import image from "../../assets/img/image.png"
import image2 from "../../assets/img/image (1).png"
import { useNavigate } from "react-router-dom"

function Sidebar(props) {

    const navigate = useNavigate()

    return (
        <>
            <div className="h-full w-[18%] flex flex-col items-center bg-verde-escuro-1">
                <div onClick={() => { navigate("/inicio") }} className="cursor-pointer w-[90%] h-[10%] flex justify-center items-center border-b-[1px] border-white">
                    <img className="w-[80%]" src={logo} alt="" />
                </div>
                <div onClick={() => { navigate("/adm/aprovacao") }} className="cursor-pointer w-[90%] h-[10%] flex justify-center items-center border-b-[1px] border-white">
                    <img src={image} className="w-[10%]" alt="" />
                    <div className="text-white ml-4">Aprovação de prestadores</div>
                </div>
                <div onClick={() => { navigate("/adm/dashboard") }} className="cursor-pointer w-[90%] h-[10%] flex justify-center items-center border-b-[1px] border-white">
                    <img src={image2} className="w-[10%]" alt="" />
                    <div className="text-white ml-4">Dashboard</div>
                </div>
            </div>  
        </>
    )
}

export default Sidebar