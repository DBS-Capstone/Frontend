import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import RecordSection from "./components/RecordSection";
import ResultsSection from "./components/ResultsSection";
import BirdpediaSection from "./components/BirdpediaSection";
import AboutSection from "./components/AboutSection";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen w-full">
        <Navbar /> {/* Navbar ada di semua halaman */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeSection />
                <RecordSection />
              </>
            }
          />
          <Route path="/results" element={<ResultsSection />} />
          <Route path="/birdpedia" element={<BirdpediaSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/birdpedia/:birdName" element={<BirdpediaSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;