import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CasdastroContratante from './pages/CadastroContratante';
import CadastroPrestador from './pages/CadastroPrestador';
import Login from './pages/Login';
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/cadastroPrestador' element={<CadastroPrestador />}></Route>
          <Route path='/cadastroContratante' element={<CasdastroContratante />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
