"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Message = {
  id: number;
  Name: string;
  Mail: string;
  Message: string;
  "Created-at": string;
};

export default function AdminPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Login না করলে Login page-এ পাঠাবে
    if (!user) {
      router.replace("/login");
      return;
    }

    // শুধু Admin email Dashboard access করতে পারবে
    if (user.email?.toLowerCase() !== "drobobd5@gmail.com") {
      await supabase.auth.signOut();
      router.replace("/login");
      return;
    }

    // Admin verified
    fetchMessages();
  }

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("Created-at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setMessages(data || []);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const latestMessages = messages.slice(0, 3);

  return (
    <main className="min-h-screen bg-pink-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <p className="text-pink-600 font-semibold">
              Rupkotha&apos;s Diary 🌸
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-gray-600">
              Welcome back! Manage your website from here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <a
              href="/"
              className="inline-block text-center border-2 border-pink-600 text-pink-600 px-5 py-2 rounded-xl font-semibold hover:bg-pink-600 hover:text-white transition"
            >
              ← Back to Website
            </a>

            <button
              onClick={handleLogout}
              className="border-2 border-red-500 text-red-500 px-5 py-2 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition"
            >
              Logout 🔐
            </button>

          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-4xl mb-3">
              💌
            </div>

            <p className="text-gray-500">
              Total Messages
            </p>

            <h2 className="text-4xl font-bold text-pink-600 mt-2">
              {loading ? "..." : messages.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-4xl mb-3">
              📖
            </div>

            <p className="text-gray-500">
              Blog
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Manage Posts
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-4xl mb-3">
              🌸
            </div>

            <p className="text-gray-500">
              Website
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Live &amp; Running
            </h2>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">

          <h2 className="text-2xl font-bold text-gray-800">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">

            <a
              href="/admin/messages"
              className="bg-pink-600 text-white px-6 py-4 rounded-xl font-semibold text-center hover:bg-pink-700 transition"
            >
              💌 View Messages
            </a>

            <a
              href="/admin/posts"
              className="border-2 border-pink-600 text-pink-600 px-6 py-4 rounded-xl font-semibold text-center hover:bg-pink-600 hover:text-white transition"
            >
              ✍️ Manage Posts
            </a>

            <a
              href="/blog"
              className="border-2 border-pink-600 text-pink-600 px-6 py-4 rounded-xl font-semibold text-center hover:bg-pink-600 hover:text-white transition"
            >
              📖 View Blog
            </a>

            <a
              href="/"
              className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold text-center hover:bg-gray-100 transition"
            >
              🏠 View Website
            </a>

          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex items-center justify-between gap-4 mb-6">

            <h2 className="text-2xl font-bold text-gray-800">
              Recent Messages
            </h2>

            <a
              href="/admin/messages"
              className="text-pink-600 font-semibold hover:text-pink-800"
            >
              View All →
            </a>

          </div>

          {loading ? (
            <p className="text-gray-500">
              Loading messages...
            </p>
          ) : latestMessages.length === 0 ? (
            <div className="bg-pink-50 rounded-xl p-6 text-center">
              <p className="text-gray-600">
                No messages yet. 💕
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {latestMessages.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                    <div>
                      <h3 className="font-bold text-gray-800">
                        {item.Name}
                      </h3>

                      <p className="text-sm text-pink-600">
                        {item.Mail}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500">
                      {new Date(
                        item["Created-at"]
                      ).toLocaleString()}
                    </p>

                  </div>

                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {item.Message}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}