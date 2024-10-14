import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

// import { Analytics } from "@vercel/analytics/react"

// --- PAGES ---
import Home from './components/pages/Home';
import Entry from './components/pages/Entry';
import StoryHub from './components/pages/StoryHub';
import Settings from './components/pages/Settings';


// --- MAIN ---
const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [setMessage] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/`)
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