// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

// Import the providers
import { BookingProvider } from "@/context/BookingContext";
import { LanguageProvider } from "@/context/LanguageContext";
import MobileNavBar from "@/components/MobileNavBar";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Await params in Next.js 15
  const {locale} = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body 
        suppressHydrationWarning={true}
        className="antialiased"
        style={{ backgroundColor: "#0E1A2B", color: "#ededed" }}
      >
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider>
            <BookingProvider>
              <div className="pb-20 xl:pb-0">{children}</div>
              <MobileNavBar />
            </BookingProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
