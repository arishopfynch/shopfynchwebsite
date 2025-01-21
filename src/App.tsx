import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Header,
  Footer,
  Hero,
  Dashboard,
  Benefits,
  BetaCTA,
  Features,
  ROICalculator,
  FAQ,
  Blog,
  BlogPostPage,
  AdminLogin,
  AdminDashboard,
  ProtectedRoute
} from './components';

function HomePage() {
  return (
    <>
      <Hero />
      <Dashboard />
      <Benefits />
      <BetaCTA />
      <Features />
      <ROICalculator />
      <FAQ />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#E9FFF9]">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;