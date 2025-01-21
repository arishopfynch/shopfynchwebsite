import React from 'react';
import { ShoppingCart, Users, Share2, BarChart3, Gift, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: Share2,
    title: 'Social Cart Sharing',
    description: 'Enable customers to share their carts with friends, driving organic reach and social proof.',
  },
  {
    icon: ThumbsUp,
    title: 'Real-Time Feedback',
    description: 'Gain valuable insights through thumbs up/down voting on products and combinations.',
  },
  {
    icon: Gift,
    title: 'Checkout-on-Behalf',
    description: 'Perfect for gifting—let friends complete purchases for shared carts seamlessly.',
  },
  {
    icon: BarChart3,
    title: 'Insights Dashboard',
    description: 'Track cart interactions, top-performing products, and engagement metrics in real-time.',
  },
  {
    icon: Users,
    title: 'Referral Growth',
    description: 'Transform every shared cart into a new lead and customer acquisition opportunity.',
  },
  {
    icon: ShoppingCart,
    title: 'Seamless Integration',
    description: 'One-click Shopify installation with real-time product synchronization.',
  },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008080' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#008080] to-[#351431] bg-clip-text text-transparent inline-block">
            Why Fynch?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to boost engagement, drive sales, and create meaningful shopping experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#008080]/30"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `translateY(${Math.sin(index * 0.5) * 10}px)`
              }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E9FFF9]/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#008080]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#008080]" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#008080]/20 group-hover:scale-150 group-hover:bg-[#008080]/30 transition-all duration-500" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#351431]/20 group-hover:scale-150 group-hover:bg-[#351431]/30 transition-all duration-500" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-[#351431] mb-3 group-hover:text-[#008080] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Bottom accent line with gradient animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#008080]/0 via-[#008080]/30 to-[#008080]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#008080]/10 to-transparent transform rotate-45 translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-4 w-24 h-24 bg-[#008080]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-4 w-32 h-32 bg-[#351431]/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
}