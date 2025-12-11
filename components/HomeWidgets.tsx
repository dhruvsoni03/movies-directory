import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewItemProps {
    movie: { title: string; year: string; poster: string };
    user: { name: string; rating: number; avatar: string };
    text: string;
    likes: number;
}

export function ReviewItem({ movie, user, text, likes }: ReviewItemProps) {
    return (
        <div className="flex gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0">
            <div className="shrink-0 w-[70px]">
                <div className="relative aspect-[2/3] rounded overflow-hidden border border-white/10 hover:border-white/30 transition-colors">
                    {movie.poster && <Image src={movie.poster} alt={movie.title} fill className="object-cover" />}
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white leading-tight font-serif tracking-tight">
                    {movie.title} <span className="font-normal text-gray-400 text-lg">{movie.year}</span>
                </h3>
                <div className="flex items-center gap-2 mt-1 mb-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                    </div>
                    <span className="text-sm font-bold text-gray-300">{user.name}</span>
                    <div className="flex text-primary">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-3 h-3", i < Math.floor(user.rating) ? "fill-current" : "text-gray-600")} />
                        ))}
                    </div>
                    <Heart className="w-3 h-3 text-orange-500 fill-current ml-1" />
                </div>
                <div className="text-gray-300 text-sm md:text-[15px] leading-relaxed font-serif mb-3">
                    {text}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <Heart className="w-3 h-3" />
                    <span>{likes.toLocaleString()} likes</span>
                </div>
            </div>
        </div>
    );
}

interface ListItemProps {
    title: string;
    user: string;
    count: number;
    likes: string;
    comments: string;
    posters: string[];
}

export function ListItem({ title, user, count, likes, comments, posters }: ListItemProps) {
    return (
        <div className="group cursor-pointer">
            <div className="relative h-[120px] mb-2 flex items-end">
                {/* Stacked posters effect */}
                <div className="absolute left-0 bottom-0 z-30 w-[80px] aspect-[2/3] rounded border border-white/20 overflow-hidden shadow-lg transform group-hover:translate-y-[-4px] transition-transform">
                    {posters[0] && <Image src={posters[0]} alt="" fill className="object-cover" />}
                </div>
                <div className="absolute left-[30px] bottom-0 z-20 w-[80px] aspect-[2/3] rounded border border-white/20 overflow-hidden shadow-lg transform scale-95 origin-bottom group-hover:translate-y-[-4px] transition-transform delay-75">
                    {posters[1] && <Image src={posters[1]} alt="" fill className="object-cover opacity-70" />}
                </div>
                <div className="absolute left-[60px] bottom-0 z-10 w-[80px] aspect-[2/3] rounded border border-white/20 overflow-hidden shadow-lg transform scale-90 origin-bottom group-hover:translate-y-[-4px] transition-transform delay-100">
                    {posters[2] && <Image src={posters[2]} alt="" fill className="object-cover opacity-40" />}
                </div>
            </div>
            <h3 className="text-white font-bold leading-tight group-hover:text-primary transition-colors">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
                <div className="relative w-4 h-4 rounded-full overflow-hidden bg-gray-600">
                    {/* Placeholder avatar for list owner */}
                </div>
                <span className="text-xs text-gray-400 font-bold">{user}</span>
            </div>
            <div className="text-gray-500 text-xs mt-1 flex gap-3">
                <span>{count} films</span>
                <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {likes}</span>
                <span className="flex items-center gap-0.5"><MessageCircle className="w-3 h-3" /> {comments}</span>
            </div>
        </div>
    );
}

interface ReviewerItemProps {
    name: string;
    films: number;
    reviews: number;
    avatar: string;
}

export function ReviewerItem({ name, films, reviews, avatar }: ReviewerItemProps) {
    return (
        <div className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-600 border border-white/10">
                <Image src={avatar} alt={name} fill className="object-cover" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-white hover:text-primary cursor-pointer transition-colors">{name}</h4>
                <div className="text-xs text-gray-500">
                    {films.toLocaleString()} films, {reviews.toLocaleString()} reviews
                </div>
            </div>
        </div>
    );
}

interface StoryCardProps {
    image: string;
    source: string;
    sourceIcon?: string;
    title: string;
    description: string;
    isVideo?: boolean;
}

export function StoryCard({ image, source, sourceIcon, title, description, isVideo }: StoryCardProps) {
    return (
        <div className="group cursor-pointer flex flex-col h-full">
            <div className="relative aspect-video w-full rounded-md overflow-hidden mb-3 border border-white/10">
                <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-2 mb-2">
                {sourceIcon ? (
                    <div className="relative w-4 h-4 rounded-full overflow-hidden">
                        <Image src={sourceIcon} alt={source} fill className="object-cover" />
                    </div>
                ) : (
                    <div className="w-4 h-4 rounded-full bg-primary/20" />
                )}
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{source}</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors font-serif">
                {title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-4 mb-4 flex-1 font-serif leading-relaxed">
                {description}
            </p>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider mt-auto group-hover:underline">Read Story</span>
        </div>
    );
}

interface ShowdownCardProps {
    image: string;
    title: string;
    subtitle: string;
    badge?: string;
}

export function ShowdownCard({ image, title, subtitle, badge }: ShowdownCardProps) {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-video w-full rounded-md overflow-hidden mb-2 border border-white/10">
                <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                {badge && (
                    <div className="absolute top-2 left-2 bg-[#00e054] text-black text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                        {badge}
                    </div>
                )}
            </div>
            <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
    );
}

interface NewsCardProps {
    image: string;
    title: string;
    description: string;
    showLogo?: boolean;
}

export function NewsCard({ image, title, description, showLogo }: NewsCardProps) {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-video w-full rounded-md overflow-hidden mb-2 border border-white/10">
                <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                {showLogo && (
                    <div className="absolute bottom-2 right-2 w-1/3 aspect-[2/1]">
                        {/* Placeholder for the Video Store Logo */}
                        <div className="w-full h-full bg-black/50 backdrop-blur rounded flex items-center justify-center border border-white/20">
                            <span className="text-[10px] font-black text-white text-center leading-tight">Video<br />Store</span>
                        </div>
                    </div>
                )}
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-serif line-clamp-3">{description}</p>
        </div>
    );
}
