"use client"

import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertTriangle, Bug, HelpCircle, X, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function SmartHelpBubble() {
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);

  // Close on outside click
  useEffect(() => {
    const handleClick = () => setIsOpen(false);
    if (isOpen) {
      window.addEventListener('click', handleClick);
    }
    return () => window.removeEventListener('click', handleClick);
  }, [isOpen]);

  const actions = [
    { label: "Help", icon: HelpCircle, color: "bg-blue-500", href: "#help" },
    { label: "FAQs", icon: MessageSquare, color: "bg-purple-500", href: "#faqs" },
    { label: "Contact", icon: Bug, color: "bg-green-500", href: "#contact" },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[2500]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 mb-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 w-56 flex flex-col gap-1 overflow-hidden"
          >
            {actions.map((action, idx) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                onClick={(e) => {
                  if (action.href === '#') e.preventDefault();
                }}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg", action.color)}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">{action.label}</span>
              </Link>
            ))}
            
            <div className="mt-2 pt-2 border-t border-white/5 text-center">
               <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">National Help Grid</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl transition-all duration-300 relative overflow-hidden group",
          isOpen ? "bg-slate-800 border border-white/10" : "bg-red-600 hover:bg-red-500 hover:scale-110"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="help"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <HelpCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border-2 border-red-600 shadow-sm"
          >
             <span className="w-1 h-1 bg-red-600 rounded-full animate-ping" />
          </motion.div>
        )}
      </Button>
    </div>
  );
}
