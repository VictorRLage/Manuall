import React from "react";
import imagemNotFound from "@/assets/svg/Not Found.svg";

const NenhumPrestadorEncontrado = () => {
    const imagemStyle = {
        width: "400px", // Ajuste o tamanho da imagem como desejado
        height: "auto", // Isso manterá a proporção da imagem
        marginBottom: "20px", // Ajuste o espaçamento inferior da imagem como desejado
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <img
                src={imagemNotFound}
                alt="Imagem de não encontrado"
                style={imagemStyle}
            />
            <p className="font-bold text-green-500 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
                Desculpe, parece que não temos prestadores com esses filtros!
            </p>
        </div>
    );
};

export default NenhumPrestadorEncontrado;
