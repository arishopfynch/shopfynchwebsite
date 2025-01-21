import React, { useState } from 'react';
import { ShoppingCart, Users, Share2, BarChart3, Gift, ThumbsUp, ShoppingBag, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';
import SocialCartDemo from './demos/SocialCartDemo';
import AnalyticsDemo from './demos/AnalyticsDemo';

type Tab = 'social' | 'analytics';

const tabData = {
  social: {
    title: 'Social Cart Experience',
    description: 'See how customers share carts and collaborate on purchases',
    stats: [
      {
        icon: Share2,
        value: '4x',
        label: 'More Likely to Purchase',
      },
      {
        icon: Users,
        value: '2x',
        label: 'New Customers per Share',
      },
      {
        icon: ShoppingBag,
        value: '+45%',
        label: 'Cart Value Increase',
      },
    ],
    benefits: [
      {
        icon: ThumbsUp,
        title: 'Social Proof at Scale',
        description: 'Build trust through friend recommendations and social validation',
      },
      {
        icon: ShoppingCart,
        title: 'Simplified Group Buying',
        description: 'Enable seamless checkout-on-behalf for gifts and group purchases',
      },
      {
        icon: Users,
        title: 'Community Building',
        description: 'Create a network effect that drives organic growth',
      },
    ],
  },
  analytics: {
    title: 'Real-Time Analytics Dashboard',
    description: 'Track engagement, conversion, and sharing metrics in real-time',
    stats: [
      {
        icon: TrendingUp,
        value: '24%',
        label: 'Conversion Increase',
      },
      {
        icon: DollarSign,
        value: '1.8x',
        label: 'ROI Multiplier',
      },
      {
        icon: BarChart2,
        value: '100%',
        label: 'Data Visibility',
      },
    ],
    benefits: [
      {
        icon: BarChart2,
        title: 'Data-Driven Decisions',
        description: 'Make informed choices based on real-time customer behavior',
      },
      {
        icon: TrendingUp,
        title: 'Growth Analytics',
        description: 'Track the viral coefficient of your shared carts',
      },
      {
        icon: Share2,
        title: 'Attribution Insights',
        description: 'Understand your most valuable sharing channels',
      },
    ],
  },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('social');
  const currentData = tabData[activeTab];

  return (
    <section className="py-12 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#351431] mb-3">
            Experience Fynch in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how Fynch transforms the shopping experience
          </p>
        </div>

        {/* Mobile Portrait Layout */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex gap-2 sticky top-0 z-10 bg-white pt-2 pb-4">
            <button
              onClick={() => setActiveTab('social')}
              className={`flex-1 py-2.5 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeTab === 'social'
                  ? 'bg-[#008080] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Social Cart
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-2.5 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                activeTab === 'analytics'
                  ? 'bg-[#008080] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            {currentData.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <stat.icon className="h-4 w-4 text-[#008080]" />
                  <span className={`text-xs font-medium ${stat.value.includes('+') ? 'text-green-500' : 'text-[#008080]'}`}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Demo Area */}
          <div className="bg-[#E9FFF9] rounded-xl p-3">
            <div className="bg-white rounded-lg shadow-lg p-3">
              <h3 className="text-lg font-semibold text-[#351431] mb-2">
                {currentData.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {currentData.description}
              </p>
              <div className="min-h-[400px] bg-gray-50 rounded-lg">
                {activeTab === 'social' ? <SocialCartDemo /> : <AnalyticsDemo />}
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-white rounded-lg p-4 shadow-md space-y-4">
            <h3 className="text-lg font-semibold text-[#351431]">
              Key Benefits
            </h3>
            <div className="space-y-3">
              {currentData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#E9FFF9] flex-shrink-0">
                    <benefit.icon className="h-4 w-4 text-[#008080]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#351431] text-sm">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-2 gap-8">
          {/* Left Column - Demo Tabs */}
          <div className="bg-[#E9FFF9] rounded-xl p-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('social')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'social'
                    ? 'bg-[#008080] text-white shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white/80'
                }`}
              >
                Social Cart
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'analytics'
                    ? 'bg-[#008080] text-white shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white/80'
                }`}
              >
                Analytics
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="h-full flex flex-col">
                <h3 className="text-xl font-semibold text-[#351431] mb-2">
                  {currentData.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentData.description}
                </p>
                <div className="flex-1 rounded-lg">
                  {activeTab === 'social' ? <SocialCartDemo /> : <AnalyticsDemo />}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Benefits */}
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {currentData.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-[#008080]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-5 w-5 text-[#008080]" />
                    <span className={`text-sm font-medium ${stat.value.includes('+') ? 'text-green-500' : 'text-[#008080]'}`}>
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="bg-white rounded-lg p-6 shadow-md space-y-6">
              <h3 className="text-xl font-semibold text-[#351431]">
                Key Benefits
              </h3>
              <div className="space-y-4">
                {currentData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#E9FFF9]">
                      <benefit.icon className="h-6 w-6 text-[#008080]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#351431]">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}