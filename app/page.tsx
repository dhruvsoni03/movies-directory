import Link from "next/link";
import { getMovies } from "@/lib/data";
import { MovieCard } from "@/components/MovieCard";
import { ReviewItem, ListItem, ReviewerItem, StoryCard, ShowdownCard, NewsCard } from "@/components/HomeWidgets";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const allMovies = await getMovies();

  // Featured: Top 4 rated movies
  const featuredMovies = [...allMovies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Trending: Just taking the next 4 for demo purposes, could be random or recent
  const trendingMovies = [...allMovies]
    .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:px-6 md:py-32 bg-gradient-to-b from-[#14181c] to-[#1f242b] text-center overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white text-shadow-sm">
            Track films you’ve watched.<br />
            <span className="text-gray-400">Save those you want to see.</span><br />
            <span className="text-gray-400">Tell your friends what’s good.</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            The social network for film lovers. Keep a diary of your life in film.
          </p>
          <Link
            href="/movies"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            GET STARTED — IT'S FREE!
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-4 md:px-6 container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase border-b border-primary pb-1">Highest Rated on Moviedex</h2>
          <Link href="/movies?sort=rating" className="text-xs text-gray-500 hover:text-white">MORE</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 md:px-6 container mx-auto bg-[#1a1f26] rounded-xl my-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase border-b border-secondary pb-1">Just Added</h2>
          <Link href="/movies?sort=newest" className="text-xs text-gray-500 hover:text-white">MORE</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Popular Reviews & Lists Section */}
      <section className="py-12 px-4 md:px-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Reviews Column (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
              <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Popular Reviews This Week</h2>
              <Link href="#" className="text-xs text-gray-500 hover:text-white">MORE</Link>
            </div>
            <div className="space-y-6">
              {/* Mock Review 1 */}
              <ReviewItem
                movie={{ title: "Inception", year: "2010", poster: featuredMovies.find(m => m.slug === 'inception')?.poster || "" }}
                user={{ name: "kenny", rating: 5, avatar: "https://i.pravatar.cc/150?u=kenny" }}
                text="Arr arr ar ar ar ²"
                likes={11482}
              />
              {/* Mock Review 2 */}
              <ReviewItem
                movie={{ title: "Interstellar", year: "2014", poster: featuredMovies.find(m => m.slug === 'interstellar')?.poster || "" }}
                user={{ name: "benoftheweek", rating: 5, avatar: "https://i.pravatar.cc/150?u=ben" }}
                text="i feel like they will keep making these until they get to the fifth one so they can be like 5 nights at freddys"
                likes={9596}
              />
              {/* Mock Review 3 */}
              <ReviewItem
                movie={{ title: "The Dark Knight", year: "2008", poster: featuredMovies.find(m => m.slug === 'the-dark-knight')?.poster || "" }}
                user={{ name: "itscharliibb", rating: 4.5, avatar: "https://i.pravatar.cc/150?u=charli" }}
                text="omg this chemistry."
                likes={4935}
              />
            </div>
          </div>

          {/* Lists Column (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
              <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Popular Lists</h2>
              <Link href="#" className="text-xs text-gray-500 hover:text-white">MORE</Link>
            </div>
            <div className="space-y-6">
              <ListItem
                title="Movies everyone should watch at least once during their lifetime"
                user="fcbarcelona"
                count={800}
                likes="322K"
                comments="1.3K"
                posters={[
                  featuredMovies[0]?.poster || "",
                  featuredMovies[1]?.poster || "",
                  featuredMovies[2]?.poster || ""
                ]}
              />
              <ListItem
                title="Happy Old Hollydays 🎄🎬"
                user="mich"
                count={58}
                likes="2.1K"
                comments="11"
                posters={[
                  featuredMovies[2]?.poster || "",
                  featuredMovies[0]?.poster || "",
                  featuredMovies[1]?.poster || "",
                ]}
              />
              <ListItem
                title="Most fans on Letterboxd (with pronoun 'she')—2025"
                user="Letterboxd"
                count={100}
                likes="6.2K"
                comments="127"
                posters={[
                  featuredMovies[1]?.poster || "",
                  featuredMovies[2]?.poster || "",
                  featuredMovies[0]?.poster || "",
                ]}
              />
            </div>

            {/* Popular Reviewers Small Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
                <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Popular Reviewers</h2>
                <Link href="#" className="text-xs text-gray-500 hover:text-white">MORE</Link>
              </div>
              <div className="space-y-4">
                <ReviewerItem name="James (Schaffrillas)" films={1387} reviews={1258} avatar="https://i.pravatar.cc/150?u=james" />
                <ReviewerItem name="Karsten" films={2401} reviews={1614} avatar="https://i.pravatar.cc/150?u=karsten" />
                <ReviewerItem name="zoë rose bryant" films={5030} reviews={2392} avatar="https://i.pravatar.cc/150?u=zoe" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="py-12 px-4 md:px-6 container mx-auto">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
          <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Recent Stories</h2>
          <Link href="#" className="text-xs text-gray-500 hover:text-white">ALL HQS</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <StoryCard
            image={featuredMovies[3]?.backdrop || ""}
            source="France Inter"
            sourceIcon="https://i.pravatar.cc/150?u=france"
            title="Sigourney Weaver : “Je ne pense pas qu’on puisse remplacer les artistes” avec l’IA"
            description="La comédienne Sigourney Weaver était l’invitée de Benjamin Duhamel à l’occasion de la sortie de “Avatar - De Feu et de Cendres”, troisième volet de la saga de science-fiction de James Cameron, en salles le 18 décembre."
            isVideo={true}
          />
          <StoryCard
            image={featuredMovies[2]?.backdrop || ""}
            source="CINENOVA KINO"
            sourceIcon="https://i.pravatar.cc/150?u=cinenova"
            title="Neustart am 11.12.2025 - CINENOVA"
            description="Am 11.12. startet DER HELD VOM BAHNHOF FRIEDRICHSTRASSE bei uns im CINENOVA. Der Film erzählt die Geschichte vom kurz vor der Pleite stehenden Berliner Videothekenbesitzer Micha Hartung."
          />
          <StoryCard
            image={featuredMovies[1]?.backdrop || ""}
            source="ARTHAUS"
            sourceIcon="https://i.pravatar.cc/150?u=arthaus"
            title="Im Rausch der Tiefe: Schweben in blauer Pracht"
            description="Das Taucherdrama von Luc Besson aus dem Jahr 1988 ist eine meditative Erfahrung, die man nicht mehr vergisst, wenn man es einmal in all seiner blauen Pracht gesehen hat."
          />
          <StoryCard
            image={featuredMovies[0]?.backdrop || ""}
            source="Imbibe Cinema by BWiFF"
            sourceIcon="https://i.pravatar.cc/150?u=imbibe"
            title="Podcast | ‘Coherence’ Episode Recap"
            description="Listen to the Episode"
          />
          <StoryCard
            image={trendingMovies[0]?.backdrop || ""}
            source="LaCinetek"
            sourceIcon="https://i.pravatar.cc/150?u=lacinetek"
            title="Selection of the Month: As Time Goes By"
            description="Cinema is an art of time, where the linear progression of film contrasts with the fragmentary work of editing. Throughout its history, filmmakers and screenwriters have enjoyed playing with temporal paradoxes, delving ever deeper into a perception of time that is as elastic as it is subjective."
            isVideo={true}
          />
          <StoryCard
            image={trendingMovies[1]?.backdrop || ""}
            source="Palace Cinemas"
            sourceIcon="https://i.pravatar.cc/150?u=palace"
            title="Smash-Hit Sensation KOKUHŌ is the #1 Live-Action Film Ever in Japan"
            description="From the best-selling novel to Japan’s highest-grossing live-action film, KOKUHŌ is a cultural phenomenon. Following sold-out Japanese Film Festival screenings, experience the word-of-mouth sensation."
          />
        </div>
      </section>

      {/* Recent Showdowns Section */}
      <section className="py-12 px-4 md:px-6 container mx-auto">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
          <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Recent Showdowns</h2>
          <Link href="#" className="text-xs text-gray-500 hover:text-white">MORE</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ShowdownCard
            image={featuredMovies[3]?.backdrop || ""}
            title="Glasses On!"
            subtitle="Beat 3D films"
            badge="In Progress"
          />
          <ShowdownCard
            image={featuredMovies[1]?.backdrop || ""}
            title="The Last Picture Show"
            subtitle="Beat scenes in movie theaters"
          />
          <ShowdownCard
            image={featuredMovies[2]?.backdrop || ""}
            title="To Live and Die in LA"
            subtitle="Best LA noir films"
          />
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-12 px-4 md:px-6 container mx-auto">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
          <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Recent News</h2>
          <Link href="#" className="text-xs text-gray-500 hover:text-white">MORE</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NewsCard
            image={trendingMovies[2]?.backdrop || ""}
            title="Lost and Found (December 2025)"
            description="The latest titles available to rent on Letterboxd Video Store."
            showLogo={true}
          />
          <NewsCard
            image={trendingMovies[3]?.backdrop || ""}
            title="Through a Glass Darkly"
            description="Breaking down Steven Spielberg’s brain-teasing cyberpunk thriller Minority Report."
          />
          <NewsCard
            image={trendingMovies[1]?.backdrop || ""}
            title="Unreleased Gems (December 2025)"
            description="Exclusive titles available to rent on Letterboxd Video Store."
            showLogo={true}
          />
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-20 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-xl font-bold text-white">Keep track of every film you've ever watched</h3>
          </div>
          <div className="space-y-4">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-white">Show some love for your favorite films, lists and reviews with a “like”</h3>
          </div>
          <div className="space-y-4">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-white">Write and share reviews, and follow friends</h3>
          </div>
        </div>
      </section>
    </div >
  );
}
