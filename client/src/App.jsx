import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import CadastroPrestador from "@/pages/CadastroPrestador";
import CasdastroContratante from "@/pages/CadastroContratante";
import Prestadores from "@/pages/Prestadores";
import Contato from "@/pages/Contato";
import AdmAprovacao from "@/pages/AdmAprovacao";
import AdmDashboard from "@/pages/AdmDashboard";

import Erro from "@/pages/Erro";
import UnderConstruction from "@/pages/UnderConstruction";

export default function App(props) {
	return (
		<div className="overflow-x-hidden">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/inicio" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cadastroPrestador" element={<CadastroPrestador />} />
					<Route path="/cadastroContratante" element={<CasdastroContratante />} />
					<Route path="/prestadores" element={<Prestadores />} />
					<Route path="/contato" element={<Contato/>} />
					<Route path="/adm/aprovacao" element={<AdmAprovacao />} />
					<Route path="/adm/dashboard" element={<AdmDashboard />} />
					<Route path="/development" element={<UnderConstruction />} />
					<Route path="/*" element={<Erro />} />
				</Routes>
			</Router>
		</div>
	);
}
