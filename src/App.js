import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <Hero />

      <main className="site-main">
        <Timeline />
        <Gallery />
      </main>

      <footer className="site-footer">
        <p>Digital memory • A love story • A surprise gift</p>
      </footer>
    </div>
  );
}

export default App;
