import { useEffect, useState } from "react";
import Home from "./components/buttonConnect/button";
import MainContent from "./components/mainContent/mainContent";
import Navbar from "./components/navbar/navbar";
import './App.css'


export default function App() {
  return (
    <>
      <Navbar />
      <div className="app-main">
        <MainContent />
      </div>
    </>
  );
}
