import CadastroFlagSvg from "@/assets/shapes/CadastroFlag.svg";

export default function CadastroFlag({ isFlagAtLeft }) {
    return (
        isFlagAtLeft !== undefined && (
            <div
                className={`absolute ${
                    isFlagAtLeft ? "left-8" : "right-8"
                } top-0 h-16 w-1h-16`}
            >
                <img src={CadastroFlagSvg} className="w-full h-full" alt="Bandeira verde decorativa" />
            </div>
        )
    );
}
