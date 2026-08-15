import { SkipLink } from './components/SkipLink/SkipLink';
import { Header } from './components/Header/Header';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { Footer } from './components/Footer/Footer';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Skills } from './sections/Skills/Skills';
import { Experience } from './sections/Experience/Experience';
import { Projects } from './sections/Projects/Projects';
import { Education } from './sections/Education/Education';
import { Contact } from './sections/Contact/Contact';
import { useCommandPalette } from './hooks/useCommandPalette';

function App() {
  const palette = useCommandPalette();

  return (
    <>
      <SkipLink />
      <Header onOpenPalette={palette.open} />
      <CommandPalette isOpen={palette.isOpen} onClose={palette.close} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
