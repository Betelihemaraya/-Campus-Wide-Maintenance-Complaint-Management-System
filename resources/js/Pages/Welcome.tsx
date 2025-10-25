import { useState } from "react"
import { Link } from '@inertiajs/react'
import { motion } from "framer-motion"

// Declare the global route function for TypeScript
declare function route(name: string, params?: any): string;

export default function Welcome() { 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const steps = [
    {
      number: 1,
      icon: (
        <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* User icon for Login/Signup */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.963 8.963 0 0112 15c2.21 0 4.21.803 5.879 2.136M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Log in or Sign up",
      description: "If you have an account, sign in. If you're new, sign up first."
    },
    {
      number: 2,
      icon: (
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Form/edit icon for submission */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9m-9 0V4m0 16L3 12" />
        </svg>
      ),
      title: "Submit a Complaint",
      description: "Fill out the form with location, type of issue, and other details."
    },
    {
      number: 3,
      icon: (
        <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Badge/ticket icon for ID */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0H5m14 0v6m0 0v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m16 0H5" />
        </svg>
      ),
      title: "Receive Complaint ID",
      description: "Get a unique ID to track your complaint."
    },
    {
      number: 4,
      icon: (
        <svg className="h-8 w-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Tracking and status-check icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 014-4h3m-7 6l2 2 4-4" />
        </svg>
      ),
      title: "Track & Resolve",
      description: "Monitor and follow the progress until the complaint is resolved."
    }
  ];
  
  
  const ways = [
    {
      number: 1,
      icon: (
        <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2v1h4v-1zm2 0v1h4v-1c0-1.105-.895-2-2-2s-2 .895-2 2zM6 16h12v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      title: "Log in required",
      description: "Submit complaints without creating an account or remembering passwords."
    },
    {
      number: 2,
      icon: (
        <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
        </svg>
      ),
      title: "Automated routing",
      description: "Complaints are automatically routed to the appropriate campus coordinator."
    },
    {
      number: 3,
      icon: (
        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M4 4v16h16V4H4z" />
        </svg>
      ),
      title: "Status tracking",
      description: "Track the progress of your complaint through our transparent system."
    },
    {
      number: 4,
      icon: (
        <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M5 10l7 7 7-7" />
        </svg>
      ),
      title: "Photo upload",
      description: "Attach photos to your complaint to better illustrate the issue."
    }
  ];
  
  

const links = [
  { name: "Home", path: "#" },
  { name: "Sign In", path: route('login') },
  { name: "Sign Up", path: route('register') },
];


  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden flex flex-col md:flex-row bg-[#1F304B]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 z-10 animate-gradient-shift" />

        {/* Dynamic accent circles/blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob z-0" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 z-0" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 z-0" />

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 bg-indigo-800 bg-opacity-40 backdrop-blur-sm shadow-lg">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
              <img src='/image.png' alt='logo' className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-blue hover:bg-gray-700  bg-orange-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-8">
            <Link href={route('login')} className=" hover:border-yellow-600 hover:bg-transparent hover:w-30 hover:rounded-lg transition-all duration-300 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white uppercase text-base tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
              Sign In
            </Link>
            <Link href={route('register')} className="hover:border-yellow-600 hover:bg-transparent inline-flex hover:rounded-lg hover:w-30 transition-all duration-300 items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold  text-white text-base uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
              Sign Up
            </Link>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm shadow-lg`}
          >
            <div className="px-4 py-2 space-y-1">
              <Link
                href={route('login')}
                className="block px-4 py-2 hover:bg-yellow-600 text-blue-700 hover:bg-yellow-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href={route('register')}
                className="block px-4 py-2 hover:bg-yellow-600 text-blue-700 hover:bg-yellow-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>

        {/* Content Container */}
        <div className="relative z-30 flex flex-col md:flex-row flex-grow">
          {/* Left Half: Text Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center md:text-left md:items-start md:w-1/2">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-white leading-tight mb-4 drop-shadow-2xl tracking-wide transform transition-transform duration-300 hover:scale-110"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
            </motion.h1>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight drop-shadow-xl tracking-wide mb-6 transform transition-transform duration-300 hover:scale-110"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Campus-Wide Maintenance & Complaint Management
            </motion.h2>
            <motion.h2
              className="text-1xl sm:text-3xl md:text-2xl font-semibold text-white leading-tight drop-shadow-xl tracking-wide mb-6 transform transition-transform duration-300 hover:scale-110"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Easily report and track infrastructure or service-related issues across all five campuses of Mekelle University.
            </motion.h2>
            
            {/* Button Container */}
            <div className="flex space-x-4 m-0 auto">
              <Link href={route('login')} className="bg-yellow-600 hover:bg-transparent border border-yellow-600 transition duration-300 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25">
                Sign in
              </Link>
              <Link href={route('register')} className="bg-yellow-600 hover:bg-transparent border border-yellow-600 transition duration-300 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25">
                Sign up
              </Link>
            </div>
          </div>

          {/* Right Half: Image */}
          <div className="relative flex-1 min-h-[50vh] md:min-h-screen md:w-1/2">
            <div className="absolute inset-0 bg-black opacity-50 z-20" />
            <img
              src="/profile/image.png"
              alt="Mekelle University Campus"
              className="absolute inset-0 object-cover w-full h-full z-10"
            />
            <div className="absolute bottom-5 right-5 w-40 h-40 bg-blue-500 border border-slate-900 rounded-full flex items-center justify-center shadow-lg z-30">
              <span className="text-center text-xl font-bold text-black">5 Campuses<br />in One</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            How<span className="text-indigo-600">it works</span>
          </h2>
          <p className="text-gray-600 text-lg">
            These are the steps we have to follow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
  {steps.map((step, i) => (
    <motion.div
      key={i}
      whileHover={{
        translateY: -5,
        boxShadow:
          "0 15px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
      }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div
        className={[
          "absolute inset-0 rounded-lg transform opacity-60 blur-md",
          i === 0 && "bg-gradient-to-br from-slate-500 to-slate-600",
          i === 1 && "bg-gradient-to-br from-slate-500 to-slate-700",
          i === 2 && "bg-gradient-to-br from-slate-500 to-slate-800",
          i === 3 && "bg-gradient-to-br from-slate-500 to-gray-700",
        ]
          .filter(Boolean)
          .join(" ")}
      ></div>

      <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col p-8 items-center text-center">
        <div
          className={[
            "rounded-full w-12 h-12 flex items-center justify-center mb-6 shadow-lg",
            "bg-gray-800",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {step.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
        <p className="text-gray-600 text-base leading-relaxed flex-grow">
          {step.description}
        </p>
      </div>
    </motion.div>
  ))}
</div>

      </section>
      {/* Key Features */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Key<span className="text-indigo-600">Features</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Our system is designed to make the maintenance reporting process efficient and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
          {ways.map((way, i) => (
            <motion.div
              key={i}
              whileHover={{ translateY: -5, boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08)" }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className={[
                'absolute inset-0 rounded-lg transform opacity-60 blur-md',
                i === 0 && 'bg-gradient-to-br from-slate-500 to-slate-600',
                i === 1 && 'bg-gradient-to-br from-slate-500 to-black-700',
                i === 2 && 'bg-gradient-to-br from-slate-500 to-black-600'
              ].filter(Boolean).join(' ')}></div>

              <div className="relative z-10 bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col p-8 items-center text-center">
                <div className={[
                  'rounded-full w-12 h-12 flex items-center justify-center mb-6 shadow-lg',
                  i === 0 && 'bg-black-600',
                  i === 1 && 'bg-black-600',
                  i === 2 && 'bg-black-600'
                ].filter(Boolean).join(' ')}>
                  {way.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{way.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed flex-grow">{way.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold mb-3 text-blue-300">Mekelle University</h3>
            <p className="text-gray-400 mb-3 text-lg">
              Campus-Wide Maintenance and Complaint Management System
            </p>
            <div className="flex items-center justify-center space-x-3 mt-5">
              <div className="bg-blue-400 text-gray-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                <a href='#'>MU</a>
              </div>
            </div>
          </div>

          
<div className="text-center">
  <h3 className="text-2xl font-semibold mb-5 text-blue-300">Quick Links</h3>
  <ul className="space-y-3 text-gray-400">
    {links.map((link, i) => (
      <li key={i}>
        <a href={link.path} className="hover:text-blue-200 transition duration-300">
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div>


          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-5 text-blue-300">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Mekelle University</li>
              <li>P.O. Box 231, Mekelle</li>
              <li>Tigray, Ethiopia</li>
              <li>
                Email:{' '}
                <a href="mailto:support@mekelleu.edu.et" className="text-blue-200 hover:underline">
                  support@mekelleu.edu.et
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Mekelle University. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
