"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error) setPost(data);
      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-6 text-gray-700">
        Loading story... 🌸
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-5">😔</div>
          <h1 className="text-4xl font-bold text-gray-900">Post Not Found</h1>
          <p className="text-gray-700 mt-3">এই গল্পটি পাওয়া যায়নি।</p>
          <a href="/blog" className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700">
            ← Back to Blog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} className="w-full h-72 md:h-[450px] object-cover" />
        ) : (
          <div className="w-full h-72 md:h-[450px] bg-pink-100 flex items-center justify-center">
            <span className="text-7xl">🌸</span>
          </div>
        )}

        <div className="p-8 md:p-12">
          <p className="text-pink-700 font-bold">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">{post.title}</h1>
          <p className="text-gray-600 mt-4">{new Date(post.created_at).toLocaleDateString()} · 5 min read</p>

          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="text-lg text-gray-800 leading-8 whitespace-pre-line">{post.content}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="/blog" className="flex-1 text-center border-2 border-pink-600 text-pink-700 px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 hover:text-white transition">
              ← Back to Blog
            </a>
            <a href="/" className="flex-1 text-center bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition">
              🏠 Home
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
