import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CasdastroContratante from './Pages/CadastroContratante';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/CadastroContratante' element={<CasdastroContratante />}></Route>
          <Route path='/Login' element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
