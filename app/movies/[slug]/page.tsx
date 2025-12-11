import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieBySlug, getRelatedMovies } from '@/lib/data';
import { MovieCard } from '@/components/MovieCard';
import { Star, Clock, Calendar, Globe, Users } from 'lucide-react';
import type { Metadata } from 'next';

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const movie = await getMovieBySlug(resolvedParams.slug);
    if (!movie) return { title: 'Not Found' };

    return {
        title: `${movie.title} (${movie.release_date.split('-')[0]}) - Moviedex`,
        description: movie.overview,
        openGraph: {
            images: [{ url: movie.backdrop }],
        }
    };
}

export default async function MovieDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const movie = await getMovieBySlug(resolvedParams.slug);

    if (!movie) {
        notFound();
    }

    const relatedMovies = await getRelatedMovies(movie);

    return (
        <div className="min-h-screen pb-20">
            {/* Backdrop Hero */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                <Image
                    src={movie.backdrop}
                    alt={movie.title}
                    fill
                    className="object-cover opacity-40 mask-image-gradient"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-[#14181c]/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 container mx-auto flex flex-col md:flex-row items-end gap-8">
                    <div className="hidden md:block relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl border border-white/10 shrink-0">
                        <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 mb-8">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-2 text-shadow">
                            {movie.title} <span className="text-2xl md:text-4xl text-gray-400 font-normal">({movie.release_date.split('-')[0]})</span>
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
                            <span className="bg border border-white/20 px-2 py-0.5 rounded text-xs uppercase">{movie.language}</span>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{movie.runtime} mins</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{movie.release_date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 -mt-8 relative z-10">
                {/* Main Content */}
                <div className="space-y-8">
                    {/* Mobile Poster (Visible only on mobile) */}
                    <div className="md:hidden flex justify-center -mt-24 mb-8">
                        <div className="relative w-40 h-60 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                            <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
                        </div>
                    </div>

                    <section>
                        <h2 className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Overview</h2>
                        <p className="text-lg leading-relaxed text-gray-100 font-serif">{movie.overview}</p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Cast</h2>
                        <div className="flex flex-wrap gap-2">
                            {movie.cast.map(actor => (
                                <span key={actor} className="bg-[#2c3440] hover:bg-[#445566] text-gray-200 px-3 py-1 rounded text-sm transition-colors cursor-pointer">
                                    {actor}
                                </span>
                            ))}
                        </div>
                    </section>

                    {relatedMovies.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-white/10 pb-2">Related Films</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {relatedMovies.map(rm => (
                                    <MovieCard key={rm.id} movie={rm} showRating={false} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <div className="bg-[#1f242b] rounded-lg p-6 border border-white/5 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 text-sm">Rating</span>
                            <div className="flex items-center gap-2 text-primary font-bold text-xl">
                                <Star className="fill-current w-5 h-5" />
                                {movie.rating.toFixed(1)}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm py-2 border-t border-white/5">
                                <span className="text-gray-400">Director</span>
                                <span className="text-white font-medium">{movie.director}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-t border-white/5">
                                <span className="text-gray-400">Genres</span>
                                <span className="text-white text-right">{movie.genres.join(', ')}</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-t border-white/5">
                                <span className="text-gray-400">Country</span>
                                <span className="text-white uppercase">{movie.countries.join(', ')}</span>
                            </div>
                        </div>

                        <a
                            href={movie.tmdb_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 w-full flex items-center justify-center gap-2 bg-[#2c3440] hover:bg-white hover:text-black py-2 rounded text-sm font-bold transition-all"
                        >
                            <Globe className="w-4 h-4" />
                            View on TMDB
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    );
}
