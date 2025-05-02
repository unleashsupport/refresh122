import React from 'react';
import { Sparkles } from 'lucide-react';

type HeroProps = {
  title: string;
  subtitle: string;
  badge: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, badge }) => {
  return (
    <div className="text-center px-4 md:px-8 max-w-4xl mx-auto">
      <div className="mb-4 flex justify-center">
        <div className="flex items-center gap-2 text-2xl font-bold text-primary-400">
          <Sparkles className="w-6 h-6" />
          <span>Serge</span>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white">
        {title}
      </h1>
      
      <p className="text-xl md:text-2xl mb-6 text-gray-300">
        {subtitle}
      </p>
      
      <div className="inline-block bg-primary-900/30 text-primary-200 px-4 py-2 rounded-full text-sm md:text-base font-medium mb-8 border border-primary-700">
        <Sparkles className="inline-block w-4 h-4 mr-1 text-primary-400" />
        {badge}
      </div>
    </div>
  );
};

export default Hero;