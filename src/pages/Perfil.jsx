import axios from "@/api/axios";
import Header from "@/components/header/Header";
import ModalAvaliacao from "@/components/perfil/ModalAvaliacao";
import ModalUrlGaleria from "@/components/perfil/ModalUrlGaleria";
import ModalUrlPfp from "@/components/perfil/ModalUrlPfp";
import PrestadorAvaliacoes from "@/components/perfil/PrestadorAvaliacoes";
import PrestadorGaleria from "@/components/perfil/PrestadorGaleria";
import PrestadorMain from "@/components/perfil/PrestadorMain";
import PrestadorServicos from "@/components/perfil/PrestadorServicos";
import ModalSolicitacao from "@/components/solicitacao/ModalSolicitacao";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Perfil({ isOwnProfile }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [prestador, setPrestador] = useState();
    const [modalUrlPfp, setModalUrlPfp] = useState(false);
    const [modalUrlGaleria, setModalUrlGaleria] = useState(false);
    const [modalSolicitacao, setModalSolicitacao] = useState(false);
    const [modalAvaliacao, setModalAvaliacao] = useState(false);

    const [incluiAula, setIncluiAula] = useState();
    const [headerRefetch, setHeaderRefetch] = useState(false);
    const [descricao, setDescricao] = useState("");

    const [perfilEndpointLoaded, setPerfilEndpointLoaded] = useState(false);

    const refetch = () => {
        setHeaderRefetch(!headerRefetch);
        setPerfilEndpointLoaded(false);
        axios
            .get(
                `/perfil${
                    isOwnProfile ? "" : "/" + location.pathname.substring(8)
                }`,
            )
            .then(({ data }) => {
                setPrestador(data);
                setPerfilEndpointLoaded(true);
                if (data.descricao) {
                    setDescricao(data.descricao);
                }
            })
            .catch(({ response }) => {
                if (response.status === 403 || response.status === 404) {
                    navigate("/prestadores?pagina=1");
                }
            });
    };

    const createImagem = (url) => {
        axios
            .post("/perfil/imagem", { imagem: url })
            .then(() => {
                setModalUrlGaleria(false);
                refetch();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        refetch();
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <ModalUrlPfp
                modalGettr={modalUrlPfp}
                modalSettr={setModalUrlPfp}
                currentPfp={prestador?.pfp}
                refetch={refetch}
            />
            <ModalUrlGaleria
                modalGettr={modalUrlGaleria}
                modalSettr={setModalUrlGaleria}
                createImagem={createImagem}
            />
            <ModalSolicitacao
                modalGettr={modalSolicitacao}
                modalSettr={setModalSolicitacao}
                idPrestador={location.pathname.substring(8)}
                incluiAula={incluiAula}
                servicos={prestador?.servicos}
            />
            <ModalAvaliacao
                modalGettr={modalAvaliacao}
                modalSettr={setModalAvaliacao}
            />
            <Header refetch={headerRefetch} />
            <div className="w-full bg-gray-100">
                <PrestadorMain
                    prestador={prestador}
                    hasInfoLoaded={perfilEndpointLoaded}
                    isOwnProfile={isOwnProfile}
                    setModalUrlPfp={setModalUrlPfp}
                    setModalSolicitacao={setModalSolicitacao}
                    setIncluiAula={setIncluiAula}
                    refetch={refetch}
                    descricao={{ value: descricao, set: setDescricao }}
                />
                <PrestadorGaleria
                    hasInfoLoaded={perfilEndpointLoaded}
                    prestador={prestador}
                    isOwnProfile={isOwnProfile}
                    refetch={refetch}
                    openCreateImageModal={() => setModalUrlGaleria(true)}
                />
                <PrestadorServicos
                    servicos={prestador?.servicos}
                    hasInfoLoaded={perfilEndpointLoaded}
                />
                {prestador?.avaliacoes?.[0] && (
                    <PrestadorAvaliacoes avaliacoes={prestador.avaliacoes} />
                )}
            </div>
        </>
    );
}
