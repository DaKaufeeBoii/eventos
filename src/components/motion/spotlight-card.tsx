"use client";

import { useState } from "react";

export function SpotlightCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const [position, setPosition] = useState({
        x: 50,
        y: 50,
    });

    return (
        <div
            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] ${className}`}
            onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setPosition({
                    x: ((event.clientX - rect.left) / rect.width) * 100,
                    y: ((event.clientY - rect.top) / rect.height) * 100,
                });
            }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(168,85,247,0.2), rgba(56,189,248,0.08) 18%, transparent 38%)`,
                }}
            />
            <div className="relative">{children}</div>
        </div>
    );
}
