// app/Login/page.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Mock assets path (replace with actual if available)
const LOGO_IMG = "/logo.png";
const BG_IMG =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&q=80"; // Using a placeholder restaurant image
const deepBlue = "#0E1A2B"; // Defined here for use in style

export default function LoginPage() {
  const golden = "#D4A853";

  // Existing state management
  const [email, setEmail] = useState("User@gmail.com");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState<"venue" | "admin">("venue");

  // Existing logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, loginType });
    // Add navigation logic here based on loginType if needed
  };

  return (
    <div
      className="min-h-screen w-full relative flex flex-col overflow-hidden"
      style={{ backgroundColor: deepBlue }}
    >
      {/* ADDED: Back Button (Top Left) */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        aria-label="Go back to home"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Background with Gradient Overlay - Applies to the main content area */}
      <div
        className="absolute inset-0 bg-cover bg-center h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(180deg, ${deepBlue} 0%, rgba(14, 26, 43, 0.00) 50%, ${deepBlue} 100%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.33) 0%, rgba(0, 0, 0, 0.33) 100%),
            url('${BG_IMG}')
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          top: 0,
          zIndex: 0,
        }}
      />

      {/* Main Form Content Area */}
      <main className="flex-1 flex items-center justify-center relative z-10 p-4">
        <div className="w-full max-w-[505px] mx-4 sm:mx-6">
          {/* Logo (Inside main for centered spacing) */}
          <div className="flex justify-center mb-6 md:mb-8">
            <Image
              src={LOGO_IMG}
              alt="TableBird"
              width={275}
              height={70}
              className="w-48 sm:w-56 h-auto"
            />
          </div>

          {/* Login Form Container (Frosted Glass Card) */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5 p-6 sm:p-8 rounded-2xl border border-white/20 shadow-xl"
            style={{
              background: "rgba(33, 60, 98, 0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                className="text-white font-bold text-3xl leading-tight"
                style={{ fontFamily: "Arimo, sans-serif" }}
              >
                Login
              </h2>
              <Link
                href="/"
                className="opacity-70 hover:opacity-100 transition-opacity p-1 -mt-2 -mr-2"
                aria-label="Go to Home"
              >
                <X className="w-5 h-5 text-white" strokeWidth={1.5} />
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-white/80 text-sm font-medium"
                  style={{ fontFamily: "Arimo, sans-serif" }}
                >
                  Email ID
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-4 rounded-lg border border-white/40 text-white text-base placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                  style={{
                    fontFamily: "Arimo, sans-serif",
                    background: "rgba(33, 60, 98, 0.6)",
                  }}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-white/80 text-sm font-medium"
                  style={{ fontFamily: "Arimo, sans-serif" }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                  className="h-11 px-4 rounded-lg border border-white/40 text-white text-base placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                  style={{
                    fontFamily: "Arimo, sans-serif",
                    background: "rgba(33, 60, 98, 0.6)",
                  }}
                  required
                />
              </div>

              {/* Role Selectors */}
              <div className="flex flex-col gap-2 pt-2 text-white/90">
                <span
                  className="text-xs font-semibold text-white/50 mb-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Login Role
                </span>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLoginType("venue")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setLoginType("venue");
                  }}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    loginType === "venue"
                      ? "bg-[#1A2E4C] text-white border border-white/40"
                      : "hover:bg-[#1A2E4C]/50 text-white/70"
                  )}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Login as a Venue Manager
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLoginType("admin")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setLoginType("admin");
                  }}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    loginType === "admin"
                      ? "bg-[#1A2E4C] text-white border border-white/40"
                      : "hover:bg-[#1A2E4C]/50 text-white/70"
                  )}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Login as an Admin
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-[180px] h-12 px-6 py-2 flex items-center justify-center rounded-xl font-bold text-lg hover:bg-opacity-90 transition-colors shadow-lg"
                  style={{
                    fontFamily: "Arimo, sans-serif",
                    backgroundColor: golden,
                    color: deepBlue,
                  }}
                >
                  Log In
                </button>
              </div>
            </div>

            {/* Registration Link */}
            <p
              className="mt-4 text-center text-sm text-white/70"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Dont have an account?{" "}
              <Link
                href="/Register"
                className={`text-[#D4A853] hover:underline`}
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </main>

      {/* Removed Footer */}
    </div>
  );
}
