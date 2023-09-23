import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import CadastroPrestador from "@/pages/CadastroPrestador";
import CasdastroContratante from "@/pages/CadastroContratante";
import Prestadores from "@/pages/Prestadores";
import Contato from "@/pages/Contato";
import AdmAprovacao from "@/pages/AdmAprovacao";
import AdmDashboard from "@/pages/AdmDashboard";
import AdmApiStatus from "@/pages/AdmApiStatus";
import PerfilVisaoContratanate from "@/pages/PerfilVisaoContratanate";
import PerfilVisaoPrestador from "@/pages/PerfilVisaoPrestador";
import Erro from "@/pages/Erro";
import UnderConstruction from "@/pages/UnderConstruction";
import VLibras from "@djpfs/react-vlibras";

export default () =>
	<>
		<VLibras forceOnload={true} />
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/cadastro/prestador" element={<CadastroPrestador />} />
				<Route path="/cadastro/contratante" element={<CasdastroContratante />} />
				<Route path="/prestadores" element={<Prestadores />} />
				<Route path="/prestadores/*" element={<PerfilVisaoContratanate />} />
				<Route path="/prestadores/eu/editar" element={<PerfilVisaoPrestador />} />
				<Route path="/contato" element={<Contato />} />
				<Route path="/adm/aprovacao" element={<AdmAprovacao />} />
				<Route path="/adm/dashboard" element={<AdmDashboard />} />
				<Route path="/adm/api" element={<AdmApiStatus />} />
				<Route path="/development" element={<UnderConstruction />} />
				<Route path="/*" element={<Erro />} />
			</Routes>
		</Router>
	</>
