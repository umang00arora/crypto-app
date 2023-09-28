import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import CoinDetails from './components/CoinDetails';

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route exact path='/coins/:id' element={<CoinDetails/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
