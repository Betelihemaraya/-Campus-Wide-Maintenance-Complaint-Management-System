import React from 'react';
import { Link } from '@inertiajs/react';
import {useState} from 'react'
import { LogOutIcon } from 'lucide-react';

interface Props {
    children: React.ReactNode;
}
const links = [
  { name: "Sign In", path: route('login') },
  { name: "Sign up", path: route('register') },
  { name: "Submit complaint", path: route('complaints.create') },
  { name: "track complaint", path: route('complaints.track') }
];


export default function MainLayout({ children }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <>
        <nav className="fixed top-0 mb-60 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 bg-indigo-700 bg-opacity-40 backdrop-blur-sm shadow-lg">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
              <Link href={route('home')}><img src='/image.png' alt='logo' className="w-full h-full object-contain" /></Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-blue hover:bg-gray-700 bg-orange-500 focus:outline-none"
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
          
          <Link href={route('complaints.create')} className=" hover:bg-transparent hover:border-yellow-600 text-xs  hover:rounded-lg transition-all duration-300 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
              submit complaint
            </Link>
            <Link href={route('complaints.track')} className=" hover:bg-transparent hover:border-yellow-600 text-xs hover:rounded-lg transition-all duration-300 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
              Track complaint
            </Link>
            <Link href={route('login')} className=" hover:bg-transparent hover:border-yellow-600 text-xs hover:w-30 hover:rounded-lg transition-all duration-300 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
              Sign In
            </Link>
           
            <Link href={route('register')} className="hover:bg-transparent inline-flex hover:rounded-lg hover:w-30 transition-all duration-300 items-center justify-center px-4 py-2 hover:border-yellow-600 rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150hover:bg-transparent hover:border-yellow-600 text-base hover:w-30 hover:rounded-lg transition-all duration-300 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
              Sign Up
            </Link>
            <Link href={route('home')} className=" bg-orange-500 hover:bg-transparent hover:border-yellow-600 text-xs  hover:rounded-lg transition-all duration-300 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150">
              <LogOutIcon/>log out
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
              <Link
                href={route('complaints.create')}
                className="block px-4 py-2 hover:bg-yellow-600 text-blue-700 hover:bg-yellow-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                submit complaints
              </Link>
              <Link
                href={route('complaints.track')}
                className="block px-4 py-2 hover:bg-yellow-600 text-blue-700 hover:bg-yellow-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                track complaints
              </Link>
              <Link
                href={route('home')}
                className="block px-4 py-2 hover:bg-yellow-600 bg-orange-500 text-blue-700 hover:bg-yellow-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogOutIcon/>log out
              </Link>
            </div>
          </div>
        </nav>


        <div className="min-h-screen bg-gray-100">
             
            <main className="py-12">
                <div className="max-w-7xl mx-auto mt-25 sm:px-6 lg:px-8">
                    {children}
                   
 
                </div>
            </main>
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
        </>
    );
} 