// app/Register/page.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const golden = "#BC995D";
  const [lang, setLang] = useState<"EN" | "BG">("EN"); // State for Header

  return (
    <div className="min-h-screen flex flex-col bg-[#0E1A2B] text-white">
      <Header lang={lang} setLang={setLang} isTransparent={false} />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={`w-full p-3 rounded-md bg-white/10 border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BC995D]`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full p-3 rounded-md bg-white/10 border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BC995D]`}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                className={`w-full p-3 rounded-md bg-white/10 border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BC995D]`}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-3 rounded-md text-black text-lg font-semibold hover:bg-opacity-90 transition-colors`}
              style={{ backgroundColor: golden, color: "#0A1E3C" }}
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link href="/Login" className={`text-[#BC995D] hover:underline`}>
              Log In here
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-white/70">
            <Link href="/" className="text-white/50 hover:underline">
              Go to Home
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
