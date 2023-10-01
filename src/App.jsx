import {  HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import CoinPage from './components/CoinPage';

function App() {
  return (
    
    <HashRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route exact path='/coins/:id' Component={CoinPage}/>
    </Routes>
    </HashRouter>
    
  );
}

export default App;
