import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      <footer className="py-8 bg-slate-50 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Portfolio. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

export default App;
