"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminEmail } from "../../../lib/admin";
import { supabase } from "../../../lib/supabase";

type Message = {
  id: number;
  Name: string;
  Mail: string;
  Message: string;
  "Created-at": string;
};

export default function AdminMessagesPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkAccessAndFetchMessages();
  }, []);

  async function checkAccessAndFetchMessages() {
    setLoading(true);
    setErrorMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Login করা না থাকলে
    if (!user) {
      router.replace("/login");
      return;
    }

    // Admin না হলে
    if (!isAdminEmail(user.email)) {
      router.replace("/");
      return;
    }

    await fetchMessages();
  }

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("Created-at", { ascending: false });

    if (error) {
      console.error(error);

      setErrorMessage(
        "Messages could not be loaded. Please check your Supabase security rule."
      );

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

  // Loading screen
  if (loading) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-5">
            🌸
          </div>

          <p className="text-pink-600 font-semibold text-lg">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <p className="text-pink-600 font-semibold">
              Rupkotha&apos;s Diary 🌸
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2">
              Messages
            </h1>

            <p className="mt-3 text-gray-600">
              Messages received from your visitors.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="border-2 border-red-500 text-red-500 px-5 py-2 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition"
          >
            Logout 🔐
          </button>

        </div>

        {/* Error */}
        {errorMessage ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">
              ⚠️
            </div>

            <p className="text-red-700">
              {errorMessage}
            </p>
          </div>
        ) : messages.length === 0 ? (

          /* No Messages */
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <div className="text-6xl mb-5">
              💌
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No messages yet
            </h2>

            <p className="text-gray-600 mt-3">
              Visitor messages will appear here.
            </p>
          </div>

        ) : (

          /* Messages */
          <div className="grid gap-6">

            {messages.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.Name}
                    </h2>

                    <p className="text-pink-600 text-sm mt-1">
                      {item.Mail}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      item["Created-at"]
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="mt-5 bg-pink-50 rounded-xl p-5">
                  <p className="text-gray-700 leading-7 whitespace-pre-wrap">
                    {item.Message}
                  </p>
                </div>

              </article>
            ))}

          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">

          <a
            href="/admin"
            className="text-pink-600 font-semibold hover:text-pink-800"
          >
            ← Admin Dashboard
          </a>

          <a
            href="/"
            className="text-gray-600 font-semibold hover:text-gray-800"
          >
            🏠 Website
          </a>

        </div>

      </div>
    </main>
  );
}