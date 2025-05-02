import React from 'react';
import Hero from './components/Hero';
import EmailForm from './components/EmailForm';
import FeatureList from './components/FeatureList';
import Footer from './components/Footer';
import { SparklesCore } from './components/ui/sparkles';
import './styles/animations.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <main className="flex-grow flex flex-col relative">
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#8B5CF6"
            speed={1}
          />
        </div>
        <div className="bg-gradient-to-b from-primary-900/20 to-slate-950 pt-20 pb-16 relative z-10">
          <Hero 
            title="Manage every social channel in one place."
            subtitle="Get AI-powered workflows before everyone else."
            badge="20% OFF for your first 3 months – limited to early adopters."
          />
          
          <div className="max-w-4xl mx-auto px-4 mt-12">
            <EmailForm />
          </div>
        </div>
        
        <FeatureList />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;