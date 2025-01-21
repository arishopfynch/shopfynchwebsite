import React from 'react';
import { TrendingUp, Users, BarChart3, ShoppingCart } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Trust Through Friends',
    description: 'Shoppers are 77% more likely to buy when recommended by friends or family',
    stat: '77%',
    source: 'Nielsen',
  },
  {
    icon: TrendingUp,
    title: 'Higher Conversions',
    description: 'Social elements like cart sharing increase conversion rates by up to 21%',
    stat: '+21%',
    source: 'Baymard Institute',
  },
  {
    icon: BarChart3,
    title: 'Increased Order Value',
    description: 'Collaborative shopping drives a 44% increase in average order value',
    stat: '+44%',
    source: 'eMarketer',
  },
  {
    icon: ShoppingCart,
    title: 'Social Decision Making',
    description: '82% of online shoppers seek recommendations before purchasing',
    stat: '82%',
    source: 'SurveyMonkey',
  },
];

export default function Benefits() {
  return (
    <section className="relative py-24 bg-[#351431]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23E9FFF9" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 30s linear infinite',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Insights that Drive Growth
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Proven results that transform how customers interact with your brand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-500 backdrop-blur-sm hover:transform hover:scale-105"
              style={{
                animation: `slideUp 0.5s ease-out forwards ${index * 0.1}s`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#E9FFF9]/10 group-hover:bg-[#E9FFF9]/20 transition-colors">
                  <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#E9FFF9]" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-[#008080] group-hover:scale-110 transition-transform">
                  {benefit.stat}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-[#E9FFF9] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors mb-3">
                {benefit.description}
              </p>
              <p className="text-xs text-[#E9FFF9]/60 group-hover:text-[#E9FFF9]/80 transition-colors">
                Source: {benefit.source}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom transition to next section with extended wave */}
      <div className="absolute bottom-0 left-0 right-0" style={{ transform: 'translateY(99%)' }}>
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto transform translate-y-1"
          preserveAspectRatio="none"
          fill="white"
        >
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}