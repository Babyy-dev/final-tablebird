// app/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
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

// Local Imports: FIXING THE DATA PATH ERROR
import { destinations as allRestaurants } from "@/lib/data/destinations";
import Header from "@/components/Header";

export default function Index() {
  const golden = "#D4AF37"; // Assuming this is the correct gold from your latest CSS

  // Header state (passed to Header component)
  const [lang, setLang] = useState<"EN" | "BG">("EN");

  // Booking box state
  const uniqueLocations = useMemo(
    () => Array.from(new Set(allRestaurants.map((r) => r.location))),
    []
  );
  const defaultLoc = uniqueLocations.includes("Sofia")
    ? "Sofia"
    : uniqueLocations[0] ?? "Adelaide";
  const [loc, setLoc] = useState(defaultLoc);
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [guests, setGuests] = useState<number>(2);

  // Carousel Logic
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [auto, setAuto] = useState(true);
  const CARD_W = 340;
  const restaurantImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
  ];

  const scrollNext = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft + CARD_W >= max) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: CARD_W, behavior: "smooth" });
    }
  }, [CARD_W]);

  const scrollPrev = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (el.scrollLeft <= 0) {
      el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: "auto" });
    } else {
      el.scrollBy({ left: -CARD_W, behavior: "smooth" });
    }
  }, [CARD_W]);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(scrollNext, 4000);
    return () => clearInterval(id);
  }, [auto, scrollNext]);

  // Global keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      if (tag === "input" || tag === "select" || tag === "textarea") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollNext, scrollPrev]);

  // Data Definitions (pulled from previous context)
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
    "Frequently Asked Question here, Question 1",
    "Frequently Asked Question here, Question 2",
    "Frequently Asked Question here, Question 3",
    "Frequently Asked Question here, Question 4",
    "Frequently Asked Question here, Question 5",
    "Frequently Asked Question here, Question 6",
    "Frequently Asked Question here, Question 7",
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

  // function onSearch() {
  //   router.push(
  //     `/search?loc=${encodeURIComponent(loc)}&date=${encodeURIComponent(
  //       date
  //     )}&guests=${guests}`
  //   );
  // }

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
        className="relative min-h-[775px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.62) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&q=80')",
        }}
      >
        {/* Header/Navigation: Using the dedicated component */}
        <Header lang={lang} setLang={setLang} />

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-14 flex flex-col items-center justify-center pt-24 lg:pt-32 pb-16 lg:pb-20">
          <div className="text-center max-w-[514px] mb-10">
            <h1 className="font-dm-sans text-4xl md:text-6xl font-light leading-[111%] tracking-tight text-white mb-4">
              Premium Venues Await Your Booking
            </h1>
            <p className="text-white text-base font-medium max-w-[448px] mx-auto">
              Discover and book the finest venues for your special occasions.
              Luxury dining experiences with instant confirmation.
            </p>
          </div>

          {/* Booking Form - functional */}
          <div className="w-full max-w-[900px] p-6 md:p-8 rounded-2xl border border-[#D9D9D9] bg-gradient-to-b from-[rgba(33,60,98,0.55)] to-[rgba(0,0,0,0.55)] shadow-md backdrop-blur-md">
            <h3 className="text-white text-base font-medium mb-4 px-3">
              Book a Table
            </h3>
            <div className="flex flex-wrap items-end gap-6 md:gap-10">
              <div className="flex-1 min-w-[140px]">
                <label className="text-white/50 text-xs mb-1 px-3">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    className="w-full appearance-none bg-transparent text-white rounded-md px-3 py-2 pr-8"
                  >
                    {uniqueLocations.map((c) => (
                      <option key={c} value={c} className="text-black">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="h-7 w-px bg-white/30 hidden md:block"></div>
              <div className="flex-1 min-w-[140px]">
                <label className="text-white/50 text-xs mb-1 block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-white  rounded-md px-3 py-2"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div className="h-7 w-px bg-white/30 hidden md:block"></div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-white/50 text-xs mb-1 block">
                  Guests
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full appearance-none bg-transparent text-white rounded-md px-3 py-2 pr-8"
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <option key={i + 1} value={i + 1} className="text-black">
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white absolute right-25 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <Link
                href="/explore"
                className={`px-10 md:px-12 py-3.5 rounded-md text-white text-sm font-medium text-center`}
                style={{ backgroundColor: golden }}
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What's Your Best Dine Time */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 py-10">
        <h2 className="text-[34px] font-normal mb-10">
          Whats Your Best Dine Time!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {timeCategories.map((category, index) => (
            <div
              key={index}
              className={`relative h-[203px] rounded-[18px] border ${
                index === 2 ? "border-2 border-white" : "border border-white"
              } overflow-hidden group cursor-pointer transition-transform hover:scale-105`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(33, 60, 98, 0.00) 55.67%, rgba(0, 0, 0, 0.91) 98.03%), url('${category.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute bottom-3 left-3.5">
                <h3 className="text-white text-2xl font-normal">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurant Carousel Section */}
      <section className="max-w-[1440px] mx-auto py-10">
        <div className="px-6 lg:px-16 flex justify-between items-end mb-6">
          <h2 className="text-[34px] font-normal">
            Book for dinner tonight in Adelaide
          </h2>
          <Link href="#" className="text-white/75 text-xl font-medium">
            View all
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              tabIndex={0}
              onMouseEnter={() => setAuto(false)}
              onMouseLeave={() => setAuto(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") scrollNext();
                if (e.key === "ArrowLeft") scrollPrev();
              }}
              className="flex gap-8 px-6 lg:px-16 py-5 transition-transform scroll-smooth overflow-x-auto scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {restaurantImages.map((img, index) => (
                <div
                  key={index}
                  className="min-w-[315px] h-[307px] rounded-md border border-white overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%), url('${img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="h-full p-4 flex flex-col justify-end">
                    <h3 className="text-white text-xl font-medium mb-2">
                      La coco
                    </h3>
                    <p className="text-white/60 text-sm mb-3">
                      Italian $$ • Street Name
                    </p>
                    <div className="inline-flex items-center px-2 py-1 rounded bg-[#125604] w-fit">
                      <span className="text-[#5F5] text-sm font-medium">
                        4.2
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            aria-label="Previous"
            onClick={scrollPrev}
            className="absolute left-7 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border border-white bg-gradient-to-b from-[rgba(0,0,0,0.57)] to-[rgba(33,60,98,0.57)] backdrop-blur-[44px] flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            aria-label="Next"
            onClick={scrollNext}
            className="absolute right-7 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border border-white bg-white/10 backdrop-blur-[7.5px] flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 py-10">
        <div className="mb-8">
          <h2 className="text-[34px] font-normal mb-2">How it works</h2>
          <p className="text-white/80 text-base font-medium">
            Simple Secure and instant venue booking in just 4 steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border-2 border-white flex flex-col gap-2"
            >
              <step.icon className={`w-7 h-7 mb-2`} style={{ color: golden }} />
              <h3 className="text-white text-xl font-medium">{step.title}</h3>
              <p className="text-white text-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Restaurant This Week */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 py-10">
        <div className="mb-10">
          <h2 className="text-[34px] font-normal mb-2">
            Top Restaurant This Week
          </h2>
          <p className="text-white/50 text-base font-medium">
            Explore whats popular with other diners with these lists, updated
            weekly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {[1, 2, 3].map((col) => (
            <div key={col} className="flex flex-col gap-3">
              <h3 className="text-white text-xl font-medium mb-2">
                Top Booked
              </h3>
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item}>
                  <div className="flex items-center gap-5 pr-4">
                    <Image
                      src={`https://images.unsplash.com/photo-1517248135467 + ${item}?w=200&q=80`}
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
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-10">
        <h2 className="text-[34px] font-normal text-white mb-12">
          Latest reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((review) => (
            <div
              key={review}
              className="p-6 rounded-lg border border-white bg-white/5 backdrop-blur-[7.5px] flex flex-col gap-6"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 text-[${golden}] fill-[${golden}]`}
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

      {/* Ask for Suggestion */}
      <section className="max-w-[1440px] mx-auto px-14 py-10 text-center">
        <div className="mb-8">
          <h2 className="text-[34px] font-normal mb-2">Ask for Suggestion</h2>
          <p className="text-white/80 text-base font-medium">
            Cant decide where to go? Let us help you!
          </p>
        </div>
        <div className="max-w-2xl mx-auto flex gap-4">
          <input
            type="text"
            placeholder="Enter your preferences (e.g., 'romantic Italian with a view')"
            className="flex-grow bg-transparent border border-white rounded-md p-3 text-white placeholder-white/50"
          />
          <button
            className={`px-8 py-3.5 rounded-md text-white text-sm font-medium`}
            style={{ backgroundColor: golden }}
          >
            Get Suggestion
          </button>
        </div>
      </section>

      {/* Discover Cuisines */}
      <section className="max-w-[1440px] mx-auto py-10">
        <div className="px-16 flex justify-between items-end mb-6">
          <h2 className="text-[34px] font-normal">Discover Cuisines</h2>
          <Link href="#" className="text-white/75 text-xl font-medium">
            View all
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex gap-8 px-16 py-5">
              {cuisineImages.map((cuisine, index) => (
                <div
                  key={index}
                  className="min-w-[315px] h-[307px] rounded-md border border-white overflow-hidden relative"
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
          <button className="absolute left-7 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border border-white bg-gradient-to-b from-[rgba(0,0,0,0.57)] to-[rgba(33,60,98,0.57)] backdrop-blur-[44px] flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button className="absolute right-7 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border border-white bg-white/10 backdrop-blur-[7.5px] flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-14 py-10">
        <div className="mb-12">
          <h2 className="text-white text-[34px] font-normal mb-2">FAQ</h2>
          <p className="text-white/75 text-base font-medium">
            You Got Questions, We Got Answers
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {faqItems.map((question, index) => (
            <div
              key={index}
              className="p-6 rounded-[10px] border border-white bg-white/5 backdrop-blur-[7.5px] flex items-center justify-between"
            >
              <span className="text-white text-base font-medium flex-1">
                {question}
              </span>
              <ChevronDown className="w-8 h-8 text-white rotate-0 transition-transform" />
            </div>
          ))}
        </div>
      </section>

      {/* Join Our Table */}
      <section className="max-w-[1440px] mx-auto px-14 py-16 text-center">
        <div className="mb-8">
          <h2 className="text-[34px] font-normal mb-2">Join Our Table</h2>
          <p className="text-white/80 text-base font-medium">
            Subscribe to our newsletter for the latest updates and exclusive
            offers.
          </p>
        </div>
        <div className="max-w-xl mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-transparent border border-white rounded-md p-3 text-white placeholder-white/50"
          />
          <button
            className={`px-8 py-3.5 rounded-md text-white text-sm font-medium`}
            style={{ backgroundColor: golden }}
          >
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white bg-gradient-to-b from-[#213C62] to-black">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
          <div className="flex justify-between mb-12">
            {/* Social Links */}
            <div className="flex flex-col gap-6 min-w-[262px]">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F4F4F4">
                  <path d="M14.2737 10.9995L23.2023 0.835938H21.0872L13.3313 9.65899L7.14125 0.835938H0L9.3626 14.1792L0 24.8359H2.11504L10.3002 15.5165L16.8388 24.8359H23.98M2.8784 2.39784H6.12769L21.0856 23.3508H17.8355" />
                </svg>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F4F4F4">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
                </svg>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F4F4F4">
                  <path d="M20.595 4.02C16.991 3.774 8.964 3.775 5.365 4.02C1.468 4.286 1.009 6.64 0.98 12.836C1.009 19.021 1.464 21.385 5.365 21.652C8.965 21.897 16.991 21.898 20.595 21.652C24.492 21.386 24.951 19.032 24.98 12.836C24.951 6.651 24.496 4.287 20.595 4.02ZM9.98 16.836V8.836L17.98 12.829L9.98 16.836Z" />
                </svg>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F4F4F4">
                  <path d="M19 3H5C3.895 3 3 3.895 3 5v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zM9 19H6V9h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V9h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex gap-12">
              <div>
                <h3 className="text-light-white text-base font-bold mb-6">
                  Tablebird
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-light-white text-base font-bold mb-6">
                  Explore
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Restaurants
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Near me
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-light-white text-base font-bold mb-6">
                  Profile
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/Login"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Register"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Saves
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-light-white text-base hover:text-[#BC995D] transition"
                    >
                      Restaurant management
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-light-white text-base font-bold mb-6">
                  Contact info
                </h3>
                <div className="space-y-3 text-white text-base">
                  <p>
                    Sofia, Bulgaria
                    <br />
                    Plovdiv, Bulgaria
                  </p>
                  <p>+359 888 123 456</p>
                  <p>info@tablebird.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex justify-between items-center">
            <p className="text-white text-base">
              © 2025 TableBird. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link
                href="#"
                className="text-white text-sm hover:text-[#BC995D] transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white text-sm hover:text-[#BC995D] transition"
              >
                Terms of service
              </Link>
              <Link
                href="#"
                className="text-white text-sm hover:text-[#BC995D] transition"
              >
                Cookie policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
