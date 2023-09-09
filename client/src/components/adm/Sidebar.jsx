import { useNavigate } from "react-router-dom";
import logo from "@/assets/img/logo_manuall_extensa_verde_branca.png";
import image from "@/assets/img/image_1.png";
import image2 from "@/assets/img/image_2.png";
import image3 from "@/assets/img/image_3.png";

export default function Sidebar() {

    const navigate = useNavigate()

    return <div className="h-full min-w-[250px] w-[18%] flex flex-col items-center bg-verde-escuro-1">
        <div onClick={() => { navigate("/") }} className="cursor-pointer w-[90%] h-[10%] flex justify-center items-center border-b-[1px] border-white">
            <img className="w-[80%]" src={logo} alt="" />
        </div>
        <div onClick={() => { navigate("/adm/aprovacao") }} className="hover:bg-verde-claro-3 transition-all cursor-pointer w-[100%] h-[10%] flex justify-center items-center">
            <div className="w-[90%] h-[100%] flex justify-center items-center border-b-[1px] border-white">
                <img src={image} className="w-[10%]" alt="" />
                <div className="text-white ml-4">Aprovação de prestadores</div>
            </div>
        </div>
        <div onClick={() => { navigate("/development") }} className="hover:bg-verde-claro-3 transition-all cursor-pointer w-[100%] h-[10%] flex justify-center items-center">
            <div className="w-[90%] h-[100%] flex justify-center items-center border-b-[1px] border-white">
                <img src={image2} className="w-[10%]" alt="" />
                <div className="text-white ml-4">Dashboard</div>
            </div>
        </div>
        <div onClick={() => { navigate("/adm/api") }} className="hover:bg-verde-claro-3 transition-all cursor-pointer w-[100%] h-[10%] flex justify-center items-center">
            <div className="w-[90%] h-[100%] flex justify-center items-center border-b-[1px] border-white">
                <img src={image3} className="w-[10%]" alt="" />
                <div className="text-white ml-4">API Rotineira</div>
            </div>
        </div>
    </div>
}
