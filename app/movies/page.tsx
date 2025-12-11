import Link from 'next/link';
import { getFilteredMovies, getAllGenres, SortOption } from '@/lib/data';
import { MovieCard } from '@/components/MovieCard';
import { Search } from 'lucide-react';

export const revalidate = 3600;

interface MoviesPageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        genre?: string;
        sort?: string;
    }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
    const resolvedSearchParams = await searchParams; // Await the promise
    const page = Number(resolvedSearchParams.page) || 1;
    const search = resolvedSearchParams.search || '';
    const genre = resolvedSearchParams.genre || '';
    const sort = (resolvedSearchParams.sort as SortOption) || 'newest';

    const { movies, totalPages } = await getFilteredMovies(search, genre, sort, page);
    const allGenres = await getAllGenres();

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-white tracking-tight">Browse Movies</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span>Sort by</span>
                    <div className="flex bg-[#2c3440] rounded-md overflow-hidden">
                        <Link
                            href={{ query: { ...resolvedSearchParams, sort: 'newest' } }}
                            className={`px-3 py-1.5 hover:text-white ${sort === 'newest' ? 'bg-primary text-white' : ''}`}
                        >
                            Newest
                        </Link>
                        <Link
                            href={{ query: { ...resolvedSearchParams, sort: 'rating' } }}
                            className={`px-3 py-1.5 hover:text-white ${sort === 'rating' ? 'bg-primary text-white' : ''}`}
                        >
                            Highest Rated
                        </Link>
                        <Link
                            href={{ query: { ...resolvedSearchParams, sort: 'oldest' } }}
                            className={`px-3 py-1.5 hover:text-white ${sort === 'oldest' ? 'bg-primary text-white' : ''}`}
                        >
                            Oldest
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Sidebar Filters */}
                <aside className="space-y-6">
                    <div className="bg-[#1f242b] p-4 rounded-lg border border-white/5">
                        <h3 className="font-semibold text-white mb-4 border-b border-white/10 pb-2">Search</h3>
                        <form className="relative" action="/movies">
                            <input
                                type="hidden"
                                name="sort"
                                value={sort}
                            />
                            {genre && <input type="hidden" name="genre" value={genre} />}
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                name="search"
                                defaultValue={search}
                                placeholder="Find a movie..."
                                className="w-full rounded bg-[#2c3440] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </form>
                    </div>

                    <div className="bg-[#1f242b] p-4 rounded-lg border border-white/5">
                        <h3 className="font-semibold text-white mb-4 border-b border-white/10 pb-2">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={{ query: { ...resolvedSearchParams, genre: '' } }}
                                className={`text-xs px-2 py-1 rounded-sm transition-colors ${!genre ? 'bg-gray-600 text-white' : 'bg-[#2c3440] text-gray-400 hover:text-white hover:bg-gray-600'}`}
                            >
                                All
                            </Link>
                            {allGenres.map(g => (
                                <Link
                                    key={g}
                                    href={{ query: { ...resolvedSearchParams, genre: g } }}
                                    className={`text-xs px-2 py-1 rounded-sm transition-colors ${genre === g ? 'bg-primary text-white' : 'bg-[#2c3440] text-gray-400 hover:text-white hover:bg-gray-600'}`}
                                >
                                    {g}
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Movie Grid */}
                <div>
                    {movies.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-lg">No movies found matching your criteria.</p>
                            <Link href="/movies" className="text-primary hover:underline mt-2 inline-block">Reset Filters</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center space-x-2">
                            {page > 1 && (
                                <Link
                                    href={{ query: { ...resolvedSearchParams, page: page - 1 } }}
                                    className="px-4 py-2 bg-[#2c3440] text-white rounded hover:bg-gray-600 transition-colors"
                                >
                                    Previous
                                </Link>
                            )}
                            <span className="px-4 py-2 text-gray-400">Page {page} of {totalPages}</span>
                            {page < totalPages && (
                                <Link
                                    href={{ query: { ...resolvedSearchParams, page: page + 1 } }}
                                    className="px-4 py-2 bg-[#2c3440] text-white rounded hover:bg-gray-600 transition-colors"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
