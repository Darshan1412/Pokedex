import React from "react";
import Navbar from "./sections/Navbar";
import Wrapper from "./sections/Wrapper";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import "./scss/index.scss";
import Search from "./pages/Search";
import MyList from "./pages/MyList";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";

function App() {
  return  <div className="main-container">
    <Background />
    <BrowserRouter >
    <div className="app">
      <Navbar />
      <Routes>
        <Route element={<Search />} path="/search" />
        <Route element={<MyList />} path="/list" />
        <Route element={<About />} path="/about" />
        <Route element={<Compare />} path="/compare" />
        <Route element={<Pokemon />} path="/pokemon/:id" />
        <Route element={<Navigate  to="/pokemon/1" />} path="*" />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
  </div>
}

export default App