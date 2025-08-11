import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  LayoutDashboard,
  Share,
  Twitter,
  Youtube,
  Menu,
  X,
  LogIn,
  ArrowRight,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  description: string;
}

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
    <div className="bg-white p-6 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105 border border-gray-100 flex flex-col items-center text-center">
      <div className="p-4 bg-indigo-50 rounded-full mb-4">
        {React.createElement(icon, { className: "w-8 h-8 text-indigo-600" })}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-extrabold text-gray-900">
              <Link to="/">Cerebro</Link>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Sign In
            </a>
            <a
              href="#"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              Sign Up
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4">
            <div className="flex flex-col items-center space-y-4">
              <a
                href="#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 w-full text-center py-2"
              >
                Features
              </a>
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 w-full text-center py-2"
              >
                Sign In
              </a>
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 w-full text-center py-2"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="bg-gradient-to-br from-indigo-50 via-white to-gray-50 py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Organize Your Mind,{" "}
              <span className="text-indigo-600">Share Your Ideas</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Cerebro is a powerful tool to collect, manage, and share content
              from the web, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 flex items-center justify-center"
              >
                <Link to="/signup"> Get Started</Link>
                <LogIn className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg border border-gray-200 transform transition-transform duration-200 hover:scale-105 flex items-center justify-center"
              >
                <Link to="/signin">Sign In</Link>
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Designed to Help You Connect the Dots
              </h2>
              <p className="text-lg text-gray-600">
                Collect content from around the web, organize it, and share your
                curated thoughts with others.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={Twitter}
                title="Save Twitter Content"
                description="Easily add and categorize tweets and threads to your personal brain."
              />
              <FeatureCard
                icon={Youtube}
                title="Capture YouTube Videos"
                description="Keep a record of your favorite videos and organize them with your notes."
              />
              <FeatureCard
                icon={Share}
                title="Share Your Brain"
                description="Generate a unique link to share your curated content with anyone."
              />
              <FeatureCard
                icon={LayoutDashboard}
                title="Unified Dashboard"
                description="See everything in one place with a clean, customizable dashboard."
              />
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Start Building Your Brain?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of others who are connecting their ideas with
              Cerebro.
            </p>
            <a
              href="#"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
            >
              Sign Up Now
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-indigo-400" />
            <span className="text-xl font-bold">Cerebro</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2024 Cerebro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
