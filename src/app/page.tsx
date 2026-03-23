"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Droplet, Search, ShieldCheck, Users, Activity, Heart,
  Globe, Zap, Sparkles, Hospital, Building2,
  UserPlus, AlertCircle, Handshake, ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { HeroSection } from '@/components/HeroSection';
import { ChatbotPopup } from '@/components/ChatbotPopup';

// ─── Translations ─────────────────────────────────────────────────────────────
type LangCode = 'en' | 'hi' | 'mr';

const T: Record<LangCode, {
  joinNetwork: string; joinSub: string;
  howTitle: string; howSub: string;
  step1Title: string; step1Desc: string;
  step2Title: string; step2Desc: string;
  step3Title: string; step3Desc: string;
  whyTitle: string; whySub: string;
  feat1: string; feat1d: string;
  feat2: string; feat2d: string;
  feat3: string; feat3d: string;
  ctaTitle: string; ctaSub: string;
  ctaBtn: string; ctaBtn2: string;
  donateBlood: string; donateDesc: string;
  needBlood: string; needDesc: string;
  hospital: string; hospitalDesc: string;
  bloodBank: string; bloodBankDesc: string;
}> = {
  en: {
    joinNetwork: 'Join the Network', joinSub: 'Select your role to access specialized tools designed for your needs.',
    howTitle: 'How HemoLink Works', howSub: 'Three simple steps to save a life.',
    step1Title: 'Register', step1Desc: 'Sign up as a Donor, Hospital, or Blood Bank in under 2 minutes.',
    step2Title: 'Search or Request', step2Desc: 'Find nearby donors instantly or raise an SOS request.',
    step3Title: 'Connect & Save Lives', step3Desc: 'Get matched and coordinate instantly during emergencies.',
    whyTitle: 'Why HemoLink?', whySub: 'Empowering the Next Generation of Life Savers.',
    feat1: 'Real-time Alerts', feat1d: 'Instant SOS broadcasts to verified donors nearby.',
    feat2: 'Verified Network', feat2d: 'Secure verification for all donors and blood banks.',
    feat3: 'Global Impact', feat3d: 'Saving lives across communities with modern tech.',
    ctaTitle: 'Ready to Be a Hero?', ctaSub: 'Join thousands making a difference. Registration takes less than 2 minutes.',
    ctaBtn: 'JOIN THE NETWORK', ctaBtn2: 'Contact Support',
    donateBlood: 'Donate Blood', donateDesc: 'Register as a donor and save lives every day.',
    needBlood: 'Need Blood', needDesc: 'Find nearby compatible donors or blood banks.',
    hospital: 'Hospital Access', hospitalDesc: 'Manage SOS requests and find local donors fast.',
    bloodBank: 'Blood Bank', bloodBankDesc: 'Track inventory and connect with hospitals.',
  },
  hi: {
    joinNetwork: 'नेटवर्क से जुड़ें', joinSub: 'अपनी भूमिका चुनें और जीवन बचाने के लिए आगे बढ़ें।',
    howTitle: 'HemoLink कैसे काम करता है', howSub: 'तीन सरल चरणों में एक जीवन बचाएं।',
    step1Title: 'पंजीकरण करें', step1Desc: 'Donor, Hospital या Blood Bank के रूप में 2 मिनट में साइन अप करें।',
    step2Title: 'खोजें या अनुरोध करें', step2Desc: 'नज़दीकी डोनर तुरंत खोजें या SOS अनुरोध करें।',
    step3Title: 'जुड़ें और जीवन बचाएं', step3Desc: 'आपातकाल में तुरंत समन्वय करें।',
    whyTitle: 'HemoLink क्यों?', whySub: 'जीवन बचाने वालों की नई पीढ़ी को सशक्त बनाना।',
    feat1: 'रियल-टाइम अलर्ट', feat1d: 'नज़दीकी डोनर्स को तुरंत SOS संदेश।',
    feat2: 'सत्यापित नेटवर्क', feat2d: 'सभी डोनर्स और ब्लड बैंकों का सुरक्षित सत्यापन।',
    feat3: 'वैश्विक प्रभाव', feat3d: 'आधुनिक तकनीक से समुदायों को बचाना।',
    ctaTitle: 'क्या आप हीरो बनने के लिए तैयार हैं?', ctaSub: 'हजारों लोगों से जुड़ें जो बदलाव ला रहे हैं।',
    ctaBtn: 'नेटवर्क से जुड़ें', ctaBtn2: 'सहायता से संपर्क करें',
    donateBlood: 'रक्त दान करें', donateDesc: 'Donor के रूप में पंजीकरण करें।',
    needBlood: 'रक्त चाहिए', needDesc: 'नज़दीकी डोनर या ब्लड बैंक खोजें।',
    hospital: 'अस्पताल एक्सेस', hospitalDesc: 'SOS अनुरोध और डोनर प्रबंधन।',
    bloodBank: 'ब्लड बैंक', bloodBankDesc: 'स्टॉक ट्रैक करें और अस्पतालों से जुड़ें।',
  },
  mr: {
    joinNetwork: 'नेटवर्कमध्ये सामील व्हा', joinSub: 'आपली भूमिका निवडा आणि जीव वाचवा।',
    howTitle: 'HemoLink कसे कार्य करते', howSub: 'तीन सोप्या पायऱ्यांमध्ये जीव वाचवा।',
    step1Title: 'नोंदणी करा', step1Desc: 'Donor, Hospital किंवा Blood Bank म्हणून 2 मिनिटांत नोंदणी करा।',
    step2Title: 'शोधा किंवा विनंती करा', step2Desc: 'जवळचे डोनर शोधा किंवा SOS विनंती करा।',
    step3Title: 'जोडा आणि जीव वाचवा', step3Desc: 'आपत्कालीन परिस्थितीत त्वरित समन्वय करा।',
    whyTitle: 'HemoLink का?', whySub: 'जीव वाचवणाऱ्यांच्या नव्या पिढीला सक्षम करणे।',
    feat1: 'रिअल-टाइम अलर्ट', feat1d: 'जवळच्या डोनर्सना त्वरित SOS संदेश।',
    feat2: 'सत्यापित नेटवर्क', feat2d: 'सर्व डोनर्स आणि रक्त बँकांचे सुरक्षित सत्यापन।',
    feat3: 'जागतिक प्रभाव', feat3d: 'आधुनिक तंत्रज्ञानाने समुदायांना वाचवणे।',
    ctaTitle: 'नायक बनण्यास तयार आहात?', ctaSub: 'बदल घडवणाऱ्या हजारो लोकांसोबत सामील व्हा।',
    ctaBtn: 'नेटवर्कमध्ये सामील व्हा', ctaBtn2: 'आधारासाठी संपर्क करा',
    donateBlood: 'रक्त दान करा', donateDesc: 'डोनर म्हणून नोंदणी करा।',
    needBlood: 'रक्त हवे आहे', needDesc: 'जवळचे डोनर किंवा रक्त बँक शोधा।',
    hospital: 'रुग्णालय प्रवेश', hospitalDesc: 'SOS विनंती व्यवस्थापन।',
    bloodBank: 'रक्त बँक', bloodBankDesc: 'साठा ट्रॅक करा आणि रुग्णालयांशी जोडा।',
  },
};

