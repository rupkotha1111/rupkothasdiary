import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

export default function Home() {
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

           <a
           href="/blog"
           className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-pink-700 hover:scale-105 transition"
           >
            Read My Blog 📖
          </a>

             <a
              href="/about"
             className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-600 hover:text-white hover:scale-105 transition"
             > 
             About Me 💕
             </a>

          </div>

        </div>
      </main>
      <section className="py-20 px-6 bg-white">
  <div className="max-w-4xl mx-auto text-center">

    <p className="text-pink-600 font-semibold mb-3">
      About Me 🌷
    </p>

    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
      Hello, I&apos;m Rupkotha
    </h2>

    <p className="mt-6 text-lg text-gray-600 leading-8">
      Welcome to my little diary. এখানে আমি আমার গল্প, অনুভূতি,
      চিন্তা এবং প্রিয় স্মৃতিগুলো লিখে রাখি। এই জায়গাটি আমার
      মনের কথাগুলোকে শব্দে প্রকাশ করার একটি ছোট্ট ঠিকানা।
    </p>

    <button className="mt-8 px-7 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
      Know More About Me 💕
    </button>

  </div>
</section>


<section className="py-20 px-6 bg-pink-50">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-12">
      <p className="text-pink-600 font-semibold mb-3">
        My Blog ✨
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
        Latest Stories
      </h2>

      <p className="mt-4 text-gray-600">
        Some stories and thoughts from my diary.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      <article className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition">
        <div className="text-5xl mb-5">🌸</div>

        <p className="text-sm text-pink-600 font-medium">
          Personal
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-2">
          A Beautiful Beginning
        </h3>

        <p className="text-gray-600 mt-4 leading-7">
          Every journey begins with a small step. This is the
          beginning of my little diary.
        </p>

     <a
  href="/blog/beautiful-beginning"
  className="mt-5 inline-block text-pink-600 font-semibold hover:text-pink-800"
>
  Read More →
</a>
        
      </article>

      <article className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition">
        <div className="text-5xl mb-5">🌙</div>

        <p className="text-sm text-pink-600 font-medium">
          Thoughts
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-2">
          Late Night Thoughts
        </h3>

        <p className="text-gray-600 mt-4 leading-7">
          Sometimes the quietest nights bring the loudest
          thoughts and the most beautiful memories.
        </p>




       <a
  href="/blog/late-night-thoughts"
  className="mt-5 inline-block text-pink-600 font-semibold hover:text-pink-800"
>
  Read More →
</a>



      </article>

      <article className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition">
        <div className="text-5xl mb-5">💖</div>

        <p className="text-sm text-pink-600 font-medium">
          Memories
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-2">
          Little Things I Love
        </h3>

        <p className="text-gray-600 mt-4 leading-7">
          Life becomes beautiful when we learn to appreciate
          the little things around us.
        </p>

       <a
       href="/blog/little-things-i-love"
       className="mt-5 inline-block text-pink-600 font-semibold hover:text-pink-800"
       >
       Read More →
       </a>


      </article>

    </div>
  </div>
</section>
<Footer />
    </>
  );
}