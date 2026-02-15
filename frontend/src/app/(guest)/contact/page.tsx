"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
// Assuming these UI components are generic enough, otherwise we might replace them with standard HTML/Tailwind for full control if they conflict.
// But let's assume standard HTML inputs for pure Tailwind control matching the theme.
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        email: '',
        productId: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data)).catch(() => { });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const data = new FormData();
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('country', formData.country);
        data.append('email', formData.email);
        data.append('message', formData.message);
        if (formData.productId) {
            data.append('productId', formData.productId);
        }

        try {
            await api.post('/enquiries', data);
            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                country: '',
                email: '',
                productId: '',
                message: ''
            });
        } catch (error) {
            alert("Failed to submit enquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-dark text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-slate-900/70"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-up">Get In Touch</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up animate-delay-100">
                        We'd Love to <br />
                        <span className="text-gradient-gold">Hear From You</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
                        Have a requirement? We are here to help you sourcing the best Indian produce.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-16 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-gradient-to-br from-primary-dark to-primary text-white p-10 rounded-3xl shadow-xl relative overflow-hidden border border-white/10">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-serif font-bold mb-8 text-white">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors duration-300 border border-white/10">
                                        <MapPin size={24} className="text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-white">Our Office</h3>
                                        <p className="text-slate-100/90">46/3 Palduna Road, Neemchowk, Kumawat Mohalla Namli,<br />Dist Ratlam, Madhya Pradesh, India - 457222</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors duration-300 border border-white/10">
                                        <Phone size={24} className="text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-white">Phone Number</h3>
                                        <p className="text-slate-100/90">+91 94259 89989</p>
                                        <p className="text-slate-100/90">+91 77468 61718</p>
                                        <p className="text-slate-200/80 text-xs mt-1">Mon-Fri, 9am - 6pm IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors duration-300 border border-white/10">
                                        <Mail size={24} className="text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1 text-white">Email Address</h3>
                                        <p className="text-slate-100/90">hello@dndglobalexports.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h3 className="font-semibold text-lg mb-4 text-gold">Exporting To</h3>
                                <p className="text-slate-100/90 text-sm leading-relaxed">
                                    USA, UK, UAE, Canada, Australia, Germany, France, and 15+ other countries.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                        <h2 className="text-2xl font-serif font-bold text-slate-dark mb-6">Send an Enquiry</h2>

                        {success ? (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                <p className="mb-6 text-slate-600">Your enquiry has been submitted successfully. Our team will contact you shortly.</p>
                                <button onClick={() => setSuccess(false)} className="text-primary font-bold hover:underline">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 mb-1 block">First Name</label>
                                        <input
                                            className="input-field bg-slate-50 border-slate-200 focus:bg-white"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name</label>
                                        <input
                                            className="input-field bg-slate-50 border-slate-200 focus:bg-white"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
                                        <input
                                            className="input-field bg-slate-50 border-slate-200 focus:bg-white"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 mb-1 block">Country</label>
                                        <input
                                            className="input-field bg-slate-50 border-slate-200 focus:bg-white"
                                            placeholder="USA"
                                            value={formData.country}
                                            onChange={e => setFormData({ ...formData, country: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 mb-1 block">Product Interest</label>
                                    <select
                                        className="input-field bg-slate-50 border-slate-200 focus:bg-white"
                                        value={formData.productId}
                                        onChange={e => setFormData({ ...formData, productId: e.target.value })}
                                    >
                                        <option value="">General Enquiry</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 mb-1 block">Message</label>
                                    <textarea
                                        className="input-field bg-slate-50 border-slate-200 focus:bg-white min-h-[120px] py-3"
                                        placeholder="Tell us about your requirements..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-primary w-full text-lg shadow-lg hover:shadow-xl" disabled={loading}>
                                    {loading ? 'Sending...' : 'Submit Enquiry'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}
