import React from 'react';
import { Sparkles, Inbox, Calendar } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
}

const FeatureList: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary-400" />,
      title: "AI Idea Generator"
    },
    {
      icon: <Inbox className="w-6 h-6 text-primary-400" />,
      title: "Unified Inbox"
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary-400" />,
      title: "Scheduling Across 6 Platforms"
    }
  ];

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-primary-900/20 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="font-medium text-gray-200">{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;