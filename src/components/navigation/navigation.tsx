'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import Image from 'next/image';

import logoIcon from '../../../public/svg/logo.svg';
import coffeeIcon from '../../../public/svg/coffee_outlined.svg';
import coffeeIconFill from '../../../public/svg/coffee_fill.svg';
import favsIcon from '../../../public/svg/favorite_outlined.svg';
import favsIconFill from '../../../public/svg/favorite_fill.svg';
import statisticsIcon from '../../../public/svg/statistics_outlined.svg';
import statisticsIconFill from '../../../public/svg/statistics_fill.svg';
import rezepteIcon from '../../../public/svg/rezepte_fill_outlined.svg';
import rezepteIconFill from '../../../public/svg/rezepte_fill_outlined.svg';
import lexikonIcon from '../../../public/svg/dictionary_outlined.svg';
import lexikonIconFill from '../../../public/svg/dictionary_fill.svg';
import impressumIcon from '../../../public/svg/impressum_outlined.svg';
import impressumIconFill from '../../../public/svg/impressum_fill.svg';
import privacyIcon from '../../../public/svg/privacy_outlined.svg';
import privacyIconFill from '../../../public/svg/privacy_fill.svg';
import hamburgerNavIcon from '../../../public/svg/hamburger_nav.svg';
import closeNavIcon from '../../../public/svg/close_nav.svg';

const links = [
  { icon: coffeeIcon, iconFill: coffeeIconFill, name: 'Brews', href: '/brews' },
  { icon: favsIcon, iconFill: favsIconFill, name: 'Favs', href: '/favs' },
  { icon: statisticsIcon, iconFill: statisticsIconFill, name: 'Statistics', href: '/statistics' },
  { icon: rezepteIcon, iconFill: rezepteIconFill, name: 'Rezepte', href: '/rezepte' },
  { icon: lexikonIcon, iconFill: lexikonIconFill, name: 'Lexikon', href: '/lexikon' },
];

const Navigation: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed flex w-full flex-col bg-white drop-shadow-2xl lg:h-screen lg:w-64 lg:border-r lg:border-[var(--beige-secondary)] lg:filter-none">
      <div className="wrapper flex justify-between border-b border-[var(--beige-secondary)] px-9 py-4 lg:justify-center lg:py-10">
        <Link href="/" className="flex items-center lg:flex-col" onClick={() => setIsOpen(false)}>
          <Image src={logoIcon} width={60} height={60} alt={'the logo "boorista" with a coffee mug and a pen'} />
          <p className="text-xl font-bold uppercase lg:text-2xl">Boorista</p>
        </Link>
        {/* menu toggle for responsive nav */}
        <button onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <Image
              src={hamburgerNavIcon}
              width={35}
              height={35}
              alt={'hamburger icon for toggling the nav menu in responsive layout'}
              className="lg:hidden"
            />
          ) : (
            <Image
              src={closeNavIcon}
              width={30}
              height={30}
              alt={'close icon for closing the nav menu in responsive layout'}
              className="lg:hidden"
            />
          )}
        </button>
      </div>
      <div className={`lg:nav-wrapper lg:flex lg:h-full lg:flex-col lg:justify-between ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="main-nav-wrapper py-4 lg:py-6">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx('flex gap-2 py-3 pl-10 font-medium hover:bg-[var(--lightbeige-bg)] lg:pl-5', {
                    'bg-[var(--lightbeige-bg)] font-semibold': pathname === link.href,
                  })}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Image
                    src={pathname === link.href ? link.iconFill : link.icon}
                    width={26}
                    height={26}
                    alt={`a navigation icon of ${link.name}`}
                  />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="impressum-privacy-wrapper border-t border-[var(--beige-secondary)] py-4 lg:py-6">
          <li>
            <Link
              href="/impressum"
              className={clsx('flex gap-2 py-3 pl-10 font-medium hover:bg-[var(--lightbeige-bg)] lg:pl-5', {
                'bg-[var(--lightbeige-bg)] font-semibold': pathname === '/impressum',
              })}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={pathname === '/impressum' ? impressumIconFill : impressumIcon}
                width={26}
                height={26}
                alt={'a navigation icon of Impressum'}
              />
              Impressum
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              className={clsx('flex gap-2 py-3 pl-10 font-medium hover:bg-[var(--lightbeige-bg)] lg:pl-5', {
                'bg-[var(--lightbeige-bg)] font-semibold': pathname === '/privacy',
              })}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={pathname === '/privacy' ? privacyIconFill : privacyIcon}
                width={26}
                height={26}
                alt={'a navigation icon of Datenschutz'}
              />
              Datenschutz
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
