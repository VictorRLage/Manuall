import logo from "@/assets/manuall/logo_only.png";
import HeaderItems from "@/components/header/HeaderItems";

export default function HeaderSidebarMode({
    on,
    setOn,
    openModalEscolherCadastro,
}) {
    return (
        <>
            {on && (
                <div
                    className="left-0 top-0 fixed justify-center items-center h-screen w-screen z-40 bg-black transition-all duration-300 opacity-40"
                    onClick={() => {
                        setOn(false);
                    }}
                />
            )}
            <div
                className={`bg-white fixed flex flex-col items-center gap-4 top-0 py-8 overflow-y-auto ${
                    on
                        ? "min500:left-[calc(100vw-400px)] left-0"
                        : "left-[100vw]"
                } min500:w-[400px] w-[100vw] z-50 h-full transition-all duration-150 ease-linear`}
            >
                <img
                    onClick={() => {
                        setOn(false);
                    }}
                    src={logo}
                    alt="Logotipo da Manuall"
                    className="w-[50px] cursor-pointer pb-4"
                />
                <HeaderItems
                    responsiveMode
                    openModalCadastro={openModalEscolherCadastro}
                />
            </div>
        </>
    );
}
