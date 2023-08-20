import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CasdastroContratante from './pages/CadastroContratante';
import CadastroPrestador from './pages/CadastroPrestador';
import Login from './pages/Login';
import Home from './pages/Home'
import Prestadores from './pages/Prestadores'
import Erro from './pages/Erro'
import UnderConstruction from './pages/UnderConstruction';
import AdmAprovacao from './pages/AdmAprovacao';
import AdmDashboard from './pages/AdmDashboard';
import Contato from './pages/Contato';

function App() {

	return (
		<div className='overflow-x-hidden'>
			<Router>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/*' element={<Erro />}></Route>
					<Route path='/development' element={<UnderConstruction />}></Route>
					<Route path='/inicio' element={<Home />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/cadastroPrestador' element={<CadastroPrestador />}></Route>
					<Route path='/prestadores' element={<Prestadores />}></Route>
					<Route path='/cadastroContratante' element={<CasdastroContratante />}></Route>
					<Route path="adm/aprovacao" element={<AdmAprovacao />} />
					<Route path="adm/dashboard" element={<AdmDashboard />} />
					<Route path="/contato" element={<Contato/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App
