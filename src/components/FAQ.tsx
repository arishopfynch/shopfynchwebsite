import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is the Fynch Shopify App?",
    answer: "Fynch is a social shopping plugin for Shopify stores that allows customers to share their carts, get real-time feedback, and increase engagement. It helps brands reduce cart abandonment, boost referrals, and grow sales."
  },
  {
    question: "How does Fynch help my store?",
    answer: "Fynch drives more conversions by reducing cart abandonment, increasing referrals through shared carts, and providing actionable insights into customer behavior—all of which improve your bottom line."
  },
  {
    question: "How much does Fynch cost?",
    answer: "Plans start at $99/month for stores earning under $25,000 in monthly revenue. Pricing scales based on your store's revenue to ensure affordability and value."
  },
  {
    question: "How do customers share their carts?",
    answer: 'With the "Share Cart" button embedded in your store\'s shopping cart, customers can generate a secure link to share with friends via text, email, or social media.'
  },
  {
    question: "What insights do I get with Fynch?",
    answer: "Fynch provides an analytics dashboard with data on top-performing products, cart sharing activity, voting trends, referral traffic, and conversions to help you optimize your strategy."
  },
  {
    question: "Is Fynch easy to install?",
    answer: "Yes! Fynch is a one-click install from the Shopify App Store. No coding or technical skills are required."
  },
  {
    question: "Can Fynch be customized to match my store's branding?",
    answer: "Absolutely! You can customize the plugin with your logo, colors, and fonts to align perfectly with your store's design."
  },
  {
    question: "Does Fynch work on mobile devices?",
    answer: "Yes, Fynch is fully mobile-optimized, ensuring a seamless experience for your customers across all devices."
  },
  {
    question: "Is customer data secure with Fynch?",
    answer: "Yes, Fynch uses data encryption, secure links, and GDPR-compliant practices to protect all customer information."
  },
  {
    question: "Can I try Fynch before committing?",
    answer: "Yes! We offer a 3-month free trial for all new users, so you can see the benefits risk-free."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008080' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E9FFF9] rounded-full mb-4">
            <HelpCircle className="h-5 w-5 text-[#008080]" />
            <span className="text-sm font-medium text-[#008080]">Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#351431] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Fynch and how it can transform your Shopify store
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 hover:border-[#008080]/30 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-[#351431]">{faq.question}</span>
                  <div className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                    openIndex === index ? 'bg-[#008080] text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {openIndex === index ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 pb-4' : 'max-h-0'
                }`}>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}