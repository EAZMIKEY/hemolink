import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Droplet, ShieldCheck, Phone, Mail, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('common');
  const tn = useTranslations('navbar');

  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Droplet className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-slate-900">{t('title')}</span>
            </Link>
            <p className="text-slate-500 font-medium">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-slate-400 hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-primary"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">{tn('platformLabel')}</h4>


            <ul className="space-y-3 text-slate-500 text-sm font-semibold">
              <li><Link href="/search" className="hover:text-primary">{t('findDonor')}</Link></li>
              <li><Link href="/emergency" className="hover:text-primary">{t('emergencyCase')}</Link></li>
              <li><Link href="/banks" className="hover:text-primary">{t('locateBanks')}</Link></li>
              <li><Link href="/register" className="hover:text-primary">{t('becomeDonor')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">{tn('supportLabel')}</h4>

            <ul className="space-y-3 text-slate-500 text-sm font-semibold">
              <li><Link href="#" className="hover:text-primary">{t('helpCenter')}</Link></li>
              <li><Link href="#" className="hover:text-primary">{t('privacyPolicy')}</Link></li>
              <li><Link href="#" className="hover:text-primary">{t('termsOfService')}</Link></li>
              <li><Link href="#" className="hover:text-primary">{t('safetyGuidelines')}</Link></li>
            </ul>
          </div>


          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">{tn('contactLabel')}</h4>


            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
                <Phone className="h-4 w-4" /> 1800-HEMOLINK
              </li>
              <li className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
                <Mail className="h-4 w-4" /> support@hemolink.org
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-semibold">© {new Date().getFullYear()} {t('title')} Network. All rights reserved.</p>
          <div className="flex items-center gap-4 opacity-40">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{tn('verifiedSystem')}</span>

          </div>

        </div>
      </div>
    </footer>
  );
}
