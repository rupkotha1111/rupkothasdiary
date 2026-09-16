"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setPosts(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">

          <p className="text-pink-700 font-semibold mb-3">
            My Stories ✨
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Rupkotha&apos;s Blog
          </h1>

          <p className="mt-5 text-lg text-gray-700">
            Stories, thoughts and memories from my little diary.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <p className="text-gray-800 font-semibold">
              Loading stories... 🌸
            </p>
          </div>
        )}

        {/* No Posts */}
        {!loading && posts.length === 0 && (
          <div className="bg-white rounded-3xl shadow-md p-10 text-center">
            <p className="text-gray-800 text-lg">
              No stories published yet. 🌸
            </p>
          </div>
        )}

        {/* Posts */}
        {!loading && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >

                {/* Image */}
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-pink-100 flex items-center justify-center">
                    <span className="text-6xl">
                      🌸
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-7">

                  <p className="text-sm text-pink-700 font-bold">
                    {post.category}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {post.title}
                  </h2>

                  <p className="mt-4 text-gray-700 leading-7 line-clamp-3">
                    {post.content}
                  </p>

                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-6 text-pink-700 font-bold hover:text-pink-900 transition"
                  >
                    Read Story →
                  </a>

                </div>

              </article>
            ))}

          </div>
        )}

        {/* Back Home */}
        <div className="text-center mt-14">

          <a
            href="/"
            className="inline-block bg-pink-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-pink-700 transition"
          >
            ← Back to Home
          </a>

        </div>

      </div>
    </main>
  );
}