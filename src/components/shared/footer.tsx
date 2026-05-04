import Link from 'next/link';
import { FOOTER_DATA, MENU_DATA } from '@/lib/constants';

/**
 * Global Footer component.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-prixgen-dark text-white py-20 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-prixgen-blue rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Prixgen</span>
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
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/50">Governance</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/who-we-are" className="hover:text-prixgen-lightblue transition-colors">Who We Are</Link></li>
            <li><Link href="/engineering-services" className="hover:text-prixgen-lightblue transition-colors">Engineering Services</Link></li>
            <li><Link href="/contact" className="hover:text-prixgen-lightblue transition-colors">Global Contact</Link></li>
          </ul>
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
