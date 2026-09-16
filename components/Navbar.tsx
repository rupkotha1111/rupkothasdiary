"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setLoggedIn(!!session);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 md:px-8 py-5">

        <a
          href="/"
          className="text-2xl font-bold text-pink-600"
        >
          Rupkotha&apos;s Diary
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <li>
            <a href="/" className="hover:text-pink-600 transition">
              Home
            </a>
          </li>

          <li>
            <a href="/about" className="hover:text-pink-600 transition">
              About
            </a>
          </li>

          <li>
            <a href="/blog" className="hover:text-pink-600 transition">
              Blog
            </a>
          </li>

          <li>
            <a href="/contact" className="hover:text-pink-600 transition">
              Contact
            </a>
          </li>

          {!loggedIn ? (
            <>
              <li>
                <a
                  href="/login"
                  className="text-pink-600 hover:text-pink-800 transition"
                >
                  Login
                </a>
              </li>

              <li>
                <a
                  href="/signup"
                  className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  Sign Up
                </a>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-pink-600"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">

            <li>
              <a
                href="/"
                className="block hover:text-pink-600"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/about"
                className="block hover:text-pink-600"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/blog"
                className="block hover:text-pink-600"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className="block hover:text-pink-600"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </li>

            {!loggedIn ? (
              <>
                <li>
                  <a
                    href="/login"
                    className="block text-pink-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </a>
                </li>

                <li>
                  <a
                    href="/signup"
                    className="inline-block bg-pink-600 text-white px-5 py-2 rounded-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </a>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-pink-600 text-white px-5 py-2 rounded-full"
                >
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      )}
    </nav>
  );
}