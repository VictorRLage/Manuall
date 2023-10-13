import { Fragment } from "react";

export default function PlanoSecondaryCard({ titulo, preco, comprar, opcoes }) {

    return (
        <div className="bg-white w-[300px] h-[405px] rounded-lg overflow-hidden">
            <div className="w-full h-[90px] relative flex flex-col items-center justify-center">
                <div
                    className="absolute flex flex-col items-center justify-center text-center text-white font-extrabold mb-4">
                    <span className="text-lg leading-6">Plano</span>
                    <span className="text-4xl leading-6">{titulo}</span>
                </div>
                <div className="bg-[#368943] h-[60px] w-full" />
                <div
                    className="border-t-[30px] border-l-[150px] border-r-[150px] border-t-[#368943] border-transparent" />
            </div>
            {opcoes.map((item, i) => (
                <Fragment key={i}>{item.opcao}</Fragment>
            ))}
        </div>
    );
}