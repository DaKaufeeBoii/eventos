"use client";

import Image from "next/image";
import Link from "next/link";

export function BrandLogo({
    compact = false,
    href = "/",
}: {
    compact?: boolean;
    href?: string;
}) {
    const mark = (
        <Image
            src="/eventos-logo.svg"
            alt="EventOS logo"
            width={compact ? 38 : 46}
            height={compact ? 38 : 46}
            priority
            className="shrink-0 rounded-xl shadow-lg shadow-violet-950/40"
        />
    );

    const wordmark = (
        <span className="leading-none">
            <span
                className={`${compact ? "text-lg" : "text-2xl"} font-black tracking-tight text-white`}
            >
                Event<span className="text-violet-400">OS</span>
            </span>
            {!compact && (
                <span className="mt-1 block text-xs font-medium text-zinc-400">
                    Event command center
                </span>
            )}
        </span>
    );

    return (
        <Link
            href={href}
            className="inline-flex items-center gap-3"
            aria-label="EventOS home"
        >
            {mark}
            {wordmark}
        </Link>
    );
}
