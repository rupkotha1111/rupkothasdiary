"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [oldImageUrl, setOldImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Posts load করা যায়নি।");
      return;
    }

    setPosts(data || []);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("শুধু image file upload করতে পারবে।");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size maximum 5MB হতে হবে।");
      return;
    }

    setErrorMessage("");
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  async function uploadImage(file: File) {
    const fileExtension = file.name.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      throw new Error("Image upload করা যায়নি।");
    }

    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      let imageUrl = oldImageUrl || null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (editingId !== null) {
        const { error } = await supabase
          .from("posts")
          .update({
            title,
            slug,
            category,
            content,
            image_url: imageUrl,
          })
          .eq("id", editingId);

        if (error) {
          console.error(error);
          throw new Error("Post update করা যায়নি।");
        }

        setMessage("Post successfully updated! ✨");
      } else {
        const { error } = await supabase.from("posts").insert([
          {
            title,
            slug,
            category,
            content,
            image_url: imageUrl,
          },
        ]);

        if (error) {
          console.error(error);
          throw new Error("Post publish করা যায়নি।");
        }

        setMessage("Post successfully published! 🎉");
      }

      clearForm();
      await fetchPosts();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  function editPost(post: Post) {
    setEditingId(post.id);

    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setContent(post.content);

    setOldImageUrl(post.image_url || "");
    setImageFile(null);
    setImagePreview(post.image_url || "");

    setMessage("");
    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deletePost(id: number) {
    const confirmed = window.confirm(
      "এই post-টি কি সত্যিই delete করতে চাও?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setErrorMessage("Post delete করা যায়নি।");
      return;
    }

    setMessage("Post successfully deleted! 🗑️");

    await fetchPosts();
  }

  function clearForm() {
    setEditingId(null);

    setTitle("");
    setSlug("");
    setCategory("");
    setContent("");

    setImageFile(null);
    setImagePreview("");
    setOldImageUrl("");

    setMessage("");
    setErrorMessage("");
  }

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-pink-700 font-semibold">
            Admin Panel ✨
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Manage Posts
          </h1>

          <p className="mt-3 text-gray-800 text-base">
            Create, edit, delete and manage your diary posts.
          </p>
        </div>

        {/* Create / Edit Post */}
        <section className="bg-white rounded-3xl shadow-lg p-8 mb-10">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingId !== null
              ? "✏️ Edit Post"
              : "✍️ Create New Post"}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-5">
              <label className="block text-gray-900 font-semibold mb-2">
                Post Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
                className="w-full border border-gray-400 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              />
            </div>

            {/* Slug */}
            <div className="mb-5">
              <label className="block text-gray-900 font-semibold mb-2">
                Slug
              </label>

              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="beautiful-day"
                required
                className="w-full border border-gray-400 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              />

              <p className="text-sm text-gray-700 mt-2">
                Example: beautiful-day
              </p>
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="block text-gray-900 font-semibold mb-2">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Personal"
                required
                className="w-full border border-gray-400 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              />
            </div>

            {/* Image */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2">
                Post Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-400 text-gray-900 rounded-xl px-4 py-3 bg-white"
              />

              <p className="text-sm text-gray-700 mt-2">
                JPG, PNG, WEBP — Maximum 5MB
              </p>

              {imagePreview && (
                <div className="mt-5">

                  <p className="text-sm text-gray-800 font-semibold mb-2">
                    Image Preview
                  </p>

                  <img
                    src={imagePreview}
                    alt="Post preview"
                    className="w-full max-w-md h-56 object-cover rounded-2xl border border-gray-300"
                  />

                </div>
              )}
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-2">
                Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your story here..."
                rows={10}
                required
                className="w-full border border-gray-400 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingId !== null
                  ? "Update Post ✨"
                  : "Publish Post ✨"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="md:w-40 border-2 border-gray-400 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}

            </div>

            {/* Success Message */}
            {message && (
              <div className="mt-5 bg-green-50 border border-green-300 text-green-800 rounded-xl p-4 text-center font-semibold">
                {message}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-5 bg-red-50 border border-red-300 text-red-800 rounded-xl p-4 text-center font-semibold">
                {errorMessage}
              </div>
            )}

          </form>
        </section>

        {/* Existing Posts */}
        <section className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-gray-900">
              📚 Your Posts
            </h2>

            <span className="text-pink-700 font-bold">
              {posts.length} Posts
            </span>

          </div>

          {posts.length === 0 ? (

            <div className="bg-pink-50 rounded-xl p-6 text-center">
              <p className="text-gray-800">
                No posts yet. Create your first post! 🌸
              </p>
            </div>

          ) : (

            <div className="space-y-6">

              {posts.map((post) => (
                <article
                  key={post.id}
                  className="border border-gray-300 rounded-2xl p-5"
                >

                  {/* Image */}
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-56 object-cover rounded-2xl mb-5"
                    />
                  )}

                  {/* Post Info */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    <div>

                      <p className="text-sm text-pink-700 font-bold">
                        {post.category}
                      </p>

                      <h3 className="text-2xl font-bold text-gray-900 mt-1">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-700 mt-1">
                        /blog/{post.slug}
                      </p>

                    </div>

                    <p className="text-sm text-gray-700 font-medium">
                      {new Date(
                        post.created_at
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  {/* Content */}
                  <p className="text-gray-800 mt-4 leading-7 line-clamp-3">
                    {post.content}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">

                    <button
                      type="button"
                      onClick={() => editPost(post)}
                      className="flex-1 border-2 border-pink-600 text-pink-700 py-2.5 rounded-xl font-bold hover:bg-pink-600 hover:text-white transition"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deletePost(post.id)}
                      className="flex-1 border-2 border-red-500 text-red-600 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:text-white transition"
                    >
                      🗑️ Delete
                    </button>

                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-gray-400 text-gray-800 py-2.5 rounded-xl font-bold text-center hover:bg-gray-100 transition"
                    >
                      👁️ View
                    </a>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">

          <a
            href="/admin"
            className="text-pink-700 font-bold hover:text-pink-900"
          >
            ← Back to Admin Dashboard
          </a>

        </div>

      </div>
    </main>
  );
}