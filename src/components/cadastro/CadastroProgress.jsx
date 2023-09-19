export default function CadastroProgress({ fase, fases }) {

    return (
        <div className="flex h-14 w-full justify-center items-center mt-6">
            {Array.from({ length: fases }, (_, i) => <>
                <div className={`${i + 1 < fase
                    ? "bg-verde-padrao"
                    : i + 1 == fase
                        ? "bg-white border-4 border-verde-padrao"
                        : "bg-white border-2 border-black"
                    } rounded-full h-10 w-10`} />
                {i + 2 == fases &&
                    <div className={`${i + 1 < fase
                        ? "bg-verde-padrao"
                        : "bg-black"
                        } h-1 w-10`} />
                }
            </>)}
        </div>
    )
}
