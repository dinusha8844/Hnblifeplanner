import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import HNBLogo from './HNBLogo';

const lifePlanner = {
  name: "Rushan Vidwantha",
  position: "Life Planner",
  mobile: "0770084828",
  company: "HNB Life PLC",
  whatsapp: "+94770084828",
  imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
};

export default function LifePlannerCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 p-5 rounded-[28px] border border-slate-100 shadow-sm uppercase italic backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 not-italic">
          <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden p-1.5 shadow-sm">
            <HNBLogo className="h-8 w-auto" />
          </div>
          <div>
            <p className="text-slate-400 text-[8px] font-black uppercase tracking-[0.2em] mb-0.5">Your Life Planner</p>
            <h2 className="text-sm font-black text-slate-800 leading-none">
              <span className="text-hnb-blue">Rushan</span> <span className="text-hnb-navy">Vidwantha</span>
            </h2>
          </div>
        </div>
        
        <div className="bg-hnb-gold text-white text-[7px] font-black px-2 py-1 rounded shadow-sm shadow-hnb-gold/20 tracking-widest leading-none">
          QUALIFIED PLANNER
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-100/50 flex items-center justify-between not-italic">
        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{lifePlanner.company} • PLC</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-hnb-gold" />
          <span className="text-[7px] font-black text-hnb-navy uppercase tracking-tighter italic">Professional Service</span>
        </div>
      </div>
    </motion.div>
  );
}
