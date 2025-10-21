import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // English first as default locale
  locales: ['en', 'bg'],
 
  // English is the default locale (no prefix needed)
  defaultLocale: 'en',
  
  // Only add prefix for non-default locales
  localePrefix: 'as-needed',
  
  // Disable automatic browser language detection to force English default
  localeDetection: false
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(bg|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
