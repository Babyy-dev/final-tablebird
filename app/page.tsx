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

  // Header state
  const [lang, setLang] = useState<"EN" | "BG">("EN");

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

  // Carousel Logic (ADJUSTED CARD_W)
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [auto, setAuto] = useState(true);
  const CARD_W = 340; // FIX 1: Stretched card width to 340px
  const restaurantImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
  ];

  // --- NEW FAQ STATE ---
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Toggle function for FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };
  // --- END NEW FAQ STATE ---

  // FIX 2: Loop Logic implemented correctly using CARD_W + gap (32px for gap-8)
  const scrollNext = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollDistance = CARD_W + 32;
    const max = el.scrollWidth - el.clientWidth;

    if (el.scrollLeft + scrollDistance >= max) {
      // Loop back to start
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  }, [CARD_W]);

  const scrollPrev = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollDistance = CARD_W + 32;

    if (el.scrollLeft <= 0) {
      // Loop to end
      el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: "auto" });
    } else {
      el.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  }, [CARD_W]);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(scrollNext, 4000);
    return () => clearInterval(id);
  }, [auto, scrollNext]);

  // Define a style object for hiding the scrollbar reliably
  const scrollbarHideStyle = {
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
  } as React.CSSProperties;

  // Data Definitions
  const timeCategories = [
    {
      name: "Breakfast",
      image:
        "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80",
    },
    {
      name: "Lunch",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    },
    {
      name: "Eve Tea",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    },
    {
      name: "Dinner",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    },
  ];
  const cuisineImages = [
    {
      name: "Italian",
      image:
        "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400&q=80",
    },
    {
      name: "Mexican",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f0a0ae38?w=400&q=80",
    },
    {
      name: "Japanese",
      image:
        "https://images.unsplash.com/photo-1569718212165-fb6926501d24?w=400&q=80",
    },
    {
      name: "Indian",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80",
    },
  ];
  const faqItems = [
    {
      q: "Frequently Asked Question here, Question 1",
      a: "This is the corresponding answer for Question 1. You can find detailed information about our services, pricing, and booking policies here.",
    },
    {
      q: "Frequently Asked Question here, Question 2",
      a: "This is the corresponding answer for Question 2. Our platform offers instant confirmation for most venue bookings, subject to real-time availability checks with the restaurant's system.",
    },
    {
      q: "Frequently Asked Question here, Question 3",
      a: "This is the corresponding answer for Question 3. We support various payment methods, including Stripe, Apple Pay, and Google Pay, ensuring a secure and seamless transaction process.",
    },
    {
      q: "Frequently Asked Question here, Question 4",
      a: "This is the corresponding answer for Question 4. You can modify or cancel your booking through your user dashboard, provided it meets the venue's cancellation policy cutoff time.",
    },
    {
      q: "Frequently Asked Question here, Question 5",
      a: "This is the corresponding answer for Question 5. Our recommendation engine uses your location, past preferences, and popularity data to suggest the best dining options for you right now.",
    },
    {
      q: "Frequently Asked Question here, Question 6",
      a: "This is the corresponding answer for Question 6. We partner only with premium venues that meet our strict quality and service standards, ensuring a luxurious experience every time.",
    },
    {
      q: "Frequently Asked Question here, Question 7",
      a: "This is the corresponding answer for Question 7. Yes, our platform is fully optimized for mobile browsing, allowing you to discover and book venues effortlessly on any device.",
    },
  ];

  const howItWorksSteps = [
    {
      icon: Search,
      title: "Discover Venues",
      desc: "Browse our curated selection of premium venues in your city",
    },
    {
      icon: CalendarDays,
      title: "Book Your Slot",
      desc: "Choose your preferred date and time slot with instant availability",
    },
    {
      icon: CheckCircle,
      title: "Confirmation",
      desc: "Choose your preferred date and time slot with instant availability",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      desc: "Pay securely with Stripe, Apple Pay, or Google Pay",
    },
  ];

  function onSearch() {
    router.push(
      `/search?loc=${encodeURIComponent(loc)}&date=${encodeURIComponent(
        date
      )}&guests=${guests}`
    );
  }

  return (
    <div
      className="min-h-screen bg-dark-bg text-light-white"
      style={{
        background:
          "radial-gradient(7.64% 111.53% at 0% 77.22%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(8.81% 67.5% at 96.67% 44.69%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(14.14% 32.54% at 1.11% -0.19%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(19.69% 150.83% at 101.94% 6.59%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), radial-gradient(8.97% 68.75% at -3.75% 22.84%, #064194 0%, rgba(14, 26, 43, 0.00) 100%), #0E1A2B",
      }}
    >
      {/* Hero Section */}
      <div
        className="relative min-h-[600px] md:min-h-[775px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.62) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&q=80')",
        }}
      >
        <Header lang={lang} setLang={setLang} />

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-14 flex flex-col items-center justify-center pt-16 md:pt-24 lg:pt-32 pb-10 md:pb-16 lg:pb-20">
          <div className="text-center max-w-[514px] mb-8 lg:mb-10">
            <h1 className="font-dm-sans text-4xl md:text-6xl font-light leading-[111%] tracking-tight text-white mb-4">
              Premium Venues Await Your Booking
            </h1>
            <p className="text-white text-base font-medium max-w-[448px] mx-auto">
              Discover and book the finest venues for your special occasions.
              Luxury dining experiences with instant confirmation.
            </p>
          </div>

          {/* Booking Form - now responsive */}
          <div className="w-full max-w-[664px] p-6 rounded-2xl border border-white/50 bg-gradient-to-b from-[rgba(33,60,98,0.7)] to-[rgba(0,0,0,0.7)] shadow-xl backdrop-blur-md">
            <h3 className="text-white text-base font-medium mb-4">
              Book a Table
            </h3>
            <div className="flex flex-wrap items-end gap-3 md:gap-4">
              {/* Location Input (Takes ~50% width on mobile) */}
              <div className="flex-1 min-w-[45%] md:min-w-[140px]">
                <label className="text-white/50 text-xs mb-1 block">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    className="w-full appearance-none bg-transparent text-white border border-white/40 rounded-md px-3 py-2 pr-8"
                  >
                    {uniqueLocations.map((c) => (
                      <option key={c} value={c} className="text-black">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Date Input (Takes ~50% width on mobile) */}
              <div className="flex-1 min-w-[45%] md:min-w-[140px]">
                <label className="text-white/50 text-xs mb-1 block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-white border border-white/40 rounded-md px-3 py-2"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              {/* Guests Input (Takes ~50% width on mobile) */}
              <div className="flex-1 min-w-[45%] md:min-w-[120px]">
                <label className="text-white/50 text-xs mb-1 block">
                  Guests
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full appearance-none bg-transparent text-white border border-white/40 rounded-md px-3 py-2 pr-8"
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <option key={i + 1} value={i + 1} className="text-black">
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Search Button (Full width on mobile, auto width on desktop) */}
              <Link
                onClick={onSearch}
                href="/explore"
                className={`w-full md:w-auto mt-4 md:mt-0 px-10 md:px-12 py-3.5 rounded-md text-white text-sm font-medium text-center`}
                style={{ backgroundColor: golden }}
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What's Your Best Dine Time */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-8 lg:py-10">
        <h2 className="text-2xl lg:text-[34px] font-normal mb-8 lg:mb-10">
          Whats Your Best Dine Time!
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {timeCategories.map((category, index) => (
            <div
              key={index}
              className={`relative h-[150px] sm:h-[203px] rounded-[18px] border ${
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
      <section className="max-w-[1440px] mx-auto py-8 lg:py-10">
        <div className="px-4 lg:px-16 flex justify-between items-end mb-6">
          <h2 className="text-2xl lg:text-[34px] font-normal">
            Book for dinner tonight in Adelaide
          </h2>
          <Link
            href="#"
            className="text-white/75 text-base lg:text-xl font-medium"
          >
            View all
          </Link>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            tabIndex={0}
            onMouseEnter={() => setAuto(false)}
            onMouseLeave={() => setAuto(true)}
            // Handle keyboard navigation only for accessibility (not primary touch input)
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") scrollNext();
              if (e.key === "ArrowLeft") scrollPrev();
            }}
            className="flex gap-8 px-4 lg:px-16 py-5 overflow-x-auto scrollbar-hide scroll-smooth"
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

          {/* Navigation Buttons */}
          <button
            aria-label="Previous"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full border border-white bg-gradient-to-b from-[rgba(0,0,0,0.57)] to-[rgba(33,60,98,0.57)] hidden md:flex items-center justify-center lg:left-7 lg:w-[50px] lg:h-[50px]"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            aria-label="Next"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full border border-white bg-white/10 hidden md:flex items-center justify-center lg:right-7 lg:w-[50px] lg:h-[50px]"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-8 lg:py-10">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-[34px] font-normal mb-2">
            How it works
          </h2>
          <p className="text-white/80 text-base font-medium">
            Simple Secure and instant venue booking in just 4 steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="p-6 md:p-8 rounded-xl border-2 border-white flex flex-col gap-2"
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
            Top Restaurant This Week
          </h2>
          <p className="text-white/50 text-base font-medium">
            Explore whats popular with other diners with these lists, updated
            weekly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {[1, 2, 3].map((col) => (
            <div key={col} className="flex flex-col gap-3">
              <h3 className="text-white text-xl font-medium mb-2">
                Top Booked
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
                    <Bookmark className="w-5 h-5 text-white" />
                  </div>
                  {item < 5 && <div className="h-px bg-[#7A7A7A] my-3"></div>}
                </div>
              ))}
              <Link href="#" className="text-white text-xs">
                View all
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-16 py-8 lg:py-10">
        <h2 className="text-2xl lg:text-[34px] font-normal text-white mb-8 lg:mb-12">
          Latest reviews
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
                  Review title
                </h3>
                <p className="text-white text-base">Review body</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                <div className="flex-1">
                  <div className="text-[#757575] text-base font-bold">
                    Reviewer name
                  </div>
                  <div className="text-[#B3B3B3] text-base">Date</div>
                </div>
              </div>
              <div>
                <div className="text-[#757575] text-base font-bold">
                  Restaurant Name
                </div>
                <div className="text-[#B3B3B3] text-base">Street Name</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ask for Suggestion (omitted for brevity) */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-8 lg:py-10 text-center">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-[34px] font-normal mb-2">
            Ask for Suggestion
          </h2>
          <p className="text-white/80 text-base font-medium">
            Cant decide where to go? Let us help you!
          </p>
        </div>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter your preferences (e.g., 'romantic Italian with a view')"
            className="flex-grow bg-transparent border border-white rounded-md p-3 text-white placeholder-white/50"
          />
          <button
            className={`w-full sm:w-auto px-8 py-3.5 rounded-md text-white text-sm font-medium`}
            style={{ backgroundColor: golden }}
          >
            Get Suggestion
          </button>
        </div>
      </section>

      {/* Discover Cuisines (omitted for brevity) */}
      <section className="max-w-[1440px] mx-auto py-8 lg:py-10">
        <div className="px-4 lg:px-16 flex justify-between items-end mb-6">
          <h2 className="text-2xl lg:text-[34px] font-normal">
            Discover Cuisines
          </h2>
          <Link
            href="#"
            className="text-white/75 text-base lg:text-xl font-medium"
          >
            View all
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-8 px-4 lg:px-16 py-5 overflow-x-auto scrollbar-hide"
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
          {/* Navigation Arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full border border-white bg-gradient-to-b from-[rgba(0,0,0,0.57)] to-[rgba(33,60,98,0.57)] backdrop-blur-[44px] hidden md:flex items-center justify-center lg:left-7 lg:w-[50px] lg:h-[50px]">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full border border-white bg-white/10 backdrop-blur-[7.5px] hidden md:flex items-center justify-center lg:right-7 lg:w-[50px] lg:h-[50px]">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1440px] mx-auto px-4 lg:px-14 py-8 lg:py-10">
        <div className="mb-8 lg:mb-12">
          <h2 className="text-white text-2xl lg:text-[34px] font-normal mb-2">
            FAQ
          </h2>
          <p className="text-white/75 text-base font-medium">
            You Got Questions, We Got Answers
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
            Join Our Table
          </h2>
          <p className="text-white/80 text-base font-medium">
            Subscribe to our newsletter for the latest updates and exclusive
            offers.
          </p>
        </div>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-transparent border border-white rounded-md p-3 text-white placeholder-white/50"
          />
          <button
            className={`w-full sm:w-auto px-8 py-3.5 rounded-md text-white text-sm font-medium`}
            style={{ backgroundColor: golden }}
          >
            Subscribe
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
