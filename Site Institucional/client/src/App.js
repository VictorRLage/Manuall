import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Time from './Pages/Time'
import Contato from './Pages/Contato'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/time' element={<Time />} />
        <Route path='/contato' element={<Contato />} />
      </Routes>
    </Router>
  );
}

export default App;
