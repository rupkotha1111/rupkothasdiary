export default function AboutPage() {
  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">

          <div className="text-7xl mb-6">
            🌸
          </div>

          <p className="text-pink-600 font-semibold">
            About Me
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3">
            Hello, I&apos;m Rupkotha
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Welcome to Rupkotha&apos;s Diary — my little corner of
            the internet where I share my stories, thoughts,
            emotions and memories.
          </p>

          <p className="mt-5 text-lg text-gray-600 leading-8">
            I believe that every moment has a story, and even the
            smallest memories can become something beautiful.
          </p>

          <p className="mt-5 text-lg text-gray-600 leading-8">
            Through this diary, I want to keep those little moments
            alive through words. 💕
          </p>

          <a
            href="/"
            className="inline-block mt-8 bg-pink-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-pink-700 transition"
          >
            ← Back to Home
          </a>

        </div>

      </div>
    </main>
  );
}