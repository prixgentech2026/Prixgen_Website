import Link from 'next/link';
import { FOOTER_DATA, MENU_DATA } from '@/lib/constants';
import { Logo } from '@/components/shared/logo';

/**
 * Global Footer component.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-prixgen-dark text-white py-20 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block mb-6">
            <Logo variant="light" className="w-32" />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {FOOTER_DATA.tagline}
          </p>
          <div className="space-y-2">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Regional Headquarters</p>
            <p className="text-gray-400 text-xs leading-relaxed">{FOOTER_DATA.office_india}</p>
            <p className="text-gray-400 text-xs">{FOOTER_DATA.office_australia}</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Solutions</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {MENU_DATA.solutions.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="hover:text-prixgen-lightblue transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Industries</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {MENU_DATA.industries.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="hover:text-prixgen-lightblue transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Services</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {MENU_DATA.services.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="hover:text-prixgen-lightblue transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/who-we-are" className="hover:text-prixgen-lightblue transition-colors">Who We Are</Link></li>
            <li><Link href="/careers" className="hover:text-prixgen-lightblue transition-colors">Careers</Link></li>
            <li><Link href="/engineering-services" className="hover:text-prixgen-lightblue transition-colors">Engineering Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <span className="text-prixgen-lightblue opacity-60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <a href={`tel:${FOOTER_DATA.phone}`} className="hover:text-prixgen-lightblue transition-colors font-medium">{FOOTER_DATA.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-prixgen-lightblue opacity-60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </span>
              <a href={`tel:${FOOTER_DATA.mobile}`} className="hover:text-prixgen-lightblue transition-colors font-medium">{FOOTER_DATA.mobile}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-prixgen-lightblue opacity-60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <a href={`mailto:${FOOTER_DATA.email}`} className="hover:text-prixgen-lightblue transition-colors font-medium">{FOOTER_DATA.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-prixgen-lightblue opacity-60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/></svg>
              </span>
              <a href={`https://${FOOTER_DATA.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-prixgen-lightblue transition-colors font-medium">{FOOTER_DATA.website}</a>
            </li>
          </ul>

          <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
            <h5 className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Odoo Alliance</h5>
            <div className="flex items-center gap-6 group">
              <div className="relative">
                {/* Custom SVG Odoo Logo for maximum clarity */}
                <svg 
                  viewBox="0 0 100 40" 
                  className="h-10 w-auto transition-all duration-500 transform group-hover:scale-105"
                >
                  <g fill="currentColor">
                    <path 
                      className="text-[#875A7B]" 
                      d="M18,10c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S23.5,10,18,10z M18,24.5c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5S20.5,24.5,18,24.5z"
                      fill="currentColor"
                    />
                    <path 
                      className="text-white/70" 
                      d="M40.5,10c-5.5,0-10,4.5-10,10s4.5,10,10,10c2.5,0,4.8-0.9,6.5-2.5V30h5.5V5h-5.5v12.5C45.3,10.9,43,10,40.5,10z M40.5,24.5c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5S43,24.5,40.5,24.5z"
                      fill="currentColor"
                    />
                    <path 
                      className="text-white/70" 
                      d="M65.5,10c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S71,10,65.5,10z M65.5,24.5c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5S68,24.5,65.5,24.5z"
                      fill="currentColor"
                    />
                    <path 
                      className="text-white/70" 
                      d="M90.5,10c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S96,10,90.5,10z M90.5,24.5c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5S93,24.5,90.5,24.5z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-widest uppercase">Gold Partner</span>
                <div className="h-1 w-full bg-yellow-500 mt-1.5 shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">
          © {year} Prixgen Enterprise. All rights reserved.
        </p>
        <div className="flex gap-6 text-gray-500 text-xs">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
