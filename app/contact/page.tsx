"use client";

import { FormEvent, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          Name: name,
          Mail: email,
          Message: message,
        },
      ]);

    if (error) {
      console.error(error);
      setError("Message পাঠানো যায়নি। আবার চেষ্টা করো।");
      return;
    }

    setSubmitted(true);
    form.reset();
  }

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <div className="text-6xl mb-5">💌</div>

          <p className="text-pink-600 font-semibold">
            Get In Touch
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3">
            Contact Me
          </h1>

          <p className="mt-4 text-gray-600">
            Have a story to share or just want to say hello?
            I&apos;d love to hear from you. 🌸
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-10"
        >

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Your Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Message
            </label>

            <textarea
              name="message"
              required
              rows={6}
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-pink-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            Send Message 💌
          </button>

          {submitted && (
            <div className="mt-5 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-center">
              Message sent successfully! 💚
            </div>
          )}

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-center">
              {error}
            </div>
          )}

        </form>

        <div className="text-center mt-8">
          <a
            href="/"
            className="text-pink-600 font-semibold hover:text-pink-800"
          >
            ← Back to Home
          </a>
        </div>

      </div>
    </main>
  );
}