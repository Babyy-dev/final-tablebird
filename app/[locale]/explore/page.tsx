// app/explore/page.tsx
"use client";

import {
  useMemo,
  useState,
  Suspense,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RestaurantCard } from "@/components/RestaurantCard";
import MapView, { MapMarker } from "@/components/MapView";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  UtensilsCrossed,
  Wine,
  Disc,
  ChevronDown,
  Clock,
} from "lucide-react";

import { restaurants } from "@/lib/data/restaurants";

function SearchParamsLoader({ children }: { children: React.ReactNode }) {
  return children;
}

// 2. Core Page Component
function ExplorePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const navyDark = "#0E1A2B";
  
  // Translation hooks
  const t = useTranslations('explore');

  // State initialization
  const [time, setTime] = useState(searchParams.get("time") || "19:00");
  const [date, setDate] = useState(
    searchParams.get("date") || new Date().toISOString().slice(0, 10)
  );
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 7);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lang, setLang] = useState<"EN" | "BG">("EN");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  
  // Initialize language state based on pathname - default to English
  useEffect(() => {
    const currentLang = pathname.startsWith('/bg') ? 'BG' : 'EN';
    setLang(currentLang);
  }, [pathname]);
  // const [isMapVisible, setIsMapVisible] = useState(false); // Assuming you kept this from the previous fix

  const timeRef = useRef<HTMLSelectElement>(null);
  const guestsRef = useRef<HTMLSelectElement>(null);
  const dateBoxRef = useRef<HTMLDivElement>(null);

  // Handlers for inputs
  const onTimeChange = (v: string) => setTime(v);
  const onDateChange = (v: string) => setDate(v);
  const onGuestsChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setGuests(parseInt(e.target.value, 10));
  const openDate = () => setShowDateDropdown((s) => !s);

  // Close date dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dateBoxRef.current) return;
      if (!dateBoxRef.current.contains(e.target as Node))
        setShowDateDropdown(false);
    };
    if (showDateDropdown) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [showDateDropdown]);

  const mapCenter = useMemo(
    () => ({
      lat: 42.6977, // Sofia Latitude (Mock location based on context)
      lng: 23.3219, // Sofia Longitude
    }),
    []
  );

  // Markers definition
  // Markers definition - UPDATED for Google Maps lat/lng structure
  const markers: MapMarker[] = useMemo(
    () =>
      restaurants.map((r) => ({
        id: String(r.id),
        name: r.name,
        rating: r.rating,
        price: r.price,
        cuisine: r.cuisine,
        location: r.location,
        image: r.image,
        reviews: "2.5k",
        priceAlt: "78.23лв",
        distance: "1 km",
        bookedTimes: 4,
        countdown: "19:59:43",
        lat: mapCenter.lat + (r.y - 0.5) * 0.05,
        lng: mapCenter.lng + (r.x - 0.5) * 0.1,
      })),
    [mapCenter]
  );

  const dateLabel = useMemo(() => {
    if (!date) return "";
    const [y, m, d] = date.split("-");
    return `${d}-${m}-${y}`;
  }, [date]);

  // Markers and select handlers for MapView/RestaurantCard linkage
  const handleSelect = (id: string | number | null) => {
    setSelectedId(id ? String(id) : null);
  };

  // FIX: New handler for card click to navigate
  const handleCardClick = (id: number) => {
    const currentLocale = pathname.startsWith('/bg') ? 'bg' : 'en';
    const venuePath = currentLocale === 'en' ? `/venue/${id}` : `/bg/venue/${id}`;
    router.push(venuePath);
  };

  // Mock data for filter buttons
  const filterCategories = [
    { icon: UtensilsCrossed, label: t('restaurant'), active: true },
    { icon: Wine, label: t('bars'), active: false },
    { icon: Disc, label: t('clubs'), active: false },
  ];
  const filterSorts = [t('tops'), t('populars')];

  // Mock the countdown timer for consistency
  const countdown = "19:59:43";

  return (
    <div
      className="min-h-screen flex flex-col w-full"
      style={{
        background: `radial-gradient(20.62% 53.89% at 100% 76.15%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            radial-gradient(49.93% 70.21% at 50% 0%, #064194 20%, rgba(14, 26, 43, 0.00) 50%),
            linear-gradient(0deg, ${navyDark} 0%, ${navyDark} 100%)`,
      }}
    >
      <Header lang={lang} setLang={setLang} isTransparent={false} />

      {/* Hero / Filter Section */}
      <div>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-[60px]">
          {/* Title Row */}
          <h1 className="text-gray-400 text-base md:text-[20px] mb-6 md:mb-8 flex items-baseline gap-2">
            <span>{t('available_now_in')}</span>
            <span className="text-xl md:text-[34px] text-white">Sofia</span>
          </h1>

          {/* Main Booking Bar (Simplified content structure for brevity) */}
          <div className="relative flex flex-col md:flex-row items-center gap-4 p-4 md:px-4 md:py-4 rounded-xl border border-[#D4AF37] bg-[#0E1A2B]/[0.45] backdrop-blur-[7.5px] w-lg mb-6">
            <Calendar className="w-7 h-7 text-white flex-shrink-0 hidden sm:block" />

            <div className="flex w-full justify-between items-center gap-4">
              {/* Time Input */}
              <div className="flex flex-col flex-1 min-w-[20%]">
                <span className="text-[10px] text-white/50 tracking-[0.15px] mb-1">
                  {t('time')}
                </span>
                <div className="relative inline-flex items-start gap-0">
                  <select
                    ref={timeRef}
                    value={time}
                    onChange={(e) => onTimeChange(e.target.value)}
                    className="appearance-none bg-transparent text-white text-base font-medium tracking-[0.024px] focus:outline-none pr-6 w-full"
                  >
                    {Array.from({ length: 48 }).map((_, i) => {
                      const minutes = i * 30;
                      const hh = Math.floor(minutes / 60);
                      const mm = minutes % 60;
                      const value = `${String(hh).padStart(2, "0")}:${
                        mm === 0 ? "00" : "30"
                      }`;
                      const hour12 = ((hh + 11) % 12) + 1;
                      const ampm = hh < 12 ? "am" : "pm";
                      const label = `${hour12}:${
                        mm === 0 ? "00" : "30"
                      }${ampm}`;
                      return (
                        <option
                          key={value}
                          value={value}
                          className="text-black"
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>
                  <Clock className="w-4 h-4 rotate-90 absolute right-0 text-white/50 pointer-events-none" />
                </div>
              </div>

              <div className="w-px h-7 bg-white/50 hidden sm:block" />

              {/* Date Input */}
              <div
                className="flex flex-col flex-1 min-w-[30%]"
                ref={dateBoxRef}
              >
                <span className="text-[10px] text-white/50 tracking-[0.15px] mb-1">
                  {t('date')}
                </span>
                <div className="relative inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={openDate}
                    className="bg-transparent text-white text-base font-medium tracking-[0.024px] focus:outline-none flex items-center gap-1"
                  >
                    {dateLabel}
                    <Calendar className="w-4 h-4 text-white/50" />
                  </button>
                  {/* Date Dropdown/Calendar placeholder logic */}
                  {showDateDropdown && (
                    <div className="absolute left-0 top-[110%] z-20 w-64 max-h-64 overflow-auto rounded-lg border border-white/20 bg-black/70 backdrop-blur shadow-xl p-2">
                      {/* Placeholder days map (omitted for brevity) */}
                      {Array.from({ length: 60 }).map((_, idx) => {
                        const base = new Date();
                        base.setDate(base.getDate() + idx);
                        const yyyy = base.getFullYear();
                        const mm = String(base.getMonth() + 1).padStart(2, "0");
                        const dd = String(base.getDate()).padStart(2, "0");
                        const iso = `${yyyy}-${mm}-${dd}`;
                        const label = `${dd}-${mm}-${yyyy}`;
                        return (
                          <button
                            key={iso}
                            type="button"
                            onClick={() => {
                              onDateChange(iso);
                              setShowDateDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-white ${
                              date === iso ? "bg-white/15" : ""
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-px h-7 bg-white/50 hidden sm:block" />

              {/* Guests Input */}
              <div className="flex flex-col flex-1 min-w-[30%]">
                <span className="text-[10px] text-white/50 tracking-[0.15px] mb-1">
                  {t('guests')}
                </span>
                <div className="relative inline-flex items-center gap-1">
                  <select
                    ref={guestsRef}
                    value={guests}
                    onChange={onGuestsChange}
                    className="appearance-none bg-transparent text-white text-base font-medium tracking-[0.024px] focus:outline-none pr-6 w-full"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n} className="text-black">
                        {n.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 rotate-90 absolute right-0 text-white/50 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search Button (omitted for brevity) */}
          </div>

          {/* Category Filter Buttons (omitted for brevity) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {filterCategories.map((btn) => (
              <button
                key={btn.label}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md border-[0.5px] border-white text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                  btn.active
                    ? "bg-white/10 text-white"
                    : "bg-transparent text-gray-400"
                }`}
              >
                <btn.icon className="w-5 h-5" />
                {btn.label}
              </button>
            ))}
          </div>

          {/* Sort Buttons (omitted for brevity) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-hide">
            {filterSorts.map((sort, index) => (
              <button
                key={sort}
                className={`px-4 py-1.5 rounded-md border-[0.5px] border-white text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                  index === 0
                    ? "bg-white/10 text-white"
                    : "bg-transparent text-gray-400"
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* End Hero / Filter Section */}

      {/* Main Content: List and Map - Mobile/Tablet optimized */}
      <div className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 md:px-[42px] py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Restaurant List - Single column mobile/tablet, two columns desktop */}
            <div className="flex-1 overflow-y-auto lg:max-h-none">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 justify-items-center">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="w-full max-w-[400px] xl:max-w-[340px] cursor-pointer"
                    onClick={() => handleCardClick(restaurant.id)}
                    onMouseEnter={() => handleSelect(restaurant.id)}
                    onMouseLeave={() => handleSelect(null)}
                  >
                    <RestaurantCard
                      id={restaurant.id}
                      name={restaurant.name}
                      rating="4.2"
                      price={restaurant.price}
                      priceAlt="78.23лв"
                      distance="1 km"
                      cuisine={restaurant.cuisine}
                      address="Street Name"
                      bookedTimes={restaurant.id}
                      reviews="2.5k"
                      image={restaurant.image}
                      location={restaurant.location}
                      tags={restaurant.tags}
                      countdown={countdown}
                      onSelect={handleSelect}
                      isExplorePage={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sticky Map View */}
            <div className="w-full lg:w-[500px] lg:shrink-0">
              <div className="sticky top-24 h-[400px] sm:h-[500px] lg:h-[600px] z-10">
                <MapView
                  markers={markers}
                  selectedId={selectedId}
                  center={mapCenter}
                  onSelect={handleSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// 3. Default export wraps the content component in Suspense for safe server/client rendering
export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0E1A2B] flex items-center justify-center text-white text-xl">
          {/* Note: Can't use translations in fallback since it's outside provider context */}
          Loading Map and Filters...
        </div>
      }
    >
      <SearchParamsLoader>
        <ExplorePageContent />
      </SearchParamsLoader>
    </Suspense>
  );
}
