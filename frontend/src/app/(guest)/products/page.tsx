"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Search, ChevronRight } from 'lucide-react';

import { Suspense } from 'react';

function ProductsContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Determine which products endpoint to hit
                const productsPromise = searchQuery
                    ? api.get(`/products/search?query=${encodeURIComponent(searchQuery)}`)
                    : api.get('/products');

                const [prodRes, catRes] = await Promise.all([
                    productsPromise,
                    api.get('/categories')
                ]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [searchQuery]);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category?.id?.toString() === selectedCategory);

    // Helper to constructing full URL for assets
    // If imageUrl starts with http, use it as is, otherwise prepend API_URL/uploads/
    const getAssetUrl = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // Clean API_URL to ensure no double slash if it ends with /api
        // But our .env.production has /api, so we need base URL. 
        // Let's assume the uploads are served from the root context of backend usually.
        // If NEXT_PUBLIC_API_URL is https://dnd.../api, we want https://dnd.../uploads
        // A simple way is to use the hostname or just replace /api if present?
        // Actually, let's keep it simple: assume uploads are available at the same host as API.

        // If API_URL ends with /api, remove it to get base
        const baseUrl = API_URL.endsWith('/api') ? API_URL.slice(0, -4) : API_URL;
        return `${baseUrl}/uploads/${encodeURIComponent(path)}`;
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">Our Collection</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-dark mb-4">Premium Products</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">Browse our wide range of export-quality agro products.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-center items-center mb-12">
                    <div className="glass-panel p-2 rounded-full inline-flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === 'all' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}
                        >
                            All Products
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id.toString())}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat.id.toString() ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary hover:bg-slate-100'}`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group flex flex-col h-full card-hover">
                                <div className="h-64 overflow-hidden relative">
                                    {product.imageUrl ? (
                                        <img src={getAssetUrl(product.imageUrl)} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-3">
                                        <span className="text-xs uppercase tracking-widest font-bold text-gold">{product.category?.title}</span>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-slate-dark mb-3 group-hover:text-primary transition-colors">{product.title}</h3>
                                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">{product.description}</p>

                                    <div className="mt-auto pt-5 border-t border-slate-100 flex justify-between items-center">
                                        <Link href="/contact" className="bg-gradient-to-r from-gold to-yellow-500 text-white font-bold text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center group/link">
                                            Enquire Now <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                        {product.pdfUrl && (
                                            <a href={getAssetUrl(product.pdfUrl)} target="_blank" className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors">
                                                Download PDF
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-span-3 text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
                                <p>No products found in this category.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
            <ProductsContent />
        </Suspense>
    );
}
