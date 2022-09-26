import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotFoundBlock from './components/NotFoundBlock';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;