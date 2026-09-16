const stories = {
  "beautiful-beginning": {
    emoji: "🌸",
    category: "Personal",
    title: "A Beautiful Beginning",
    text: [
      "Every beautiful journey begins with a small step.",
      "Sometimes we do not know where that step will take us, but we take it anyway.",
      "This is the beginning of my little diary — a place where I can keep my stories, thoughts, emotions and beautiful memories.",
    ],
  },

  "late-night-thoughts": {
    emoji: "🌙",
    category: "Thoughts",
    title: "Late Night Thoughts",
    text: [
      "The night has a different kind of silence.",
      "When everything becomes quiet, our thoughts sometimes become louder.",
      "Some nights are filled with memories, dreams and little hopes for tomorrow.",
    ],
  },

  "little-things-i-love": {
    emoji: "💖",
    category: "Memories",
    title: "Little Things I Love",
    text: [
      "Life becomes beautiful when we learn to notice the little things.",
      "A warm cup of tea, a beautiful sunset, a kind smile or a peaceful evening can become a precious memory.",
      "Maybe happiness is not always something big. Sometimes it is hidden in the smallest moments.",
    ],
  },
};

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const story = stories[slug as keyof typeof stories];

  if (!story) {
    return (
      <main className="min-h-screen bg-pink-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-5">😔</div>

          <h1 className="text-4xl font-bold text-gray-800">
            Story Not Found
          </h1>

          <a
            href="/blog"
            className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-full"
          >
            ← Back to Blog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50 px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <div className="text-center">
          <div className="text-7xl mb-6">
            {story.emoji}
          </div>

          <p className="text-pink-600 font-semibold">
            {story.category}
          </p>

          <h1 className="text-5xl font-bold text-gray-800 mt-3">
            {story.title}
          </h1>

          <p className="text-gray-500 mt-4">
            From Rupkotha&apos;s Diary
          </p>
        </div>

        <article className="bg-white rounded-3xl shadow-md p-8 md:p-12 mt-12">
          {story.text.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg text-gray-700 leading-8 mb-6 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </article>

        <div className="text-center mt-10">
          <a
            href="/blog"
            className="inline-block bg-pink-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-pink-700 transition"
          >
            ← Back to Blog
          </a>
        </div>

      </div>
    </main>
  );
}