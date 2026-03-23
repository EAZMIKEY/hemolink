"use client"

import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export type LangCode = 'en' | 'hi' | 'mr';

const LANG_LABELS: Record<LangCode, string> = {
  en: '🇬🇧 English', hi: '🇮🇳 हिंदी', mr: '🇮🇳 मराठी',
};

export function LanguageSelector() {
  const [lang, setLang] = useState<LangCode>('en');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hemolink_lang') as LangCode | null;
    if (saved && saved in LANG_LABELS) setLang(saved);
  }, []);

  const handleSetLang = (l: LangCode) => {
    setLang(l);
    localStorage.setItem('hemolink_lang', l);
    // Reload to apply language changes if needed, or use a context.
    // For now, it just updates the local state and storage.
    window.dispatchEvent(new Event('languageChange'));
    window.location.reload(); // Simplest way to propagate to home page for now
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-background/80 text-xs font-bold hover:border-primary/40 transition-all"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="hidden sm:inline">{LANG_LABELS[lang].split(' ')[0]} {LANG_LABELS[lang].split(' ').slice(1).join(' ')}</span>
        <span className="sm:hidden">{LANG_LABELS[lang].split(' ')[0]}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-background border rounded-2xl shadow-xl overflow-hidden z-[60] min-w-[140px]">
          {(Object.keys(LANG_LABELS) as LangCode[]).map(code => (
            <button
              key={code}
              onClick={() => { handleSetLang(code); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors hover:bg-muted ${lang === code ? 'text-primary' : ''}`}
            >
              {LANG_LABELS[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
