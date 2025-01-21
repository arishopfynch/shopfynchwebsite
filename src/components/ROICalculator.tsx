import React, { useState } from 'react';
import { Calculator, DollarSign, Users, TrendingUp, ShoppingCart, X, Mail } from 'lucide-react';

type InputMetrics = {
  monthlyTraffic: number;
  conversionRate: number;
  aov: number;
  cac: number;
};

type ProjectedMetrics = {
  revenueIncrease: number;
  cacSavings: number;
  newCustomers: number;
  roi: number;
};

export default function ROICalculator() {
  const [metrics, setMetrics] = useState<InputMetrics>({
    monthlyTraffic: 10000,
    conversionRate: 2.5,
    aov: 85,
    cac: 25,
  });

  const [projected, setProjected] = useState<ProjectedMetrics | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(true);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [calculatedMetrics, setCalculatedMetrics] = useState<ProjectedMetrics | null>(null);

  const handleInputChange = (key: keyof InputMetrics, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMetrics(prev => ({ ...prev, [key]: numValue }));
  };

  const calculateProjections = (inputs: InputMetrics) => {
    // Current metrics
    const currentCustomers = (inputs.monthlyTraffic * (inputs.conversionRate / 100));
    const currentRevenue = currentCustomers * inputs.aov;
    
    // Projected improvements
    const newConversionRate = inputs.conversionRate * 1.21; // 21% increase
    const newTraffic = inputs.monthlyTraffic * 1.27; // 27% increase
    const newAOV = inputs.aov * 1.44; // 44% increase
    
    // Calculate new metrics
    const newCustomers = (newTraffic * (newConversionRate / 100));
    const newRevenue = newCustomers * newAOV;
    
    // Calculate improvements
    const revenueIncrease = newRevenue - currentRevenue;
    const additionalCustomers = newCustomers - currentCustomers;
    const cacSavings = (additionalCustomers * inputs.cac) * 0.3; // 30% from referrals
    const roi = ((revenueIncrease + cacSavings) / (inputs.cac * currentCustomers)) * 100;

    return {
      revenueIncrease,
      cacSavings,
      newCustomers: additionalCustomers,
      roi,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = calculateProjections(metrics);
    setCalculatedMetrics(results);
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitting(true);
    setEmailError('');

    try {
      const response = await fetch('https://formspree.io/f/meoqrobn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subscribeToUpdates,
          metrics,
          calculatedMetrics,
          submittedAt: new Date().toISOString(),
          source: window.location.href,
          type: 'roi-calculator',
        }),
      });

      if (response.ok) {
        setProjected(calculatedMetrics);
        setShowEmailModal(false);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <section id="roi-calculator" className="py-16 sm:py-24 bg-[#E9FFF9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-[#008080]" />
              <h3 className="text-lg sm:text-xl font-semibold text-[#351431]">Your Current Metrics</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {[
                {
                  key: 'monthlyTraffic',
                  label: 'Monthly Traffic',
                  icon: Users,
                  prefix: '',
                  value: metrics.monthlyTraffic,
                  placeholder: '10,000',
                },
                {
                  key: 'conversionRate',
                  label: 'Conversion Rate (%)',
                  icon: TrendingUp,
                  prefix: '%',
                  value: metrics.conversionRate,
                  placeholder: '2.5',
                },
                {
                  key: 'aov',
                  label: 'Average Order Value',
                  icon: ShoppingCart,
                  prefix: '$',
                  value: metrics.aov,
                  placeholder: '85',
                },
                {
                  key: 'cac',
                  label: 'Customer Acquisition Cost',
                  icon: DollarSign,
                  prefix: '$',
                  value: metrics.cac,
                  placeholder: '25',
                },
              ].map(({ key, label, icon: Icon, prefix, value, placeholder }) => (
                <div key={key} className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-[#008080] transition-colors" />
                    </div>
                    <input
                      type="number"
                      value={value || ''}
                      onChange={(e) => handleInputChange(key as keyof InputMetrics, e.target.value)}
                      className="block w-full pl-10 pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder={placeholder}
                      required
                    />
                    {prefix && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm sm:text-base">{prefix}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-[#008080] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006666] transition-all duration-300"
              >
                Calculate ROI
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-6 sm:space-y-8">
            {projected ? (
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-[#351431] mb-6">
                  Projected Impact with Fynch
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    {
                      label: 'Monthly Revenue Increase',
                      value: projected.revenueIncrease,
                      format: (v: number) => `$${Math.round(v).toLocaleString()}`,
                      icon: DollarSign,
                      color: 'bg-green-50',
                      iconColor: 'text-green-600',
                      description: '+44% Average Order Value',
                    },
                    {
                      label: 'CAC Savings',
                      value: projected.cacSavings,
                      format: (v: number) => `$${Math.round(v).toLocaleString()}`,
                      icon: TrendingUp,
                      color: 'bg-blue-50',
                      iconColor: 'text-blue-600',
                      description: '30% from referrals',
                    },
                    {
                      label: 'New Customers/Month',
                      value: projected.newCustomers,
                      format: (v: number) => Math.round(v).toLocaleString(),
                      icon: Users,
                      color: 'bg-purple-50',
                      iconColor: 'text-purple-600',
                      description: '+27% traffic increase',
                    },
                    {
                      label: 'ROI',
                      value: projected.roi,
                      format: (v: number) => `${Math.round(v)}%`,
                      icon: Calculator,
                      color: 'bg-orange-50',
                      iconColor: 'text-orange-600',
                      description: 'Average return on investment',
                    },
                  ].map(({ label, value, format, icon: Icon, color, iconColor, description }) => (
                    <div 
                      key={label} 
                      className={`${color} rounded-lg p-4 sm:p-5 group hover:shadow-md transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} />
                        <span className="text-sm font-medium text-gray-600">{label}</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-[#351431] mb-1">
                        {format(value)}
                      </p>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg flex flex-col items-center justify-center min-h-[300px] text-center">
                <Calculator className="h-12 w-12 text-[#008080] mb-4" />
                <h3 className="text-lg font-semibold text-[#351431] mb-2">
                  Enter Your Metrics
                </h3>
                <p className="text-gray-600">
                  Fill in your current metrics and click "Calculate ROI" to see your projected results with Fynch.
                </p>
              </div>
            )}

            <div className="bg-[#008080]/10 rounded-xl p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-[#008080]/20 flex-shrink-0">
                  <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-[#008080]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#008080] mb-1 text-sm sm:text-base">
                    How we calculate this
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Based on aggregated data from our existing partners, we project:
                    21% increase in conversion rates, 27% more traffic through referrals,
                    and 44% higher AOV through social proof and group buying.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 italic">
                    Results are estimates based on your inputs and industry averages. Actual outcomes may vary. Use this tool for informational purposes only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full relative animate-fade-in">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E9FFF9] rounded-full mb-4">
                <Mail className="h-6 w-6 text-[#008080]" />
              </div>
              <h3 className="text-xl font-bold text-[#351431] mb-2">
                Get Your ROI Analysis
              </h3>
              <p className="text-gray-600">
                Enter your email to receive your detailed ROI analysis and see your projected results.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
                />
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={subscribeToUpdates}
                  onChange={(e) => setSubscribeToUpdates(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-600">
                  Keep me updated with insights and tips to improve my e-commerce performance
                </span>
              </label>

              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}

              <button
                type="submit"
                disabled={emailSubmitting}
                className="w-full bg-[#008080] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006666] transition-all duration-300 disabled:opacity-70"
              >
                {emailSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Show My Results'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}