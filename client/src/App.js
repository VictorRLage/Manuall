import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CasdastroContratante from './pages/CadastroContratante';
import Login from './pages/Login';
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path='/home' element={<Home />}></Route>
          <Route path='/cadastroContratante' element={<CasdastroContratante />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
