import fs from 'fs';
import path from 'path';

// Define types locally if not importing to avoid module resolution issues in standalone script
interface Movie {
    id: string;
    title: string;
    slug: string;
    overview: string;
    genres: string[];
    release_date: string;
    rating: number;
    poster: string;
    backdrop: string;
    cast: string[];
    director: string;
    runtime: number;
    language: string;
    countries: string[];
    tmdb_url: string;
}

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TARGET_FILE = path.join(process.cwd(), 'data', 'movies.json');
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

async function fetchGenres(): Promise<Record<number, string>> {
    if (!TMDB_API_KEY) return {};
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`);
    const data = await res.json();
    const map: Record<number, string> = {};
    data.genres?.forEach((g: any) => map[g.id] = g.name);
    return map;
}

async function fetchMovies(): Promise<Movie[]> {
    if (!TMDB_API_KEY) {
        console.error("Error: TMDB_API_KEY environment variable is not set.");
        console.log("Please set it in your .env.local file or run: set TMDB_API_KEY=your_key && npx tsx scripts/generate-data.ts");
        return [];
    }

    console.log("Fetching movies from TMDB...");
    const genreMap = await fetchGenres();
    const allMovies: Movie[] = [];
    const totalPagesToFetch = 10; // 20 results per page * 10 = 200 movies

    for (let page = 1; page <= totalPagesToFetch; page++) {
        console.log(`Fetching page ${page}...`);
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
        const data = await res.json();

        if (data.results) {
            for (const m of data.results) {
                // Fetch validation/details for cast/director
                const detailRes = await fetch(`https://api.themoviedb.org/3/movie/${m.id}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
                const details = await detailRes.json();

                if (!details.id) continue;

                const director = details.credits?.crew?.find((c: any) => c.job === 'Director')?.name || 'Unknown';
                const cast = details.credits?.cast?.slice(0, 5).map((c: any) => c.name) || [];

                allMovies.push({
                    id: details.id.toString(),
                    title: details.title,
                    slug: details.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                    overview: details.overview,
                    genres: details.genres.map((g: any) => g.name),
                    release_date: details.release_date,
                    rating: details.vote_average,
                    poster: details.poster_path ? `${IMAGE_BASE_URL}${details.poster_path}` : '',
                    backdrop: details.backdrop_path ? `${BACKDROP_BASE_URL}${details.backdrop_path}` : '',
                    cast: cast,
                    director: director,
                    runtime: details.runtime || 0,
                    language: details.original_language,
                    countries: details.production_countries.map((c: any) => c.iso_3166_1),
                    tmdb_url: `https://www.themoviedb.org/movie/${details.id}`
                });
            }
        }
    }

    return allMovies;
}

async function main() {
    const movies = await fetchMovies();
    if (movies.length > 0) {
        fs.writeFileSync(TARGET_FILE, JSON.stringify(movies, null, 2));
        console.log(`Successfully wrote ${movies.length} movies to ${TARGET_FILE}`);
    }
}

main();
