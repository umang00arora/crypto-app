import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import CoinPage from './components/CoinPage';

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route exact path='/coins/:id' Component={CoinPage}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
