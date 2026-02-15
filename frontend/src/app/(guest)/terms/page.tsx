"use client";

import { FileText, Truck, AlertCircle, RefreshCw, CreditCard } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-dark text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-slate-900/70"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-up">Legal</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 animate-fade-in-up animate-delay-100">
                        Terms & <span className="text-gradient-gold">Conditions</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
                        Please read these terms and conditions carefully before using specific services provided by DnD Global Exports.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
                        <div className="space-y-12">
                            {/* General */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <FileText className="text-primary" /> General Provisions
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    These Terms and Conditions govern your use of the DnD Global Exports website and services. By accessing or using our services, you agree to be bound by these terms. We reserve the right to update or modify these terms at any time without prior notice.
                                </p>
                            </div>

                            {/* Orders & Payments */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <CreditCard className="text-primary" /> Orders & Payment Terms
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    All orders are subject to acceptance and availability. We accept the following payment methods for international trade:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                                    <li><strong>Telegraphic Transfer (T/T):</strong> 30% - 50% advance payment upon order confirmation, and the balance against the copy of the Bill of Lading (B/L).</li>
                                    <li><strong>Letter of Credit (L/C):</strong> Irrevocable L/C at sight from a prime bank is accepted for larger orders.</li>
                                    <li><strong>Pricing:</strong> All prices are quoted in USD or Euro and are based on FOB/CIF as agreed (INCOTERMS 2020).</li>
                                </ul>
                            </div>

                            {/* Shipping & Delivery */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <Truck className="text-primary" /> Shipping & Delivery
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We strive to meet all delivery deadlines. However, delivery times are estimates and may be subject to delays due to customs clearance, shipping line schedules, or force majeure events. Risk of loss passes to the buyer upon delivery of goods to the carrier (FOB) or at the destination port (CIF/CFR), depending on the agreed Incoterms.
                                </p>
                            </div>

                            {/* Quality & Claims */}
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-slate-dark mb-4 flex items-center gap-3">
                                    <AlertCircle className="text-primary" /> Quality & Claims
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    We ensure all products meet international quality standards. Any claims regarding quality or quantity must be made in writing within 7 days of the arrival of goods at the destination port, accompanied by independent survey reports (e.g., SGS). We are not liable for damages caused by improper storage or handling after delivery.
                                </p>
                            </div>

                            {/* Governing Law */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-dark mb-2">Governing Law</h3>
                                <p className="text-slate-600 text-sm">
                                    These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Ratlam, Madhya Pradesh, India.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
