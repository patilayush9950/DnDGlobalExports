"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Search, ChevronRight } from 'lucide-react';

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [categories, setCategories] = useState<{ id: number, title: string }[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch categories for footer
        api.get('/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Failed to fetch categories", err));

        // Handle scroll for sticky nav
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-slate-light font-sans text-slate-dark">

            {/* Top Bar */}
            <div className="bg-slate-900 text-slate-300 py-2 hidden md:block">
                <div className="container mx-auto px-6 flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-6">
                        <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@dndglobalexports.com" target="_blank" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Mail size={14} className="text-gold" />
                            <span>hello@dndglobalexports.com</span>
                        </Link>
                        <Link href="tel:+919425989989" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Phone size={14} className="text-gold" />
                            <span>+91 94259 89989</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="https://www.instagram.com/dnd_global_exports/" target="_blank" className="hover:text-white transition-colors"><Instagram size={14} /></Link>
                        <Link href="https://www.linkedin.com/in/dnd-global-exports/" target="_blank" className="hover:text-white transition-colors"><Linkedin size={14} /></Link>
                    </div>
                </div>
            </div>

            {/* Premium Header - Sticky & Glass */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'} border-b border-primary/10`}>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center">

                        {/* Logo & Brand */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src="/logo.jpg"
                                    alt="DnD Global Exports"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors">
                                    DnD
                                </span>
                                <span className="text-xs font-bold text-gold tracking-[0.2em] uppercase leading-none mt-1">
                                    Global Exports
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Products', path: '/products' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Why Choose Us', path: '/why-choose-us' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300"
                            >
                                Contact
                            </Link>

                            <div className="w-px h-6 bg-slate-200 mx-2"></div>

                            {/* Search Component */}
                            <div className="relative mx-2">
                                {showSearch ? (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (searchQuery.trim()) {
                                                router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                                                setShowSearch(false);
                                            }
                                        }}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 flex items-center bg-white border border-primary/20 rounded-full shadow-xl overflow-hidden animate-fade-in-right origin-right"
                                    >
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Search products..."
                                            className="w-full px-4 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                                        />
                                        <button type="submit" className="p-2 bg-primary text-white hover:bg-primary-dark transition-colors">
                                            <Search size={16} />
                                        </button>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setShowSearch(true)}
                                        className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                                    >
                                        <Search size={18} />
                                    </button>
                                )}
                            </div>

                            <Link href="/contact" className="ml-4 bg-gradient-to-r from-gold to-yellow-500 text-white text-sm px-6 py-2.5 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-0.5 transition-all duration-300 font-bold tracking-wide flex items-center gap-2 group">
                                <span>Enquire Now</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Modern Footer */}
            {/* Modern Footer */}
            <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 mt-auto relative overflow-hidden border-t border-slate-800">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-dark via-primary to-gold"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* Company Info */}
                        <div className="space-y-6">
                            <h3 className="text-3xl font-serif font-bold text-white">
                                DnD <span className="text-gold">Global</span>
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Bridging the gap between Indian farmers and the world. We export premium quality agro-products with a commitment to freshness, transparency, and global standards.
                            </p>
                            <p className="text-slate-300 font-medium text-sm">
                                Proprietor - Deepesh Sabriya
                            </p>
                            <div className="flex space-x-4">
                                {[

                                    { Icon: Linkedin, href: "https://www.linkedin.com/in/dnd-global-exports-306b7a3a9/" },
                                    { Icon: Instagram, href: "https://www.instagram.com/dnd_global_exports?igsh=MXdicDNzaG1qb3dmbQ%3D%3D" }
                                ].map(({ Icon, href }, idx) => (
                                    <Link key={idx} href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                        <Icon size={18} />
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-2">
                                <Link
                                    href="/documents/D%26D%20Global%20GST%20Certificate_RC26122025_260107_113147.pdf"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-primary transition-colors border border-slate-700 rounded-full px-4 py-2 hover:border-primary bg-slate-800 shadow-sm"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>
                                    View GST Registration
                                </Link>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Quick Links</h4>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About Us', path: '/about' },
                                    { name: 'Products', path: '/products' },
                                    { name: 'Why Choose Us', path: '/why-choose-us' },
                                    { name: 'Contact', path: '/contact' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.path} className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                                            <span className="max-w-0 overflow-hidden group-hover:max-w-[20px] group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100 text-primary">
                                                <ChevronRight size={14} />
                                            </span>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Products */}
                        <div>
                            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Our Products</h4>
                            <ul className="space-y-3">
                                {categories.slice(0, 5).map(cat => (
                                    <li key={cat.id}>
                                        <Link href={`/products/category/${cat.id}`} className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                                            <span className="max-w-0 overflow-hidden group-hover:max-w-[20px] group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100 text-primary">
                                                <ChevronRight size={14} />
                                            </span>
                                            {cat.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-lg font-serif font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">Contact Us</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-1">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="text-slate-400 text-sm">46/3 Palduna Road, Neemchowk, Kumawat Mohalla Namli,<br />Dist Ratlam, Madhya Pradesh, India - 457222</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                        <Phone size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 text-sm hover:text-primary transition-colors">+91 94259 89989</span>
                                        <span className="text-slate-400 text-sm hover:text-primary transition-colors">+91 77468 61718</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-slate-400 text-sm hover:text-primary transition-colors">hello@dndglobalexports.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                        <p>&copy; {new Date().getFullYear()} DnD Global Exports. All Rights Reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <Link
                href="https://wa.me/919425989989"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-bounce-in"
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </Link>
        </div>
    );
}
