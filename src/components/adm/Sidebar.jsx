import { useNavigate } from "react-router-dom";
import logo from "@/assets/manuall/logo_green_white.png";
import AbasAdmParametrizacao from "@/enum/AbasAdmParametrizacao";

export default function Sidebar() {

    const navigate = useNavigate()

    return <div className="h-full min-w-[250px] w-[18%] flex flex-col items-center bg-verde-escuro-1">
        <div onClick={() => { navigate("/") }} className="cursor-pointer w-[90%] h-[10%] flex justify-center items-center border-b-[1px] border-white">
            <img className="w-[80%]" src={logo} alt="" />
        </div>
        {AbasAdmParametrizacao?.map(({ title, url, icon }) =>
            <div
                onClick={() => { navigate(url) }}
                className="hover:bg-verde-claro-3 transition-all cursor-pointer w-[100%] h-[10%] flex justify-center items-center"
            >
                <div className="w-[90%] h-[100%] flex justify-center items-center border-b-[1px] border-white">
                    <img src={icon} className="w-[10%]" alt="" />
                    <div className="text-white ml-4">{title}</div>
                </div>
            </div>
        )}
    </div>
}
