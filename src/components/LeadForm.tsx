import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2, MessageCircle, ChevronDown } from 'lucide-react';
import { validateNIC, validateMobile, formatWhatsAppMessage, validateEmail } from '../utils/validation';

const TARGET_WHATSAPP = "+94770084828";

export default function LeadForm() {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nicRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nic: '',
    dob: '',
    mobile: '',
    address: '',
    requirement: ''
  });

  const [dobParts, setDobParts] = useState({
    day: '',
    month: '',
    year: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('lead_form_draft');
    if (savedDraft) {
      try {
        const data = JSON.parse(savedDraft);
        setFormData(data);
        if (data.dob) {
          const [y, m, d] = data.dob.split('-');
          setDobParts({ year: y || '', month: m || '', day: d || '' });
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  // Sync dobParts to formData.dob
  useEffect(() => {
    if (dobParts.day && dobParts.month && dobParts.year) {
      const formattedDob = `${dobParts.year}-${dobParts.month.padStart(2, '0')}-${dobParts.day.padStart(2, '0')}`;
      setFormData(prev => ({ ...prev, dob: formattedDob }));
    } else {
      setFormData(prev => ({ ...prev, dob: '' }));
    }
  }, [dobParts]);

  // Save draft to localStorage on change
  useEffect(() => {
    localStorage.setItem('lead_form_draft', JSON.stringify(formData));
  }, [formData]);

  const handleDobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDobParts(prev => ({ ...prev, [name]: value }));
    if (errors.dob) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.dob;
        return newErrors;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (formData.email) {
      const emailCheck = validateEmail(formData.email);
      if (!emailCheck.isValid) newErrors.email = emailCheck.error || "Invalid email";
    }
    
    const nicCheck = validateNIC(formData.nic);
    if (!nicCheck.isValid) newErrors.nic = nicCheck.error || "Invalid NIC";
    
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    
    const mobileCheck = validateMobile(formData.mobile);
    if (!mobileCheck.isValid) newErrors.mobile = mobileCheck.error || "Invalid mobile";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      // Focus the first invalid field
      const newErrors: Record<string, string> = {};
      
      if (!formData.fullName.trim()) {
        fullNameRef.current?.focus();
      } else if (formData.email && !validateEmail(formData.email).isValid) {
        emailRef.current?.focus();
      } else if (!validateNIC(formData.nic).isValid) {
        nicRef.current?.focus();
      } else if (!formData.dob) {
        yearRef.current?.focus();
      } else if (!validateMobile(formData.mobile).isValid) {
        mobileRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a brief loading state for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const cleanFormData = {
      ...formData,
      nic: formData.nic.replace(/\s/g, '').toUpperCase(),
      mobile: formData.mobile.replace(/\s/g, '')
    };

    const message = formatWhatsAppMessage(cleanFormData);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${TARGET_WHATSAPP}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Clear draft after successful start
    localStorage.removeItem('lead_form_draft');
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="space-y-4">
      <header className="px-1 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-0.5 leading-tight uppercase italic underline decoration-hnb-gold decoration-4 underline-offset-4">
          <span className="text-hnb-navy">Plan</span> <span className="text-hnb-blue">Directly</span>
        </h2>
        <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mt-2">Start your journey to specialized cover</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 pb-6 rounded-[28px] shadow-sm border border-slate-100">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1 text-left">Full Name</label>
          <input
            ref={fullNameRef}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue ${
              errors.fullName ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-100'
            }`}
          />
          {errors.fullName && (
            <p className="mt-2 text-[9px] text-red-500 font-black uppercase tracking-wider flex items-center gap-1 px-1">
              <AlertCircle size={10} /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1 text-left">Email Address (Optional)</label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue ${
              errors.email ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-100'
            }`}
          />
          {errors.email && (
            <p className="mt-2 text-[9px] text-red-500 font-black uppercase tracking-wider flex items-center gap-1 px-1">
              <AlertCircle size={10} /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1 text-left">NIC Number</label>
          <input
            ref={nicRef}
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            placeholder="e.g. 199012345678"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue ${
              errors.nic ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-100'
            }`}
          />
          {errors.nic ? (
            <p className="mt-2 text-[9px] text-red-500 font-black uppercase tracking-wider flex items-center gap-1 px-1">
              <AlertCircle size={10} /> {errors.nic}
            </p>
          ) : formData.nic && (
            <span className="text-[9px] text-emerald-600 mt-2 block font-black uppercase tracking-wider px-1">✓ Valid Format Detected</span>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1 text-left">Date of Birth</label>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <select
                ref={yearRef}
                name="year"
                value={dobParts.year}
                onChange={handleDobChange}
                className={`w-full pl-3 pr-8 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue appearance-none ${
                  errors.dob ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-100'
                }`}
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
            </div>
            
            <div className="relative">
              <select
                name="month"
                value={dobParts.month}
                onChange={handleDobChange}
                className={`w-full pl-3 pr-8 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue appearance-none ${
                  errors.dob ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-100'
                }`}
              >
                <option value="">Month</option>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                  <option key={month} value={i + 1}>{month}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
            </div>

            <div className="relative">
              <select
                name="day"
                value={dobParts.day}
                onChange={handleDobChange}
                className={`w-full pl-3 pr-8 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue appearance-none ${
                  errors.dob ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-100'
                }`}
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
            </div>
          </div>
          {errors.dob && (
            <p className="mt-2 text-[9px] text-red-500 font-black uppercase tracking-wider flex items-center gap-1 px-1">
              <AlertCircle size={10} /> {errors.dob}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1 text-left">Your Mobile Number</label>
          <div className="flex">
            <span className="flex items-center px-4 bg-slate-100 border border-r-0 border-slate-100 rounded-l-xl text-slate-400 font-black text-xs">
              +94
            </span>
            <input
              ref={mobileRef}
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="771234567"
              className={`flex-1 px-4 py-3 bg-slate-50 border rounded-r-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue ${
                errors.mobile ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-100'
              }`}
            />
          </div>
          {errors.mobile && (
            <p className="mt-2 text-[9px] text-red-500 font-black uppercase tracking-wider flex items-center gap-1 px-1">
              <AlertCircle size={10} /> {errors.mobile}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1 text-left">Address (Optional)</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Current residential address"
            rows={1}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue resize-none min-h-[52px]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1 text-left">Inquiry / Goal</label>
          <textarea
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            placeholder="e.g. Investment Plan, Child Policy..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none transition-all text-sm font-medium focus:ring-2 focus:ring-hnb-blue/20 focus:border-hnb-blue resize-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative group overflow-hidden bg-hnb-navy text-white py-4.5 rounded-[22px] font-black text-sm tracking-widest uppercase shadow-2xl shadow-hnb-navy/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center gap-3">
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <MessageCircle size={14} strokeWidth={3} />
                </div>
              )}
              <span>{isSubmitting ? 'SECURELY CONNECTING...' : 'SEND VIA WHATSAPP'}</span>
            </div>
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-5 text-slate-300">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <span className="text-[9px] font-black tracking-[0.15em] uppercase">Secured by HNB Life</span>
          </div>
        </div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 text-emerald-700"
            >
              <CheckCircle2 size={24} />
              <div>
                <p className="font-bold text-xs uppercase tracking-wider">Message Ready</p>
                <p className="text-[10px] font-medium opacity-80 uppercase tracking-tight">WhatsApp has been triggered with the lead data.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
