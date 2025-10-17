// components/Footer.tsx
import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import React from "react";

export default function Footer() {
  const t = (key: string) => key; // Mock translation function

  const navGroups = [
    {
      title: t("TableBird"),
      links: [
        { label: t("About Us"), href: "#" },
        { label: t("Blogs"), href: "#" },
        { label: t("Careers"), href: "#" },
        { label: t("Press"), href: "#" },
        { label: t("Contact Us"), href: "#" },
      ],
    },
    {
      title: t("Explore"),
      links: [
        { label: t("Restaurants"), href: "#" },
        { label: t("Reviews"), href: "#" },
        { label: t("Near Me"), href: "#" },
      ],
    },
    {
      title: t("Profile"),
      links: [
        { label: t("Login"), href: "/Login" },
        { label: t("Register"), href: "/Register" },
        { label: t("Saves"), href: "/profile?tab=saves" },
        { label: t("Bookings"), href: "/profile?tab=bookings" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-[#0E1A2B] border-t border-gray-700">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Social and Brand Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col space-y-4 sm:space-y-6 text-center sm:text-left">
            <img
              src="/logo.png"
              alt="TableBird Logo"
              className="h-8 sm:h-10 w-auto object-contain mx-auto sm:mx-0"
            />
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white bg-white/10 backdrop-blur-sm w-fit">
                <span className="text-white/95 text-xs">Powered by</span>
                <img src="/stripe.png" alt="Stripe" className="h-5" />
              </div>
              <p className="text-white text-xs text-center max-w-[168px]">
                Secured by Stripe
                <br />
                Premium partner Restaurants
              </p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-400 hover:text-[#D4A853] transition"
                >
                  <item.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {navGroups.map((group) => (
            <div key={group.title} className="text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {group.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-xs sm:text-sm hover:text-[#D4A853] transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
              {t("Contact info")}
            </h3>
            <div className="space-y-2 sm:space-y-3 text-gray-400 text-xs sm:text-sm">
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm gap-4 md:gap-0">
          <p className="text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} TableBird. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 md:gap-8">
            <Link
              href="#"
              className="text-gray-400 hover:text-[#D4A853] transition whitespace-nowrap"
            >
              {t("Privacy Policy")}
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-[#D4A853] transition whitespace-nowrap"
            >
              {t("Terms of Service")}
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-[#D4A853] transition whitespace-nowrap"
            >
              {t("Cookie Policy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
