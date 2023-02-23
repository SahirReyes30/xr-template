import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Intro from "../src/Scenes/Intro.js"
import Tema_1_figuras from "C:/Users/Sahir Reyes/Desktop/MCC/Semestre 2/Temas selectos/Tarea/xr-template/src/Scenes/Tema_1_Figuras.js"
import Tema_1_Tarea from "C:/Users/Sahir Reyes/Desktop/MCC/Semestre 2/Temas selectos/Tarea/xr-template/src/Scenes/Tarea_1/Tema_1_Tarea.js"

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<Intro/>}></Route>
          <Route path='/tema_1' element={<Tema_1_figuras/>}></Route>
          <Route path='/tarea_1' element={<Tema_1_Tarea/>}></Route>
      </Routes>
    </Router>
)}

export default App;
