import fs from 'fs';
import path from 'path';
import { Movie } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'data', 'movies.json');

export async function getMovies(): Promise<Movie[]> {
    try {
        const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
        const movies = JSON.parse(fileContents);
        return movies;
    } catch (error) {
        console.error("Error reading movies.json:", error);
        return [];
    }
}

export async function getMovieBySlug(slug: string): Promise<Movie | undefined> {
    const movies = await getMovies();
    return movies.find((movie) => movie.slug === slug);
}

export async function getRelatedMovies(movie: Movie, limit = 4): Promise<Movie[]> {
    const movies = await getMovies();
    return movies
        .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
        .slice(0, limit);
}

// Helpers for sorting and filtering
export type SortOption = 'rating' | 'newest' | 'oldest' | 'year';

export async function getFilteredMovies(
    query: string = '',
    genre: string = '',
    sort: SortOption = 'newest',
    page = 1,
    limit = 20
): Promise<{ movies: Movie[]; total: number; totalPages: number }> {
    let movies = await getMovies();

    // Search
    if (query) {
        const q = query.toLowerCase();
        movies = movies.filter(m =>
            m.title.toLowerCase().includes(q) ||
            m.director.toLowerCase().includes(q) ||
            m.cast.some(c => c.toLowerCase().includes(q))
        );
    }

    // Filter by Genre
    if (genre && genre !== 'all') {
        movies = movies.filter(m => m.genres.includes(genre));
    }

    // Sort
    movies.sort((a, b) => {
        switch (sort) {
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
            case 'oldest':
                return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
            case 'year':
                return parseInt(b.release_date.substring(0, 4)) - parseInt(a.release_date.substring(0, 4));
            default:
                return 0;
        }
    });

    const total = movies.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedMovies = movies.slice(start, start + limit);

    return { movies: paginatedMovies, total, totalPages };
}

export async function getAllGenres(): Promise<string[]> {
    const movies = await getMovies();
    const genres = new Set<string>();
    movies.forEach(m => m.genres.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
}
