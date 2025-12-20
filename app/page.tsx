"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 py-28 md:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_50%)]"></div>
          <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
            <div 
              className={`text-center transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
                <span className="text-white text-sm font-medium">Trusted by 10,000+ Patients</span>
              </div>
              
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                Healthcare Made
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                  Simple & Fast
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-50 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Book appointments with trusted doctors in minutes. Track your visit in real-time. 
                <span className="block mt-4 text-emerald-100 font-normal">No waiting, no hassle, just quality care.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
                <Link href="/doctors" className="group">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="text-lg px-14 py-6 rounded-2xl font-bold bg-white text-teal-700 hover:bg-emerald-50 shadow-2xl hover:shadow-emerald-300/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <span className="flex items-center gap-2">
                      Book Appointment
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-14 py-6 rounded-2xl font-bold border-3 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-lg"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-emerald-100 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="bg-gradient-to-b from-white to-emerald-50/30 py-28 md:py-36 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center mb-24">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Getting healthcare has never been easier. Follow these simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-200 to-transparent hidden md:block transform -translate-y-1/2"></div>
              
              <div className="relative text-center group">
                <div className="relative z-10 inline-flex items-center justify-center h-28 w-28 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-8 text-4xl font-bold text-white shadow-2xl shadow-emerald-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  1
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-5">
                  Browse Doctors
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  Search and filter through our network of verified doctors by specialization, location, or availability.
                </p>
              </div>

              <div className="relative text-center group">
                <div className="relative z-10 inline-flex items-center justify-center h-28 w-28 rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-600 mb-8 text-4xl font-bold text-white shadow-2xl shadow-teal-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  2
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-5">
                  Select Time Slot
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  Choose a convenient date and time from available slots. See real-time availability updates.
                </p>
              </div>

              <div className="relative text-center group">
                <div className="relative z-10 inline-flex items-center justify-center h-28 w-28 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-8 text-4xl font-bold text-white shadow-2xl shadow-cyan-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  3
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-5">
                  Track Your Visit
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  Get your token number and monitor your position in the queue with live updates on your phone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Key Features */}
        <section className="bg-white py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center mb-24">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Comprehensive features designed to make healthcare accessible and convenient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-3">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-emerald-500/30">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Smart Search
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Find doctors by name, specialization, or location with our powerful search and filter system.
                </p>
              </div>

              <div className="group p-10 rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-200/50 transition-all duration-300 transform hover:-translate-y-3">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-teal-500/30">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Real-Time Tracking
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Monitor your token number and estimated wait time with live updates every few seconds.
                </p>
              </div>

              <div className="group p-10 rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-100 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 transform hover:-translate-y-3">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-cyan-500/30">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Verified Doctors
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  All doctors are verified professionals with complete profiles, qualifications, and experience details.
                </p>
              </div>

              <div className="group p-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-3">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-emerald-500/30">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Easy Booking
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Book appointments in just a few clicks. No phone calls, no waiting on hold, no hassle.
                </p>
              </div>

              <div className="group p-10 rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-100 hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-200/50 transition-all duration-300 transform hover:-translate-y-3">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-teal-500/30">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Appointment Dashboard
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  View all your appointments in one place - upcoming visits and past history organized clearly.
                </p>
              </div>

              <div className="group p-10 rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-100 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 transform hover:-translate-y-3">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-cyan-500/30">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Transparent Pricing
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  See consultation fees upfront before booking. No hidden charges, no surprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Benefits */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-28 md:py-36">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="text-center mb-24">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Why Choose MedCare?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                Experience healthcare that&apos;s designed around your convenience and peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="flex gap-6 p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    Save Time
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    No more waiting in long queues or spending hours on phone calls. Book your appointment in under 2 minutes and know exactly when it&apos;s your turn.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-teal-100 hover:border-teal-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    Secure & Private
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Your health information is protected with industry-standard security. We respect your privacy and keep your data safe.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-cyan-100 hover:border-cyan-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    Reliable Service
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Trusted by thousands of patients. Our platform connects you with verified healthcare professionals and reliable clinics.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                    Always Available
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    Book appointments 24/7 from anywhere. Check availability, manage your visits, and track tokens - all from your device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Statistics & Trust */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-28 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join our growing community of satisfied patients
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                  10K+
                </div>
                <div className="text-gray-300 font-semibold text-lg">
                  Happy Patients
                </div>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  500+
                </div>
                <div className="text-gray-300 font-semibold text-lg">
                  Verified Doctors
                </div>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                  50+
                </div>
                <div className="text-gray-300 font-semibold text-lg">
                  Partner Clinics
                </div>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                  98%
                </div>
                <div className="text-gray-300 font-semibold text-lg">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 py-32 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.2),transparent_50%)]"></div>
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 text-center">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                Your Healthcare?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-emerald-50 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Join thousands of patients who have simplified their healthcare journey. Book your first appointment today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8">
              <Link href="/doctors" className="group">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="text-xl px-16 py-7 rounded-2xl font-bold bg-white text-teal-700 hover:bg-emerald-50 shadow-2xl hover:shadow-emerald-300/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="flex items-center gap-3">
                    Get Started Now
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-xl px-16 py-7 rounded-2xl font-bold border-3 border-white/50 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-xl"
                >
                  Sign In to Account
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-emerald-100 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

