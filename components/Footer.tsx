import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#14181c] py-12 text-sm text-gray-400">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 font-semibold text-white">About</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-primary">News</Link></li>
                            <li><Link href="#" className="hover:text-primary">Pro</Link></li>
                            <li><Link href="#" className="hover:text-primary">Apps</Link></li>
                            <li><Link href="#" className="hover:text-primary">Year in Review</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-primary">Help</Link></li>
                            <li><Link href="#" className="hover:text-primary">API</Link></li>
                            <li><Link href="#" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-primary">Terms</Link></li>
                            <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Follow</h3>
                        <div className="flex space-x-4">
                            {/* Social icons would go here */}
                            <span className="hover:text-white cursor-pointer">Twitter</span>
                            <span className="hover:text-white cursor-pointer">Facebook</span>
                            <span className="hover:text-white cursor-pointer">Instagram</span>
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8">
                    <p>© 2025 Moviedex Limited. Made by fans.</p>
                    <p className="mt-2 md:mt-0">Film data from TMDB.</p>
                </div>
            </div>
        </footer>
    );
}
