import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Movie } from '@/types';

interface MovieCardProps {
    movie: Movie;
    showRating?: boolean;
}

export function MovieCard({ movie, showRating = true }: MovieCardProps) {
    return (
        <Link href={`/movies/${movie.slug}`} className="group relative block aspect-[2/3] overflow-hidden rounded-md bg-[#1f242b] transition-all hover:ring-2 hover:ring-primary">
            <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-80"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                priority={false}
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="absolute bottom-0 left-0 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-sm font-bold text-white line-clamp-1">{movie.title}</h3>
                <div className="flex items-center text-xs text-gray-300">
                    <span className="mr-1">{movie.release_date.split('-')[0]}</span>
                    {showRating && (
                        <div className="flex items-center text-primary ml-2">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="ml-1">{movie.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
