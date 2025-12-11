'use client';

import Link from 'next/link';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isDark, setIsDark] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/movies?search=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#14181c]/95 backdrop-blur supports-[backdrop-filter]:bg-[#14181c]/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-white">
                        <span className="text-primary">●●●</span> MOVIEDEX
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex flex-1 items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm font-medium text-gray-300">
                        <Link href="/movies" className="hover:text-white transition-colors">Movies</Link>
                        <Link href="/movies?sort=rating" className="hover:text-white transition-colors">Top Rated</Link>
                        <Link href="/movies?sort=year" className="hover:text-white transition-colors">2025</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search..."
                                className="rounded-full bg-[#2c3440] pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary w-64 transition-all"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white">
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-white/10 bg-[#14181c]">
                    <div className="flex flex-col space-y-4 p-4">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search movies..."
                                className="w-full rounded-md bg-[#2c3440] pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                        <Link href="/movies" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Movies</Link>
                        <Link href="/movies?sort=rating" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Top Rated</Link>
                        <button onClick={toggleTheme} className="flex items-center text-gray-300 hover:text-white">
                            {isDark ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
