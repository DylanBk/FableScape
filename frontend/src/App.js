import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

// import { Analytics } from "@vercel/analytics/react"

// --- PAGES ---
import Home from './components/pages/Home';
import Entry from './components/pages/Entry';
import StoryHub from './components/pages/StoryHub';
import Story from './components/pages/Story';
import Settings from './components/pages/Settings';


// --- MAIN ---

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hub" element={<StoryHub />} />
      <Route path="/play" element={<StoryHub />} />
      <Route path="/story" element={<Story />} />
      <Route path="/story/*" element={<Story />} />
      <Route path="/login" element={<Entry />} />
      <Route path="signup" element={<Entry />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;