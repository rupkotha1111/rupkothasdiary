export default function Footer() {
  return (
    <footer className="bg-pink-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-2xl font-bold">
          Rupkothas Diary 🌸
        </h2>

        <p className="mt-3 text-pink-100">
          Stories, thoughts and memories — written from the heart.
        </p>

        <div className="flex justify-center gap-6 mt-6">
          <a href="/" className="hover:text-pink-200 transition">
            Home
          </a>

          <a href="/about" className="hover:text-pink-200 transition">
            About
          </a>

          <a href="/blog" className="hover:text-pink-200 transition">
            Blog
          </a>

          <a href="/contact" className="hover:text-pink-200 transition">
            Contact
          </a>
        </div>

        <div className="border-t border-pink-700 mt-8 pt-6">
          <p className="text-sm text-pink-200">
            © 2026 Rupkothas Diary. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}