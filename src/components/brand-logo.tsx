"use client";

import Image from "next/image";
import Link from "next/link";
import logoEventos from "@/utils/logo-eventos.png";

export function BrandLogo({
    compact = false,
    href = "/",
}: {
    compact?: boolean;
    href?: string;
}) {
    const mark = (
        <Image
            src={logoEventos}
            alt="EventOS logo"
            width={compact ? 112 : 148}
            height={compact ? 82 : 108}
            priority
            className="h-auto shrink-0 rounded-xl shadow-lg shadow-lime-950/40"
        />
    );

    return (
        <Link
            href={href}
            className="inline-flex items-center"
            aria-label="EventOS home"
        >
            {mark}
        </Link>
    );
}
