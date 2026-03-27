"use client"

import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export type LangCode = 'en' | 'hi' | 'bn' | 'mr' | 'ta' | 'te';

const LANG_LABELS: Record<LangCode, string> = {
  en: '🇬🇧 English', 
  hi: '🇮🇳 हिंदी', 
  bn: '🇮🇳 বাংলা', 
  mr: '🇮🇳 मराठी', 
  ta: '🇮🇳 தமிழ்',
  te: '🇮🇳 తెలుగు'
};

export function LanguageSelector() {
  const locale = useLocale() as LangCode;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSetLang = (l: LangCode) => {
    localStorage.setItem('NEXT_LOCALE', l);
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000`;
    router.replace(pathname, { locale: l });
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-background/80 text-xs font-bold hover:border-primary/40 transition-all"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="hidden sm:inline">{LANG_LABELS[locale]?.split(' ')[0]} {LANG_LABELS[locale]?.split(' ').slice(1).join(' ')}</span>
        <span className="sm:hidden">{LANG_LABELS[locale]?.split(' ')[0]}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-background border rounded-2xl shadow-xl overflow-hidden z-[60] min-w-[140px]">
          {(Object.keys(LANG_LABELS) as LangCode[]).map(code => (
            <button
              key={code}
              onClick={() => handleSetLang(code)}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors hover:bg-muted ${locale === code ? 'text-primary' : ''}`}
            >
              {LANG_LABELS[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
