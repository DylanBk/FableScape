import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// --- PAGES ---
import Home from './components/pages/Home';
import Entry from './components/pages/Entry';
import StoryHub from './components/pages/StoryHub';
import Settings from './components/pages/Settings';


// --- MAIN ---

function App() {
  const [setMessage] = useState('');

  useEffect(() => {
    fetch('/')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error(`Error: ${error}`));
  })

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hub" element={<StoryHub />} />
      <Route path="/play" element={<StoryHub />} />
      <Route path="/login" element={<Entry />} />
      <Route path="signup" element={<Entry />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;