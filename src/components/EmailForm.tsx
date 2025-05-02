import React, { useState } from 'react';
import { submitEmail } from '../utils/supabase';
import { Loader2 } from 'lucide-react';

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'duplicate' | 'error' | 'invalid'>('idle');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) return;
    
    setIsLoading(true);
    
    try {
      const result = await submitEmail(email);
      
      if (result.success) {
        setStatus('success');
        setEmail('');
      } else if (result.duplicate) {
        setStatus('duplicate');
      } else if (result.error === 'Invalid email domain') {
        setStatus('invalid');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Render appropriate content based on status
  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <div className="success-message py-8 text-center animate-fade-in">
            <div className="confetti-container overflow-hidden h-12 mb-4 relative">
              <div className="confetti-left"></div>
              <div className="confetti-middle"></div>
              <div className="confetti-right"></div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary-400">🎉 Almost there!</h3>
            <p className="text-gray-300">Please check your inbox to verify your email address.</p>
          </div>
        );
      
      case 'duplicate':
        return (
          <div className="duplicate-message py-8 text-center animate-fade-in">
            <h3 className="text-xl font-bold mb-2 text-primary-400">Looks like you're already on the list ✔️</h3>
            <p className="text-gray-300">We'll be in touch soon with your early access details.</p>
          </div>
        );

      case 'invalid':
        return (
          <div className="error-message text-center py-8 animate-fade-in">
            <h3 className="text-xl font-bold mb-2 text-red-400">Invalid Email Domain</h3>
            <p className="text-gray-300 mb-4">Please enter a valid email address.</p>
            <button 
              className="text-primary-400 underline font-medium"
              onClick={() => setStatus('idle')}
            >
              Try again
            </button>
          </div>
        );
      
      case 'error':
        return (
          <div className="error-message text-center py-8 animate-fade-in">
            <h3 className="text-xl font-bold mb-2 text-red-400">Hmm, something went wrong</h3>
            <p className="text-gray-300 mb-4">Please try again or contact support.</p>
            <button 
              className="text-primary-400 underline font-medium"
              onClick={() => setStatus('idle')}
            >
              Try again
            </button>
          </div>
        );
      
      default:
        return (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-14 px-4 rounded-xl bg-gray-800/50 text-white relative border-2 border-primary-400/20 focus:border-primary-400 transition-all duration-200 animate-border-glow"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!isValidEmail || isLoading}
                className={`h-14 px-6 rounded-xl font-medium flex items-center justify-center transition-all duration-200 border-2 animate-border-glow ${
                  isValidEmail && !isLoading
                    ? 'bg-primary-500/20 border-primary-400/20 text-white hover:bg-primary-500/30 hover:border-primary-400'
                    : 'bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Get Early Access'
                )}
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default EmailForm;