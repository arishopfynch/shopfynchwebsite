import React, { useState } from 'react';
import { Check, ShoppingCart, BarChart3, Users, Zap, Settings, MessageSquare, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 99,
    revenue: 'Under $25k',
    icon: ShoppingCart,
    features: [
      'Basic cart sharing',
      'Limited voting options',
      'Top 3 shared products analytics',
      'Total votes summary',
      'Basic email support (48h)',
    ],
  },
  {
    name: 'Growth',
    price: 199,
    revenue: '$25k - $50k',
    icon: BarChart3,
    features: [
      'Enhanced sharing options',
      'Increased sharing caps',
      'Top 5 products analytics',
      'Cart views tracking',
      'Basic branding customization',
      'Priority email support (24h)',
    ],
  },
  {
    name: 'Scale',
    price: 299,
    revenue: '$50k - $100k',
    popular: true,
    icon: Users,
    features: [
      'Unlimited cart sharing',
      'Split payment coordination',
      'Multi-address shipping',
      'Advanced analytics dashboard',
      'Full branding customization',
      'API access',
      '24/7 dedicated support',
    ],
  },
  {
    name: 'Enterprise',
    price: '499+',
    revenue: 'Over $100k',
    icon: Zap,
    features: [
      'Custom integrations',
      'Unlimited recipients',
      'Multi-user engagement',
      'Custom reporting',
      'Full API access',
      'Multi-brand management',
      'Quarterly reviews',
      'Dedicated success team',
    ],
  },
];

const featureComparison = [
  {
    category: 'Sharing Features',
    features: [
      {
        name: 'Cart Sharing',
        starter: 'Basic',
        growth: 'Enhanced',
        scale: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        name: 'Voting Options',
        starter: 'Limited',
        growth: 'Enhanced',
        scale: 'Full',
        enterprise: 'Custom',
      },
      {
        name: 'Recipients',
        starter: '5 per cart',
        growth: '15 per cart',
        scale: 'Unlimited',
        enterprise: 'Unlimited',
      },
    ],
  },
  {
    category: 'Analytics',
    features: [
      {
        name: 'Shared Products Tracking',
        starter: 'Top 3',
        growth: 'Top 5',
        scale: 'All Products',
        enterprise: 'Custom Reports',
      },
      {
        name: 'Conversion Tracking',
        starter: 'Basic',
        growth: 'Enhanced',
        scale: 'Advanced',
        enterprise: 'Custom',
      },
      {
        name: 'Revenue Attribution',
        starter: '✓',
        growth: '✓',
        scale: '✓',
        enterprise: '✓',
      },
    ],
  },
  {
    category: 'Customization',
    features: [
      {
        name: 'Branding',
        starter: '✕',
        growth: 'Basic',
        scale: 'Full',
        enterprise: 'Custom',
      },
      {
        name: 'API Access',
        starter: '✕',
        growth: '✕',
        scale: '✓',
        enterprise: 'Full',
      },
      {
        name: 'Custom Integration',
        starter: '✕',
        growth: '✕',
        scale: 'Limited',
        enterprise: '✓',
      },
    ],
  },
  {
    category: 'Support',
    features: [
      {
        name: 'Response Time',
        starter: '48 hours',
        growth: '24 hours',
        scale: '24/7',
        enterprise: 'Priority 24/7',
      },
      {
        name: 'Account Manager',
        starter: '✕',
        growth: '✕',
        scale: '✓',
        enterprise: 'Dedicated Team',
      },
      {
        name: 'Performance Reviews',
        starter: '✕',
        growth: '✕',
        scale: 'Monthly',
        enterprise: 'Weekly',
      },
    ],
  },
];

export default function Pricing() {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008080' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#351431] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Scale your social shopping experience as your brand grows
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E9FFF9] rounded-full">
            <Sparkles className="h-5 w-5 text-[#008080]" />
            <span className="text-sm font-medium text-[#008080]">
              Beta Users Get 3 Months Free on All Plans
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative group rounded-2xl p-6 transition-all duration-300 ${
                tier.popular
                  ? 'bg-[#008080] text-white shadow-xl shadow-[#008080]/20 scale-105'
                  : 'bg-white hover:shadow-xl border border-gray-100'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#E9FFF9] text-[#008080] px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className={`p-3 rounded-xl inline-flex ${
                tier.popular ? 'bg-white/10' : 'bg-[#E9FFF9]'
              }`}>
                <tier.icon className={`h-6 w-6 ${
                  tier.popular ? 'text-white' : 'text-[#008080]'
                }`} />
              </div>

              <h3 className={`text-xl font-bold mt-4 ${
                tier.popular ? 'text-white' : 'text-[#351431]'
              }`}>
                {tier.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${
                  tier.popular ? 'text-white' : 'text-[#351431]'
                }`}>
                  ${tier.price}
                </span>
                <span className={`text-sm ${
                  tier.popular ? 'text-white/80' : 'text-gray-500'
                }`}>
                  /mo
                </span>
              </div>

              <p className={`text-sm mt-1 ${
                tier.popular ? 'text-white/80' : 'text-gray-500'
              }`}>
                {tier.revenue} monthly revenue
              </p>

              <hr className={`my-4 ${
                tier.popular ? 'border-white/20' : 'border-gray-100'
              }`} />

              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 flex-shrink-0 ${
                      tier.popular ? 'text-white' : 'text-[#008080]'
                    }`} />
                    <span className={`text-sm ${
                      tier.popular ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full mt-6 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                tier.popular
                  ? 'bg-white text-[#008080] hover:bg-[#E9FFF9]'
                  : 'bg-[#008080] text-white hover:bg-[#006666]'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center">
          <button
            onClick={() => setIsComparisonOpen(!isComparisonOpen)}
            className="flex items-center gap-2 px-6 py-3 bg-[#E9FFF9] text-[#008080] rounded-lg font-medium hover:bg-[#E9FFF9]/80 transition-colors"
          >
            {isComparisonOpen ? (
              <>
                <ChevronUp className="h-5 w-5" />
                Hide Detailed Comparison
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5" />
                Compare All Features
              </>
            )}
          </button>

          {isComparisonOpen && (
            <div className="mt-8 w-full max-w-7xl overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-500">Features</th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-[#351431]">Starter</th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-[#351431]">Growth</th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-[#351431]">Scale</th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-[#351431]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="py-3 px-4 text-sm font-medium text-[#008080]">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm text-gray-600">{feature.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-800">{feature.starter}</td>
                          <td className="py-3 px-4 text-sm text-gray-800">{feature.growth}</td>
                          <td className="py-3 px-4 text-sm text-gray-800">{feature.scale}</td>
                          <td className="py-3 px-4 text-sm text-gray-800">{feature.enterprise}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            All plans include our beta program benefits. Prices shown are regular rates after the 3-month free trial.
          </p>
        </div>
      </div>
    </section>
  );
}