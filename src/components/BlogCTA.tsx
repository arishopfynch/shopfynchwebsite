import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface BlogCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export default function BlogCTA({ 
  title = 'Join Our Beta Program',
  description = 'Get early access and transform your e-commerce experience with our social shopping features.',
  buttonText = 'Join Beta',
  className = ''
}: BlogCTAProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xwppwddw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          submittedAt: new Date().toISOString(),
          source: window.location.href,
          type: 'blog-bottom-cta',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-[#E9FFF9] rounded-xl p-6 sm:p-8 ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-[#351431] mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        {submitted ? (
          <div className="text-[#008080] font-medium">
            Thanks for joining! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#008080] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#006666] transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}