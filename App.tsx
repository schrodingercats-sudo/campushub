import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WorkShowcase } from './components/WorkShowcase';
import { RecentWorks } from './components/RecentWorks';
import { Team } from './components/Team';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <WorkShowcase />
        <RecentWorks />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;