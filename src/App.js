import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from './Components/Weather';
import Forecast from './Components/Forecast';
import Search from './Components/Search';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
