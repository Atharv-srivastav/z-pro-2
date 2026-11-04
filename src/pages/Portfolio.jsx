import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';

export default function Portfolio({ setActiveView }) {
  return (
    <main>
      <Hero onNavigate={setActiveView} />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects setActiveView={setActiveView} />
      <Certifications />
      <Contact setActiveView={setActiveView} />
    </main>
  );
}
