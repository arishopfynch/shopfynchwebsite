import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#351431] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Logo className="h-8 w-8 text-[#008080]" />
            <span className="text-2xl font-bold">Fynch</span>
          </div>
          <p className="text-white/80 max-w-md mb-8">
            Transform your e-commerce experience with social shopping features that drive engagement, boost sales, and build community.
          </p>
          
          <a 
            href="https://www.linkedin.com/company/shopfynch/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] rounded-lg hover:bg-[#006396] transition-colors mb-8"
          >
            <Linkedin className="h-5 w-5" />
            <span>Follow us on LinkedIn</span>
          </a>
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-center items-center gap-6">
            <p className="text-white/60 text-sm">
              © 2024 Fynch. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
              <Link to="/admin" className="text-white/60 hover:text-white transition-colors">Admin Portal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}