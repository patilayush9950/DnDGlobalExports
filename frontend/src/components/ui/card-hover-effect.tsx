"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;
        link?: string;
        icon?: any;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item?.link || idx}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-slate-100 block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <div className="relative z-20 h-full">
                        <Card>
                            <CardTitle icon={item.icon}>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-1 overflow-hidden bg-slate-50 border border-slate-200 group-hover:border-slate-300 relative z-20",
                className
            )}
        >
            <div className="relative z-50 h-full">
                <div className="p-6 h-full flex flex-col items-center justify-start text-center">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
    icon: Icon
}: {
    className?: string;
    children: React.ReactNode;
    icon?: any;
}) => {
    return (
        <h4 className={cn("text-slate-900 font-serif font-bold tracking-wide mt-2 text-xl flex flex-col items-center gap-4", className)}>
            {Icon && <div className="text-primary p-3 bg-primary/10 rounded-xl"><Icon size={32} /></div>}
            <span>{children}</span>
        </h4>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-4 text-slate-500 tracking-wide leading-relaxed text-sm font-medium text-center",
                className
            )}
        >
            {children}
        </p>
    );
};
