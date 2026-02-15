"use client";

import { Shield, Lock, Eye, Globe } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-dark text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-slate-900/70"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-up">Legal</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 animate-fade-in-up animate-delay-100">
                        Privacy <span className="text-gradient-gold">Policy</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
                        Your trust is our priority. We are committed to protecting your personal data and ensuring transparency.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
                        <div className="space-y-12">
                            {/* Introduction */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <Shield className="text-primary" /> Introduction
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    DnD Global Exports ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                                </p>
                            </div>

                            {/* Data Collection */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <Eye className="text-primary" /> Data We Collect
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                    <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                                    <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                                </ul>
                            </div>

                            {/* International Transfers */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <Globe className="text-primary" /> International Transfers
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We share your personal data within the DnD Global Exports Group. This will involve transferring your data outside the European Economic Area (EEA). Whenever we transfer your personal data out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented.
                                </p>
                            </div>

                            {/* Data Security */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <Lock className="text-primary" /> Data Security
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-dark mb-2">Contact Details</h3>
                                <p className="text-slate-600 text-sm mb-4">
                                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
                                </p>
                                <p className="text-slate-800 font-medium">Email: <a href="mailto:hello@dndglobalexports.com" className="text-primary hover:underline">hello@dndglobalexports.com</a></p>
                                <p className="text-slate-800 font-medium">Address: 46/3 Palduna Road, Neemchowk, Kumawat Mohalla Namli, Dist Ratlam, Madhya Pradesh, India - 457222</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