const LANG_LABELS: Record<LangCode, string> = {
  en: '🇬🇧 English', hi: '🇮🇳 हिंदी', mr: '🇮🇳 मराठी',
};

// ─── Language Selector ────────────────────────────────────────────────────────
function LanguageSelector({ lang, setLang }: { lang: LangCode; setLang: (l: LangCode) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-background/80 text-xs font-bold hover:border-primary/40 transition-colors"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        {LANG_LABELS[lang].split(' ')[0]} {LANG_LABELS[lang].split(' ').slice(1).join(' ')}
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-background border rounded-2xl shadow-xl overflow-hidden z-50 min-w-[140px]">
          {(Object.keys(LANG_LABELS) as LangCode[]).map(code => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<LangCode>('en');

  useEffect(() => {
    const saved = localStorage.getItem('hemolink_lang') as LangCode | null;
    if (saved && saved in T) setLang(saved);
  }, []);

  const handleSetLang = (l: LangCode) => {
    setLang(l);
    localStorage.setItem('hemolink_lang', l);
  };

  const t = T[lang];

  useEffect(() => {
    const handleLangChange = () => {
      const saved = localStorage.getItem('hemolink_lang') as LangCode | null;
      if (saved && saved in T) setLang(saved);
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const ROLE_CARDS = [
    { title: t.donateBlood,  desc: t.donateDesc,     icon: Droplet,    color: 'text-red-500',   bg: 'bg-red-500/10',   border: 'border-red-500/20',   hover: 'hover:border-red-500/50 hover:shadow-red-500/20',   link: '/register' },
    { title: t.needBlood,    desc: t.needDesc,        icon: Search,     color: 'text-primary',   bg: 'bg-primary/10',   border: 'border-primary/20',   hover: 'hover:border-primary/50 hover:shadow-primary/20',   link: '/search'   },
    { title: t.hospital,     desc: t.hospitalDesc,    icon: Hospital,   color: 'text-blue-500',  bg: 'bg-blue-500/10',  border: 'border-blue-500/20',  hover: 'hover:border-blue-500/50 hover:shadow-blue-500/20',  link: '/register' },
    { title: t.bloodBank,    desc: t.bloodBankDesc,   icon: Building2,  color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20', hover: 'hover:border-green-500/50 hover:shadow-green-500/20', link: '/register' },
  ];

  const HOW_STEPS = [
    { icon: UserPlus,     title: t.step1Title, desc: t.step1Desc, color: 'bg-primary',   num: '1' },
    { icon: AlertCircle,  title: t.step2Title, desc: t.step2Desc, color: 'bg-blue-600',  num: '2' },
    { icon: Handshake,    title: t.step3Title, desc: t.step3Desc, color: 'bg-green-600', num: '3' },
  ];

  const WHY_FEATS = [
    { icon: Zap,        title: t.feat1, desc: t.feat1d },
    { icon: ShieldCheck,title: t.feat2, desc: t.feat2d },
    { icon: Globe,      title: t.feat3, desc: t.feat3d },
  ];

  return (
    <div className="flex flex-col gap-0 selection:bg-primary/20 transition-colors duration-300">
      {/* Global Language selector in Navbar — fixed overlap */}

      {/* Hero */}
      <HeroSection />

      {/* ── Join the Network ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-background relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">{t.joinNetwork}</h2>
            <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">{t.joinSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLE_CARDS.map((card, i) => (
              <Link href={card.link} key={i}>
                <div className={`group p-7 rounded-[2rem] border-2 ${card.border} ${card.hover} transition-all duration-400 hover:-translate-y-2 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl cursor-pointer h-full flex flex-col items-center text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${card.bg} group-hover:scale-110 transition-transform duration-400 relative z-10`}>
                    <card.icon className={`h-8 w-8 ${card.color}`} />
                  </div>
                  <h3 className="text-xl font-black mb-2 tracking-tight relative z-10">{card.title}</h3>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed relative z-10">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Registered Donors', value: '850K+', icon: Users,     color: 'text-blue-500',  bg: 'bg-blue-500/10'  },
              { label: 'Lives Saved',        value: '1.2M+', icon: Heart,     color: 'text-primary',   bg: 'bg-primary/10'   },
              { label: 'Blood Banks',        value: '3,200+',icon: Droplet,   color: 'text-sky-500',   bg: 'bg-sky-500/10'   },
              { label: 'Network Uptime',     value: '99.9%', icon: Activity,  color: 'text-green-500', bg: 'bg-green-500/10' },
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-7 rounded-[2rem] shadow-sm text-center group transition-all hover:-translate-y-1 hover:shadow-md">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${s.bg} group-hover:scale-110 transition-transform`}>
                  <s.icon className={`h-7 w-7 ${s.color}`} />
                </div>
                <div className="text-3xl font-black tracking-tighter mb-1">{s.value}</div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How HemoLink Works ────────────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl text-primary font-bold mb-2">
              <Sparkles className="h-4 w-4" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.howTitle}</h2>
            <p className="text-muted-foreground text-lg font-medium">{t.howSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-blue-400 to-green-500 opacity-20 z-0" />
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4 group">
                <div className={`w-20 h-20 ${step.color} rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-current/20 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <step.icon className="h-10 w-10 text-white" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-current text-xs font-black flex items-center justify-center text-foreground shadow-sm">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-black">{step.title}</h3>
                <p className="text-muted-foreground font-medium text-sm max-w-[220px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button className="bg-primary hover:bg-red-700 font-black h-14 px-10 rounded-2xl text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
              <Link href="/register">Get Started Now <Heart className="h-5 w-5 ml-2 fill-white" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Why HemoLink ──────────────────────────────────────────────────── */}
      <section className="py-28 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl text-primary font-bold mx-auto">
              <Sparkles className="h-5 w-5" /> {t.whyTitle}
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">{t.whySub}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
              {WHY_FEATS.map((feat, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-sm border border-border/40 hover:border-primary/20 hover:shadow-xl transition-all group">
                  <div className="shrink-0 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <feat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-2">{feat.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-primary overflow-hidden relative rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="container mx-auto px-4 md:px-8 text-center text-white relative z-10 space-y-8">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter">{t.ctaTitle}</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-black h-16 px-12 rounded-2xl text-xl hover:scale-105 transition-transform" asChild>
              <Link href="/register">{t.ctaBtn}</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl border-white/30 text-white hover:bg-white/10 font-bold bg-transparent">
              {t.ctaBtn2}
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Chatbot */}
      <ChatbotPopup />
    </div>
  );
}
