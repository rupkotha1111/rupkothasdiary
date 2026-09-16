"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setMessage("");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
    return;
  }

  const loggedInEmail = data.user?.email?.toLowerCase();

  if (loggedInEmail === "drobobd5@gmail.com") {
    router.push("/admin");
  } else {
    router.push("/");
  }
};

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌸</div>

          <h1 className="text-4xl font-bold text-pink-700">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-600">
            Login to Rupkotha&apos;s Diary 💕
          </p>
        </div>

        <form
          onSubmit={handleLogin}
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
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            Login 🔐
          </button>

          {message && (
            <p className="mt-5 text-center text-sm text-red-600">
              {message}
            </p>
          )}

          <p className="text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-pink-600 font-semibold hover:text-pink-800"
            >
              Sign Up
            </a>
          </p>

          <div className="text-center mt-5">
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