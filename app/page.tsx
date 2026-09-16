"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    async function fetchLatestPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error) setPosts(data || []);
      setLoadingPosts(false);
    }

    fetchLatestPosts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <p className="text-pink-600 font-medium text-lg mb-4">
            Welcome to my little world 🌸
          </p>
          <h1 className="text-6xl md:text-8xl font-extrabold text-pink-700 tracking-tight">
            Rupkotha&apos;s Diary
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 leading-relaxed">
            A place where stories, emotions and memories live forever.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a href="/blog" className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-pink-700 hover:scale-105 transition">
              Read My Blog 📖
            </a>
            <a href="/about" className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-600 hover:text-white hover:scale-105 transition">
              About Me 💕
            </a>
          </div>
        </div>
      </main>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-pink-600 font-semibold mb-3">About Me 🌷</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Hello, I&apos;m Rupkotha</h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Welcome to my little diary. এখানে আমি আমার গল্প, অনুভূতি, চিন্তা এবং প্রিয় স্মৃতিগুলো লিখে রাখি। এই জায়গাটি আমার মনের কথাগুলোকে শব্দে প্রকাশ করার একটি ছোট্ট ঠিকানা।
          </p>
          <a href="/about" className="inline-block mt-8 px-7 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
            Know More About Me 💕
          </a>
        </div>
      </section>

      <section className="py-20 px-6 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-pink-600 font-semibold mb-3">My Blog ✨</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Latest Stories</h2>
            <p className="mt-4 text-gray-600">Some stories and thoughts from my diary.</p>
          </div>

          {loadingPosts && <div className="text-center text-gray-600">Loading stories... 🌸</div>}

          {!loadingPosts && posts.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-600">
              No stories published yet. 🌸
            </div>
          )}

          {!loadingPosts && posts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full h-52 object-cover" />
                  ) : (
                    <div className="h-52 bg-pink-100 flex items-center justify-center text-5xl">🌸</div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-pink-600 font-medium">{post.category}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-2">{post.title}</h3>
                    <p className="text-gray-600 mt-4 leading-7 line-clamp-3">{post.content}</p>
                    <a href={`/blog/${post.slug}`} className="mt-5 inline-block text-pink-600 font-semibold hover:text-pink-800">
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a href="/blog" className="inline-block text-pink-700 font-bold hover:text-pink-900">View All Stories →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
