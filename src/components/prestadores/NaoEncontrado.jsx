import imagemNotFound from "@/assets/storyset/Not_Found.svg";

const NenhumPrestadorEncontrado = ({ isHome }) => {
    const imagemStyle = {
        width: "400px",
        height: "auto",
        marginBottom: "20px",
    };

    return (
        <div className="flex flex-col items-center justify-center py-8 h-full">
            <img
                src={imagemNotFound}
                alt="Imagem de não encontrado"
                style={imagemStyle}
            />
            <p className="font-bold text-green-500 text-xl md:text-2xl lg:text-3xl text-center">
                {isHome
                    ? "Desculpe, parece que nenhum prestador foi encontrado!"
                    : "Desculpe, parece que não temos prestadores com esses filtros!"}
            </p>
        </div>
    );
};

export default NenhumPrestadorEncontrado;
