import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import Invoice  from './components/Invoice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
