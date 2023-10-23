import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import { CreateContext, useData } from "@/data/CreateContext";
import { useEffect } from "react";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import CadastroPrestador from "@/pages/CadastroPrestador";
import CadastroContratante from "@/pages/CadastroContratante";
import CadastroPlanos from "@/pages/CadastroPlanos";
import Prestadores from "@/pages/Prestadores";
import Contato from "@/pages/Contato";
import Historico from "@/pages/Historico";
import AdmAprovacao from "@/pages/AdmAprovacao";
import AdmDashboard from "@/pages/AdmDashboard";
import AdmApiStatus from "@/pages/AdmApiStatus";
import Perfil from "@/pages/Perfil";
import Erro from "@/pages/Erro";
import UnderConstruction from "@/pages/UnderConstruction";
import VLibras from "@djpfs/react-vlibras";
import Dashboard from "@/pages/Dashboard";

const App = () => {
    const { setWindowWidth } = useData();

    useEffect(() => {
        window.addEventListener("resize", (e) => {
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
