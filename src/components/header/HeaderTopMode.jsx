import HeaderItems from "@/components/header/HeaderItems";
import ThreeBars from "@/assets/icons/3bars.png";
import logo_extensa from "@/assets/manuall/logo_green_black.png";
import { useData } from "@/data/CreateContext";
import { useNavigate } from "react-router-dom";

export default function HeaderTopMode({
    openSidebar,
    openModalEscolherCadastro,
}) {
    const { windowWidth } = useData();
    const navigate = useNavigate();

    return (
        <header className="flex py-4 min700:px-32 min500:px-16 px-8 w-full bg-white drop-shadow-md justify-between items-center">
            <img
                onClick={() => {
                    navigate("/");
                }}
                src={logo_extensa}
                alt="Logo da Manuall por extensa"
                className="w-[200px] cursor-pointer"
            />
            {windowWidth > 1000 ? (
                <HeaderItems openModalCadastro={openModalEscolherCadastro} />
            ) : (
                <img
                    src={ThreeBars}
                    className="h-11 cursor-pointer"
                    onClick={openSidebar}
                />
            )}
        </header>
    );
}
