'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

const THEMES: Record<string, string> = {
  members: 'theme-purple',
  classes: 'theme-blue',
  bookings: 'theme-green',
  default: 'theme-crimson',
};

const allThemes = Object.values(THEMES);

export function ThemeSwitcher() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Find the most specific matching theme
    const segments = pathname.split('/').filter(Boolean);
    let theme = THEMES.default;
    
    for (let i = segments.length - 1; i >= 0; i--) {
      if (THEMES[segments[i]]) {
        theme = THEMES[segments[i]];
        break;
      }
    }
    
    // Fallback for root path
    if (pathname === '/') {
        theme = THEMES.default;
    } else if (segments.length > 0 && !THEMES[segments[0]]) {
        // Handle cases like /members/new, use 'members' theme
        theme = THEMES[segments[0]] || THEMES.default;
    }


    document.body.classList.remove(...allThemes);
    document.body.classList.add(theme);

  }, [pathname]);

  return null;
}
