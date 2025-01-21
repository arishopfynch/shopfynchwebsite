import React from 'react';

export default function SuccessStories() {
  return (
    <section className="py-24 bg-[#E9FFF9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#351431] mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how brands are transforming their e-commerce experience with Fynch
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex items-start gap-8">
              <div 
                className="w-24 h-24 rounded-lg bg-center bg-cover flex-shrink-0"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")'
                }}
              />
              <div>
                <h3 className="text-2xl font-semibold text-[#351431] mb-2">
                  Fashion Forward
                </h3>
                <p className="text-gray-600 mb-4">
                  "Since integrating Fynch, we've seen a 25% increase in conversions and discovered an entirely new channel of organic referrals. The social shopping experience has transformed how our customers interact with our brand."
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-[#008080]">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">E-commerce Director</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#008080]">25%</p>
                      <p className="text-sm text-gray-500">Conversion Increase</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#008080]">3x</p>
                      <p className="text-sm text-gray-500">Referral Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#008080] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#006666] transition-colors">
              Join the Movement
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}