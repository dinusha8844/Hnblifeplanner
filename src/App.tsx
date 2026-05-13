/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Building2, Phone, MessageCircle } from 'lucide-react';
import HNBLogo from './components/HNBLogo';
import LifePlannerCard from './components/LifePlannerCard';
import LeadForm from './components/LeadForm';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-hnb-blue/10 selection:text-hnb-navy pb-12">
      {/* Brand Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <HNBLogo className="h-10" />
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-4 space-y-6">
        {/* Lead Capture Form (Primary) */}
        <section>
          <LeadForm />
        </section>

        {/* Separator omitted for space */}
        
        {/* Life Planner Information (Secondary/Bottom) */}
        <section>
          <LifePlannerCard />
        </section>

        {/* Quick Connect Footer Bar */}
        <div className="bg-white border border-slate-100 rounded-[24px] p-3 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 pl-1">
            <div className="w-8 h-8 rounded-full bg-hnb-blue/5 flex items-center justify-center border border-hnb-blue/10">
              <Phone size={14} className="text-hnb-blue" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Ready to connect</p>
              <p className="text-sm font-black text-slate-900 leading-none tracking-tight">077 008 4828</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href="tel:0770084828"
              className="w-10 h-10 rounded-full bg-hnb-gold text-white flex items-center justify-center shadow-lg shadow-hnb-gold/20 active:scale-95 transition-transform"
            >
              <Phone size={16} strokeWidth={3} />
            </a>
            <a 
              href="https://wa.me/0770084828"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
            >
              <MessageCircle size={16} strokeWidth={3} />
            </a>
          </div>
        </div>

        {/* Footer with "Our Promise" from theme */}
        <footer className="pt-4 text-center space-y-4 pb-4">
          <div className="px-8 pb-4 border-t border-slate-100 pt-6">
            <p className="text-[11px] text-slate-400 uppercase tracking-[0.3em] font-black mb-3">Our Promise</p>
            <p className="text-xs leading-relaxed text-slate-500 italic font-medium px-4">
              "Securing your future with trust and integrity through personalized life insurance solutions."
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-3 opacity-20 select-none">
            <div className="w-1 h-1 rounded-full bg-slate-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-hnb-gold" />
            <div className="w-1 h-1 rounded-full bg-slate-400" />
          </div>
          
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} HNB Life PLC • Life Planner
          </p>
        </footer>
      </main>
      
      {/* Background Accent */}
      <div className="fixed top-[-100px] right-[-100px] w-80 h-80 bg-hnb-blue rounded-full blur-[120px] opacity-10 z-[-1]" />
    </div>
  );
}

