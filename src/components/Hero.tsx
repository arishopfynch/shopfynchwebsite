import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  const [signupCount, setSignupCount] = useState(22);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setSignupCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/mkgnbpne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          submittedAt: new Date().toISOString(),
          source: window.location.href,
          type: 'beta-signup',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '' });
        setSignupCount(prev => prev + 1);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12 lg:pt-0 lg:pb-0">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(
              180deg, 
              #008080 0%,
              #351431 80%,
              #351431 100%
            )
          `,
          backgroundSize: '200% 200%',
          animation: 'gradient-flow 15s ease infinite'
        }}
      />
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          transform: 'rotate(15deg) scale(1.5)',
          animation: 'float 30s linear infinite'
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Boost Sales with{' '}
              <span className="bg-gradient-to-r from-[#E9FFF9] via-white to-[#E9FFF9] text-transparent bg-clip-text animate-gradient-x relative group">
                Social Cart Sharing
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E9FFF9] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Empower your customers to share, engage, and buy with confidence—while you boost sales and build community.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="stats-card bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-[#008080] mb-2">21%</div>
                <p className="text-sm sm:text-base text-white/80">Average increase in conversion rates</p>
              </div>
              <div className="stats-card bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-[#008080] mb-2">4x</div>
                <p className="text-sm sm:text-base text-white/80">More likely to complete purchase</p>
              </div>
            </div>
          </div>

          <div className="slide-up mt-8 lg:mt-0">
            <div className="signup-form bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 transition-all duration-500 max-w-md mx-auto lg:max-w-none">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Logo className="h-8 w-8 text-white animate-float" />
                  <span className="text-2xl font-bold text-white">Fynch</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-white/90">{signupCount} beta users</span>
                </div>
              </div>
              
              <p className="text-[#E9FFF9] text-sm mb-6">Compatible with all Shopify stores—no coding required!</p>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 text-[#E9FFF9]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">Thanks for joining! We'll be in touch soon.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#E9FFF9] focus:border-transparent transition-all"
                        disabled={submitting}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#E9FFF9] focus:border-transparent transition-all"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Work Email"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#E9FFF9] focus:border-transparent transition-all"
                      disabled={submitting}
                    />
                  </div>
                  {error && (
                    <p className="text-red-300 text-sm">{error}</p>
                  )}
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-4 h-4 text-[#E9FFF9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Get 3 Months Free. Plans Start at Just $99/Month After.</span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full bg-[#E9FFF9] text-[#008080] px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-white transition-all duration-300 disabled:opacity-70"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Join the beta!
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="space-y-4 text-white/60 text-sm">
                    <p className="text-center">
                      Limited spots available. No credit card required.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Early access to all features
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Priority support & onboarding
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Exclusive beta pricing
                      </li>
                    </ul>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}