import { CreateContext, useData } from "@/data/CreateContext";
import AdmApiStatus from "@/pages/AdmApiStatus";
import AdmAprovacao from "@/pages/AdmAprovacao";
import AdmDashboard from "@/pages/AdmDashboard";
import CadastroContratante from "@/pages/CadastroContratante";
import CadastroPlanos from "@/pages/CadastroPlanos";
import CadastroPrestador from "@/pages/CadastroPrestador";
import Contato from "@/pages/Contato";
import Dashboard from "@/pages/Dashboard";
import Erro from "@/pages/Erro";
import Historico from "@/pages/Historico";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Perfil from "@/pages/Perfil";
import Prestadores from "@/pages/Prestadores";
import UnderConstruction from "@/pages/UnderConstruction";
import VLibras from "@djpfs/react-vlibras";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
    const { setWindowWidth } = useData();

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    return (
        <>
            <VLibras forceOnload={true} />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/cadastro/prestador"
                        element={<CadastroPrestador />}
                    />
                    <Route
                        path="/cadastro/prestador/planos"
                        element={<CadastroPlanos />}
                    />
                    <Route
                        path="/cadastro/contratante"
                        element={<CadastroContratante />}
                    />
                    <Route path="/prestadores" element={<Prestadores />} />
                    <Route
                        path="/perfil/*"
                        element={<Perfil isOwnProfile={false} key={1} />}
                    />
                    <Route
                        path="/perfil"
                        element={<Perfil isOwnProfile={true} key={2} />}
                    />
                    <Route path="/contato" element={<Contato />} />
                    <Route
                        path="/contratante/historico"
                        element={<Historico />}
                    />
                    <Route path="/adm/aprovacao" element={<AdmAprovacao />} />
                    <Route path="/adm/dashboard" element={<AdmDashboard />} />
                    <Route path="/adm/api" element={<AdmApiStatus />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/development"
                        element={<UnderConstruction />}
                    />
                    <Route path="/*" element={<Erro />} />
                </Routes>
            </Router>
        </>
    );
};

export default function AppWrapper() {
    return (
        <CreateContext>
            <App />
        </CreateContext>
    );
}
