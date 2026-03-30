"use client";

import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Heart,
  Instagram,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "YouTube",
      href: "https://youtube.com/@your-youtube-channel",
      icon: Youtube,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/hruthik__offcl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/your-linkedin-profile",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "Email",
      href: "mailto:hruthikoffcl@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="glass-panel border-t border-white/5 mt-20 backdrop-blur-3xl">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Video Editor and Cinematographer passionate about
              creating visual stories with style, precision, and cinematic
              magic.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white tracking-wide uppercase text-xs opacity-70">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
              <Link
                href="/"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 transform"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 transform"
              >
                About
              </Link>
              <Link
                href="/skills"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 transform"
              >
                Skills
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 transform"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white tracking-wide uppercase text-xs opacity-70">
              Connect With Me
            </h4>
            <div className="flex space-x-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={link.name}
                  >
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-600/20 group-hover:border-blue-500/50 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 group-hover:scale-110 transform">
                      <Icon size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1.5">
            Made with{" "}
            <Heart className="text-red-500 fill-red-500/20" size={14} /> by{" "}
            <a
              href="https://www.instagram.com/hruthik__offcl?igsh=bTZ0bHJmeDV0ZjF0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-4"
            >
              Hruthik
            </a>{" "}
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
