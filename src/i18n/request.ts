import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Get the locale from the request (await if it's a Promise)
  const locale = (await requestLocale) || 'en';
  
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
