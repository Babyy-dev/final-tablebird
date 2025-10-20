// app/page.tsx
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  Suspense,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  Bookmark,
  CalendarDays,
  CheckCircle,
  CreditCard,
} from "lucide-react";

import { destinations as allRestaurants } from "@/lib/data/destinations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { cn } from "@/lib/utils";

// --- Component to load initial URL search params (if any)
function SearchParamsLoader({ children }: { children: React.ReactNode }) {
  return children;
}

// --- Core Page Component ---
function IndexContent() {
  const router = useRouter();
  const golden = "#D4A853";
  const navyDark = "#0E1A2B";
  
  // Translation hooks
  const t = useTranslations('home');
  const tHero = useTranslations('home.hero');
  const tDineTime = useTranslations('home.dine_time');
  const tDinner = useTranslations('home.dinner_section');
  const tHowItWorks = useTranslations('home.how_it_works');
  const tTopRestaurants = useTranslations('home.top_restaurants');
  const tReviews = useTranslations('home.reviews');
  const tSuggestion = useTranslations('home.suggestion');
  const tCuisines = useTranslations('home.cuisines');
  const tFAQ = useTranslations('home.faq');
  const tNewsletter = useTranslations('home.newsletter');

  // Header state - sync with current locale
  const [lang, setLang] = useState<"EN" | "BG">("EN");
  
  // Initialize language state based on pathname - default to English
  useEffect(() => {
    const currentLang = typeof window !== 'undefined' && window.location.pathname.startsWith('/bg') ? 'BG' : 'EN';
    setLang(currentLang);
  }, []);

  // Booking box state initialization
  const uniqueLocations = useMemo(
    () => Array.from(new Set(allRestaurants.map((r) => r.location))),
    []
  );
  const defaultLoc = uniqueLocations.includes("Sofia, Bulgaria")
    ? "Sofia, Bulgaria"
    : uniqueLocations[0] ?? "Adelaide";

  const [loc, setLoc] = useState(defaultLoc);
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [guests, setGuests] = useState<number>(2);

  // Carousel Logic (ADJUSTED CARD_W) - Auto-scroll disabled
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cuisineSliderRef = useRef<HTMLDivElement | null>(null); // New ref for cuisine carousel
  const CARD_W = 340; // FIX 1: Stretched card width to 340px
  const CUISINE_CARD_W = 315; // Width for cuisine cards
  const restaurantImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80",
  ];

  // --- NEW FAQ STATE ---
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Top Restaurant save states
  const [savedRestaurants, setSavedRestaurants] = useState<{
    [key: string]: boolean;
  }>({});

  // Toggle function for FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Save function for top restaurants
  const toggleRestaurantSave = (
    col: number,
    item: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const key = `${col}-${item}`;
    setSavedRestaurants((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  // --- END NEW FAQ STATE ---

  // Enhanced scroll functions with smooth navigation
  const scrollNext = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    // Check if mobile view (viewport width < 640px) - only in browser
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const cardWidth = isMobile ? 280 : CARD_W; // Mobile card width is 280px
    const gap = isMobile ? 16 : 32; // Smaller gap on mobile
    const scrollDistance = cardWidth + gap;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    if (currentScroll + scrollDistance >= maxScrollLeft) {
      // Reached the end, loop back to start
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      // Scroll to next card
      el.scrollTo({
        left: currentScroll + scrollDistance,
        behavior: "smooth",
      });
    }
  }, [CARD_W]);

  const scrollPrev = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    // Check if mobile view (viewport width < 640px) - only in browser
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const cardWidth = isMobile ? 280 : CARD_W; // Mobile card width is 280px
    const gap = isMobile ? 16 : 32; // Smaller gap on mobile
    const scrollDistance = cardWidth + gap;

    const currentScroll = el.scrollLeft;

    if (currentScroll <= 0) {
      // At the beginning, loop to end
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
    } else {
      // Scroll to previous card
      el.scrollTo({
        left: Math.max(0, currentScroll - scrollDistance),
        behavior: "smooth",
      });
    }
  }, [CARD_W]);

  // Cuisine carousel scroll functions
  const scrollCuisineNext = useCallback(() => {
    const el = cuisineSliderRef.current;
    if (!el) return;

    const scrollDistance = CUISINE_CARD_W + 32; // Card width + gap
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    if (currentScroll + scrollDistance >= maxScrollLeft) {
      // Reached the end, loop back to start
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      // Scroll to next card
      el.scrollTo({
        left: currentScroll + scrollDistance,
        behavior: "smooth",
      });
    }
  }, [CUISINE_CARD_W]);

  const scrollCuisinePrev = useCallback(() => {
    const el = cuisineSliderRef.current;
    if (!el) return;

    const scrollDistance = CUISINE_CARD_W + 32; // Card width + gap
    const currentScroll = el.scrollLeft;

    if (currentScroll <= 0) {
      // At the beginning, loop to end
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
    } else {
      // Scroll to previous card
      el.scrollTo({
        left: Math.max(0, currentScroll - scrollDistance),
        behavior: "smooth",
      });
    }
  }, [CUISINE_CARD_W]);

  // Auto-scroll effect removed - manual navigation only

  // Define a style object for hiding the scrollbar reliably
  const scrollbarHideStyle = {
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
  } as React.CSSProperties;

  // Data Definitions with translations
  const timeCategories = [
    {
      name: tDineTime('breakfast'),
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80",
    },
    {
      name: tDineTime('lunch'),
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    },
    {
      name: tDineTime('eve_tea'),
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    },
    {
      name: tDineTime('dinner'),
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    },
  ];
  const cuisineImages = [
    {
      name: tCuisines('italian'),
      image:
        "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400&q=80",
    },
    {
      name: tCuisines('mexican'),
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f0a0ae38?w=400&q=80",
    },
    {
      name: tCuisines('japanese'),
      image:
        "https://images.unsplash.com/photo-1569718212165-fb6926501d24?w=400&q=80",
    },
    {
      name: tCuisines('indian'),
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80",
    },
  ];
  
  // Define FAQ item type
  type FAQItem = {
    q: string;
    a: string;
  };

  // Use FAQ questions from translations
  const faqItems = tFAQ.raw('questions') as FAQItem[];

  const howItWorksSteps = [
    {
      icon: Search,
      title: tHowItWorks('discover.title'),
      desc: tHowItWorks('discover.desc'),
    },
    {
      icon: CalendarDays,
      title: tHowItWorks('book.title'),
      desc: tHowItWorks('book.desc'),
    },
    {
      icon: CheckCircle,
      title: tHowItWorks('confirmation.title'),
      desc: tHowItWorks('confirmation.desc'),
    },
    {
      icon: CreditCard,
      title: tHowItWorks('payment.title'),
      desc: tHowItWorks('payment.desc'),
    },
  ];

  function onSearch() {
    // Get current locale from window path since usePathname hook is not available here
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const isEnglish = !currentPath.startsWith('/bg');
    const searchPath = isEnglish ? '/search' : '/bg/search';
    
    router.push(
      `${searchPath}?loc=${encodeURIComponent(loc)}&date=${encodeURIComponent(
        date
      )}&guests=${guests}`
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-dark-bg text-light-white"
      style={{
        background: `radial-gradient(20.62% 53.89% at 100% 76.15%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            radial-gradient(49.93% 70.21% at 50% 0%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            linear-gradient(0deg, ${navyDark} 0%, ${navyDark} 100%)`,
      }}
    >
      {/* Hero Section */}
      <div
        className="relative min-h-[600px] md:min-h-[775px] bg-cover bg-center w-full"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.62) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&q=80')",
        }}
      >
        <Header lang={lang} setLang={setLang} />

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-14 flex flex-col items-center justify-center pt-12 sm:pt-16 md:pt-24 lg:pt-32 pb-8 sm:pb-10 md:pb-16 lg:pb-20 w-full">
          <div className="text-center max-w-[514px] mb-6 sm:mb-8 lg:mb-10">
            <h1 className="font-dm-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[111%] tracking-tight text-white mb-3 sm:mb-4 px-2">
              {tHero('title')}
            </h1>
            <p className="text-white text-sm sm:text-base font-medium max-w-[448px] mx-auto px-4">
              {tHero('subtitle')}
            </p>
          </div>

          {/* Booking Form - enhanced mobile responsiveness */}
          <div className="w-full max-w-[664px] p-4 sm:p-6 rounded-2xl border border-white/50 bg-gradient-to-b from-[rgba(58,113,190,0.7)] to-[rgba(28,28,28,0.7)] shadow-xl backdrop-blur-md mx-4">
            <h3 className="text-white text-base font-medium mb-4">
              {tHero('book_table')}
            </h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-end gap-3 md:gap-4">
              {/* Location Input */}
              <div className="flex-1 w-full sm:min-w-[45%] md:min-w-[140px]">
                <label className="text-white/50 text-xs mb-1 block">
                  {tHero('location')}
                </label>
                <div className="relative">
                  <select
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    className="w-full text-align-left appearance-none bg-transparent border border-white/30 rounded-md px-3 py-2.5 pr-10 text-white"
                  >
                    {uniqueLocations.map((c) => (
                      <option key={c} value={c} className="text-black bg-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Date Input */}
              <div className="flex-1 w-full sm:min-w-[45%] md:min-w-[140px]">
                <label className="text-white/50 text-xs mb-1 block">{tHero('date')}</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent border border-white/30 rounded-md px-3 py-2.5 text-white"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              {/* Guests Input */}
              <div className="flex-1 w-full sm:min-w-[30%] md:min-w-[120px]">
                <label className="text-white/50 text-xs mb-1 block">
                  {tHero('guests')}
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full appearance-none bg-transparent border border-white/30 text-white rounded-md px-3 py-2.5 pr-10"
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <option
                        key={i + 1}
                        value={i + 1}
                        className="text-black bg-white"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={onSearch}
                className={`w-full sm:w-auto mt-2 sm:mt-4 md:mt-0 px-8 sm:px-10 md:px-12 py-3.5 rounded-md text-white text-sm font-medium text-center transition-opacity hover:opacity-90`}
                style={{ backgroundColor: golden }}
              >
                {tHero('search')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What's Your Best Dine Time */}
      <section className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-14 py-6 sm:py-8 lg:py-10 w-full">
        <h2 className="text-xl sm:text-2xl lg:text-[34px] font-normal mb-6 sm:mb-8 lg:mb-10 text-center sm:text-left">
          {tDineTime('title')}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {timeCategories.map((category, index) => (
            <div
              key={index}
              className={`relative h-[140px] sm:h-[160px] md:h-[180px] lg:h-[203px] rounded-[18px] border ${
                index === 2 ? "border-2 border-white" : "border border-white"
              } overflow-hidden group cursor-pointer transition-transform hover:scale-105`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(33, 60, 98, 0.00) 55.67%, rgba(0, 0, 0, 0.91) 98.03%), url('${category.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute bottom-3 left-3.5">
                <h3 className="text-white text-xl md:text-2xl font-normal">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurant Carousel Section */}
      <section className="max-w-[1440px] mx-auto py-6 sm:py-8 lg:py-10 w-full">
        <div className="px-3 sm:px-4 md:px-6 lg:px-16 flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 sm:mb-6 gap-2 sm:gap-0">
          <h2 className="text-xl sm:text-2xl lg:text-[34px] font-normal">
            {tDinner('title')}
          </h2>
          <Link
            href="#"
            className="text-white/75 text-sm sm:text-base lg:text-xl font-medium"
          >
            {tDinner('view_all')}
          </Link>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            tabIndex={0}
            // Handle keyboard navigation for accessibility
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") scrollNext();
              if (e.key === "ArrowLeft") scrollPrev();
            }}
            className="flex gap-4 sm:gap-6 md:gap-8 px-3 sm:px-4 md:px-6 lg:px-16 py-5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={scrollbarHideStyle}
          >
            {restaurantImages.map((img, index) => (
              <RestaurantCard
                key={index}
                id={index + 1}
                name="La coco"
                rating="4.2"
                price="40€"
                priceAlt="78.23лв"
                distance="1 km"
                cuisine="Italian $$$$"
                address="Street Name"
                bookedTimes={4}
                reviews="2.5k"
                image={img}
                location={loc}
                tags={["19:00", "19:15", "19:30", "19:45"]}
                countdown="19:59:43"
              />
            ))}
          </div>

          {/* Navigation Buttons - Positioned outside card area */}
          <button
            aria-label="Previous"
            onClick={scrollPrev}
            className="absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] rounded-full border-2 border-white/80 bg-gradient-to-b from-[rgba(14,26,43,0.9)] to-[rgba(33,60,98,0.9)] backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-lg z-10"
            style={{ backgroundColor: "rgba(14, 26, 43, 0.95)" }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            aria-label="Next"
            onClick={scrollNext}
            className="absolute -right-4 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] rounded-full border-2 border-white/80 bg-gradient-to-b from-[rgba(14,26,43,0.9)] to-[rgba(33,60,98,0.9)] backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-lg z-10"
            style={{ backgroundColor: "rgba(14, 26, 43, 0.95)" }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-14 py-6 sm:py-8 lg:py-10 w-full">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl lg:text-[34px] font-normal mb-2">
            {tHowItWorks('title')}
          </h2>
          <p className="text-white/80 text-sm sm:text-base font-medium px-4 sm:px-0">
            {tHowItWorks('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 md:p-8 rounded-xl border-2 border-white flex flex-col gap-2 text-center sm:text-left"
            >
              <step.icon className={`w-7 h-7 mb-2`} style={{ color: golden }} />
              <h3 className="text-white text-xl font-medium">{step.title}</h3>
              <p className="text-white text-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Restaurant This Week (omitted for brevity) */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-8 lg:py-10">
        <div className="mb-8 lg:mb-10">
          <h2 className="text-2xl lg:text-[34px] font-normal mb-2">
            {tTopRestaurants('title')}
          </h2>
          <p className="text-white/50 text-base font-medium">
            {tTopRestaurants('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {[1, 2, 3].map((col) => (
            <div key={col} className="flex flex-col gap-3">
              <h3 className="text-white text-xl font-medium mb-2">
                {tTopRestaurants('top_booked')}
              </h3>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item}>
                  <div className="flex items-center gap-5 pr-4">
                    <Image
                      src={
                        restaurantImages[(item - 1) % restaurantImages.length]
                      }
                      alt="Restaurant"
                      width={92}
                      height={92}
                      className="w-[92px] h-[92px] rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white text-xl font-medium mb-2">
                        La coco
                      </h4>
                      <p className="text-white/60 text-sm mb-3">
                        Italian $$ • Street Name
                      </p>
                      <div className="inline-flex items-center px-2 py-0.5 rounded bg-[#125604] w-fit">
                        <span className="text-[#5F5] text-sm font-medium">
                          4.2
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleRestaurantSave(col, item, e)}
                      className={`p-1 rounded-md border transition-all duration-300 ${
                        savedRestaurants[`${col}-${item}`]
                          ? "border-green-400 bg-green-500/20 hover:bg-green-500/30"
                          : "border-white/20 bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 transition-all duration-300 ${
                          savedRestaurants[`${col}-${item}`]
                            ? "text-green-400 fill-green-400"
                            : "text-white fill-transparent"
                        }`}
                      />
                    </button>
                  </div>
                  {item < 5 && <div className="h-px bg-[#7A7A7A] my-3"></div>}
                </div>
              ))}
              <Link href="#" className="text-white text-xs">
                {tTopRestaurants('view_all')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-16 py-8 lg:py-10">
        <h2 className="text-2xl lg:text-[34px] font-normal text-white mb-8 lg:mb-12">
          {tReviews('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {[1, 2, 3].map((review) => (
            <div
              key={review}
              className="p-6 rounded-lg border border-white bg-white/5 backdrop-blur-[7.5px] flex flex-col gap-6"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5`}
                    strokeWidth={2}
                    style={{ color: golden, fill: golden }}
                  />
                ))}
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold mb-1">
                  {tReviews('review_title')}
                </h3>
                <p className="text-white text-base">{tReviews('review_body')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                <div className="flex-1">
                  <div className="text-[#757575] text-base font-bold">
                    {tReviews('reviewer_name')}
                  </div>
                  <div className="text-[#B3B3B3] text-base">{tReviews('date')}</div>
                </div>
              </div>
              <div>
                <div className="text-[#757575] text-base font-bold">
                  {tReviews('restaurant_name')}
                </div>
                <div className="text-[#B3B3B3] text-base">{tReviews('street_name')}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ask for Suggestion (omitted for brevity) */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-8 lg:py-10 text-center">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-[34px] font-normal mb-2">
            {tSuggestion('title')}
          </h2>
          <p className="text-white/80 text-base font-medium">
            {tSuggestion('subtitle')}
          </p>
        </div>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder={tSuggestion('placeholder')}
            className="flex-grow bg-transparent border border-white rounded-md p-3 text-white placeholder-white/50"
          />
          <button
            className={`w-full sm:w-auto px-8 py-3.5 rounded-md text-white text-sm font-medium`}
            style={{ backgroundColor: golden }}
          >
            {tSuggestion('get_suggestion')}
          </button>
        </div>
      </section>

      {/* Discover Cuisines (omitted for brevity) */}
      <section className="max-w-[1440px] mx-auto py-8 lg:py-10">
        <div className="px-4 lg:px-16 flex justify-between items-end mb-6">
          <h2 className="text-2xl lg:text-[34px] font-normal">
            {tCuisines('title')}
          </h2>
          <Link
            href="#"
            className="text-white/75 text-base lg:text-xl font-medium"
          >
            {tCuisines('view_all')}
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={cuisineSliderRef}
              className="flex gap-8 px-4 lg:px-16 py-5 overflow-x-auto scrollbar-hide scroll-smooth"
              style={scrollbarHideStyle}
            >
              {cuisineImages.map((cuisine, index) => (
                <div
                  key={index}
                  className="min-w-[280px] sm:min-w-[315px] h-[250px] sm:h-[307px] rounded-md border border-white overflow-hidden relative"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%), url('${cuisine.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-3xl font-bold">
                      {cuisine.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows - Positioned outside card area */}
          <button
            onClick={scrollCuisinePrev}
            aria-label="Previous Cuisine"
            className="absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] rounded-full border-2 border-white/80 bg-gradient-to-b from-[rgba(14,26,43,0.9)] to-[rgba(33,60,98,0.9)] backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-lg z-10"
            style={{ backgroundColor: "rgba(14, 26, 43, 0.95)" }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            onClick={scrollCuisineNext}
            aria-label="Next Cuisine"
            className="absolute -right-4 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] rounded-full border-2 border-white/80 bg-gradient-to-b from-[rgba(14,26,43,0.9)] to-[rgba(33,60,98,0.9)] backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-lg z-10"
            style={{ backgroundColor: "rgba(14, 26, 43, 0.95)" }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-8 lg:py-10">
        <div className="mb-8 lg:mb-12">
          <h2 className="text-white text-2xl lg:text-[34px] font-normal mb-2">
            {tFAQ('title')}
          </h2>
          <p className="text-white/75 text-base font-medium">
            {tFAQ('subtitle')}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-[10px] border border-white bg-white/5 backdrop-blur-[7.5px] overflow-hidden"
            >
              {/* Question/Trigger */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 md:p-6 flex items-center justify-between text-left transition-colors hover:bg-white/10"
              >
                <span className="text-white text-sm md:text-base font-medium flex-1">
                  {item.q}
                </span>
                <ChevronDown
                  className={cn(
                    "w-6 h-6 text-white transition-transform duration-300 md:w-8 md:h-8",
                    openFAQIndex === index ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>

              {/* Answer/Content (Smooth Transition) */}
              <div
                className={cn(
                  "transition-all duration-500 ease-in-out", // Added transition and duration
                  openFAQIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="pt-2 border-t border-white/20 p-4 md:p-6">
                  <p className="text-white/70 text-sm md:text-base">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Table */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-12 lg:py-16 text-center">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-[34px] font-normal mb-2">
            {tNewsletter('title')}
          </h2>
          <p className="text-white/80 text-base font-medium">
            {tNewsletter('subtitle')}
          </p>
        </div>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder={tNewsletter('placeholder')}
            className="flex-grow bg-transparent border border-white rounded-md p-3 text-white placeholder-white/50"
          />
          <button
            className={`w-full sm:w-auto px-8 py-3.5 rounded-md text-white text-sm font-medium`}
            style={{ backgroundColor: golden }}
          >
            {tNewsletter('subscribe')}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Default export uses Suspense
export default function Index() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E1A2B] flex items-center justify-center text-white text-xl">
          Loading...
        </div>
      }
    >
      <SearchParamsLoader>
        <IndexContent />
      </SearchParamsLoader>
    </Suspense>
  );
}
