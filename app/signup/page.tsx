"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account created successfully! Please check your email to confirm your account. 💕"
    );

    setEmail("");
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌸</div>

          <h1 className="text-4xl font-bold text-pink-700">
            Create Account
          </h1>

          <p className="mt-3 text-gray-600">
            Join Rupkotha&apos;s Diary 💕
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            Create Account 🌷
          </button>

          {message && (
            <p className="mt-5 text-center text-sm text-pink-700">
              {message}
            </p>
          )}

          <div className="text-center mt-6">
            <a
              href="/"
              className="text-pink-600 font-semibold hover:text-pink-800"
            >
              ← Back to Home
            </a>
          </div>
        </form>

      </div>
    </main>
  );
}