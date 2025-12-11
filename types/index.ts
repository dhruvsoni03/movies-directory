export interface Movie {
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
    runtime: number; // in minutes
    language: string;
    countries: string[];
    tmdb_url: string;
}

export interface MovieResponse {
    results: Movie[];
    total_pages: number;
    total_results: number;
    page: number;
}
