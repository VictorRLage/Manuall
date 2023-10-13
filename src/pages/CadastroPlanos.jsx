import PlanosBg from "@/assets/shapes/PlanosBg.png";
import PlanoSecondaryCard from "@/components/planos/PlanoSecondaryCard.jsx";

function AcessoManual() {
    return (<>
        Acesso a <span className="font-extrabold">Manuall</span>
    </>);
}

function MetricasDesempenho() {
    return (<><span className="font-extrabold">Métricas</span> de <span
        className="font-extrabold">Desempenho</span></>);
}

function PerfilPaginaPrincipal() {
    return (<>Perfil na <span className="font-extrabold">Página Principal</span></>);
}

export default function CadastroPlanos() {
    return (<div className="w-screen h-screen flex items-center justify-center">
        <div className="w-full h-[97.5%] bg-center"
             style={{ backgroundImage: `url(${PlanosBg})`, backgroundSize: "100% 100%" }}>
            <div className="w-full h-full flex items-center justify-center gap-10">
                <PlanoSecondaryCard titulo="Advanced" preco="30,00" comprar={() => {
                    console.log("comprando advanced");
                }} opcoes={[{ opcao: <AcessoManual />, possui: true }, {
                    opcao: <MetricasDesempenho />, possui: true,
                }, { opcao: <PerfilPaginaPrincipal />, possui: false }]} />
                <PlanoSecondaryCard titulo="Basic" preco="15,00" comprar={() => {
                    console.log("comprando basic");
                }} opcoes={[{ opcao: <AcessoManual />, possui: true }, {
                    opcao: <MetricasDesempenho />, possui: false,
                }, { opcao: <PerfilPaginaPrincipal />, possui: false }]} />
            </div>
        </div>
    </div>);
}