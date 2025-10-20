import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'bg'],
 
  // Used when no locale matches - ensure English is default
  defaultLocale: 'en',
  
  // Don't add locale prefix for default locale (English)
  localePrefix: 'as-needed'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(bg|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
