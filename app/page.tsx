"use client";

import React from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  Bookmark,
  CalendarDays,
  CheckCircle,
  CreditCard,
} from "lucide-react";

export default function Home() {
  const restaurantImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
  ];

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
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
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

  const topRestaurants = {
    "Top Booked": [
      {
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80",
        name: "La Trattoria",
      },
      {
        image:
          "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=200&q=80",
        name: "The Grill House",
      },
      {
        image:
          "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=200&q=80",
        name: "Ocean's Catch",
      },
      {
        image:
          "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=200&q=80",
        name: "The Brunch Club",
      },
      {
        image:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=200&q=80",
        name: "Spice Route",
      },
    ],
    Trending: [
      {
        image:
          "https://images.unsplash.com/photo-1498654896293-37a11aa421d4?w=200&q=80",
        name: "The Noodle Bar",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=200&q=80",
        name: "Pizza Palace",
      },
      {
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=80",
        name: "The Pancake House",
      },
      {
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&q=80",
        name: "Salad Sensations",
      },
      {
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80",
        name: "Vegan Vibes",
      },
    ],
    New: [
      {
        image:
          "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&q=80",
        name: "The Corner Bistro",
      },
      {
        image:
          "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=200&q=80",
        name: "Morning Bites",
      },
      {
        image:
          "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=200&q=80",
        name: "Pasta Perfect",
      },
      {
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&q=80",
        name: "Sweet Dreams Desserts",
      },
      {
        image:
          "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200&q=80",
        name: "Steakhouse Supreme",
      },
    ],
  };

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
        {/* Header/Navigation */}
        <header className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-[1440px] mx-auto px-14 py-6 flex justify-between items-center">
            {/* Logo */}
            {/* <div className="flex-shrink-0">
              <Image src="" alt="Logo" width={140} height={44} />
            </div> */}

            <div className="flex items-center gap-x-4">
              {/* Location Selector */}
              <div className="flex items-center gap-2 border border-white/50 rounded-full px-4 py-1.5 bg-black/20 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-white" />
                <div>
                  <p className="text-xs text-white/70 leading-none">Location</p>
                  <p className="text-sm font-medium text-white leading-none">
                    Sofia
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-2 border border-white/50 rounded-full px-4 py-2.5 bg-black/20 backdrop-blur-sm w-72">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-white placeholder-white/80 outline-none w-full text-sm"
                />
                <Search className="w-5 h-5 text-white" />
              </div>

              {/* Language Toggle */}
              <div className="flex items-center border border-white/50 rounded-full p-1 bg-black/20 backdrop-blur-sm">
                <button className="px-3 py-1 rounded-full bg-golden text-black text-sm font-semibold">
                  EN
                </button>
                <button className="px-3 py-1 text-white text-sm">BG</button>
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center gap-6 pl-4">
                <a
                  href="#"
                  className="text-white text-sm font-medium hover:text-golden transition-colors"
                >
                  Restaurants
                </a>
                <a
                  href="#"
                  className="text-white text-sm font-medium hover:text-golden transition-colors"
                >
                  Bars
                </a>
                <a
                  href="#"
                  className="text-white/70 text-sm font-medium hover:text-golden transition-colors"
                >
                  Clubs
                </a>
                <a
                  href="#"
                  className="text-white text-sm font-medium hover:text-golden transition-colors"
                >
                  Favourites
                </a>
              </nav>

              {/* Register Button */}
              <button className="ml-4 px-8 py-3 rounded-md bg-[#BC995D] text-white text-sm font-medium shadow-lg hover:bg-opacity-90 transition-colors">
                Register
              </button>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="max-w-[1440px] mx-auto px-14 flex flex-col items-center justify-center pt-52 pb-20">
          <div className="text-center max-w-[514px] mb-10">
            <h1 className="font-dm-sans text-6xl font-light leading-[111%] tracking-tight text-white mb-4">
              Premium Venues Await Your Booking
            </h1>
            <p className="text-white text-base font-medium max-w-[448px] mx-auto">
              Discover and book the finest venues for your special occasions.
              Luxury dining experiences with instant confirmation.
            </p>
          </div>

          {/* Booking Form */}
          <div className="w-full max-w-[664px] p-8 rounded-2xl border border-white bg-gradient-to-b from-[rgba(33,60,98,0.55)] to-[rgba(0,0,0,0.55)] shadow-md backdrop-blur-md">
            <h3 className="text-white text-base font-medium mb-4">
              Book a Table
            </h3>
            <div className="flex flex-wrap items-end gap-10">
              <div className="flex-1 min-w-[100px]">
                <label className="text-white/50 text-xs mb-1 block">
                  Location
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-white text-base font-medium">
                    Seville
                  </span>
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="h-7 w-px bg-white/50"></div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-white/50 text-xs mb-1 block">Date</label>
                <div className="flex items-center gap-2">
                  <span className="text-white text-base font-medium">
                    05-10-2025
                  </span>
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="h-7 w-px bg-white/50"></div>
              <div className="flex-1 min-w-[80px]">
                <label className="text-white/50 text-xs mb-1 block">
                  Guests
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-white text-base font-medium">07</span>
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              </div>
              <button className="px-12 py-3.5 rounded-md bg-golden text-white text-sm font-medium text-center">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What's Your Best Dine Time */}
      <section className="max-w-[1440px] mx-auto px-14 py-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[34px] font-normal">
            What's Your Best Dine Time!
          </h2>
          <a href="#" className="text-white/75 text-xl font-medium">
            View all
          </a>
        </div>
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
        <div className="px-16 flex justify-between items-end mb-6">
          <h2 className="text-[34px] font-normal">
            Book for dinner tonight in Adelaide
          </h2>
          <a href="#" className="text-white/75 text-xl font-medium">
            View all
          </a>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex gap-8 px-16 py-5">
              {restaurantImages.map((img, index) => (
                <div
                  key={index}
                  className="min-w-[315px] h-[307px] rounded-md border border-white overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%), url('${img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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
          <button className="absolute left-7 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border border-white bg-gradient-to-b from-[rgba(0,0,0,0.57)] to-[rgba(33,60,98,0.57)] backdrop-blur-[44px] flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button className="absolute right-7 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border border-white bg-white/10 backdrop-blur-[7.5px] flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-[1440px] mx-auto px-14 py-10">
        <div className="mb-8">
          <h2 className="text-[34px] font-normal mb-2">How it works</h2>
          <p className="text-white/80 text-base font-medium">
            Simple Secure and instant venue booking in just 4 steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
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
          ].map((step, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border-2 border-white flex flex-col gap-2"
            >
              <step.icon className="w-7 h-7 text-golden mb-2" />
              <h3 className="text-white text-xl font-medium">{step.title}</h3>
              <p className="text-white text-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Restaurant This Week */}
      <section className="max-w-[1440px] mx-auto px-14 py-10">
        <div className="mb-10">
          <h2 className="text-[34px] font-normal mb-2">
            Top Restaurant This Week
          </h2>
          <p className="text-white/50 text-base font-medium">
            Explore what's popular with other diners with these lists, updated
            weekly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {Object.entries(topRestaurants).map(([title, restaurants]) => (
            <div key={title} className="flex flex-col gap-3">
              <h3 className="text-white text-xl font-medium mb-2">{title}</h3>
              {restaurants.map((item, index) => (
                <div key={item.name}>
                  <div className="flex items-center gap-5 pr-4">
                    <Image
                      src={item.image}
                      alt="Restaurant"
                      width={92}
                      height={92}
                      className="w-[92px] h-[92px] rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white text-xl font-medium mb-2">
                        {item.name}
                      </h4>
                      <p className="text-white/40 text-xs mb-3">
                        Italian $$ • Street Name
                      </p>
                      <div className="inline-flex items-center px-2 py-0.5 rounded bg-[#125604]">
                        <span className="text-[#5F5] text-sm font-medium">
                          4.2
                        </span>
                      </div>
                    </div>
                    <Bookmark className="w-5 h-5 text-light-white" />
                  </div>
                  {index < restaurants.length - 1 && (
                    <div className="h-px bg-[#7A7A7A] my-3"></div>
                  )}
                </div>
              ))}
              <a href="#" className="text-light-white text-xs">
                View all
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="max-w-[1440px] mx-auto px-16 py-10">
        <h2 className="text-[34px] font-normal text-light-white mb-12">
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
                    className="w-5 h-5 text-golden fill-golden"
                    strokeWidth={1}
                  />
                ))}
              </div>
              <div>
                <h3 className="text-light-white text-2xl font-bold mb-1">
                  Review title
                </h3>
                <p className="text-light-white text-base">Review body</p>
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
            Can't decide where to go? Let us help you!
          </p>
        </div>
        <div className="max-w-2xl mx-auto flex gap-4">
          <input
            type="text"
            placeholder="Enter your preferences (e.g., 'romantic Italian with a view')"
            className="flex-grow bg-transparent border border-white rounded-md p-3 text-white placeholder-white/50"
          />
          <button className="px-8 py-3.5 rounded-md bg-golden text-white text-sm font-medium">
            Get Suggestion
          </button>
        </div>
      </section>

      {/* Discover Cuisines */}
      <section className="max-w-[1440px] mx-auto py-10">
        <div className="px-16 flex justify-between items-end mb-6">
          <h2 className="text-[34px] font-normal">Discover Cuisines</h2>
          <a href="#" className="text-white/75 text-xl font-medium">
            View all
          </a>
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
      <section className="max-w-[1440px] mx-auto px-14 py-10">
        <div className="mb-12">
          <h2 className="text-light-white text-[34px] font-normal mb-2">FAQ</h2>
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
          <button className="px-8 py-3.5 rounded-md bg-golden text-white text-sm font-medium">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white bg-gradient-to-b from-[#213C62] to-black">
        <div className="max-w-[1440px] mx-auto px-16 py-12">
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
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Press
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-light-white text-base font-bold mb-6">
                  Explore
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Restaurants
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Near me
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-light-white text-base font-bold mb-6">
                  Profile
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Saves
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Bookings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-light-white text-base hover:text-golden transition"
                    >
                      Restaurant management
                    </a>
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
              <a
                href="#"
                className="text-white text-sm hover:text-golden transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white text-sm hover:text-golden transition"
              >
                Terms of service
              </a>
              <a
                href="#"
                className="text-white text-sm hover:text-golden transition"
              >
                Cookie policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
