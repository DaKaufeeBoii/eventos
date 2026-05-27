"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Bot,
    CalendarDays,
    LayoutDashboard,
    QrCode,
    Users,
} from "lucide-react";
import { AuroraField } from "@/components/motion/aurora-field";
import { BrandLogo } from "@/components/brand-logo";

const navItems = [
    {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
    },
    {
        href: "/dashboard/events",
        label: "Events",
        icon: CalendarDays,
    },
    {
        href: "/dashboard/volunteers",
        label: "Volunteers",
        icon: Users,
    },
    {
        href: "/dashboard/tickets",
        label: "Tickets",
        icon: QrCode,
    },
    {
        href: "/dashboard/ai-sponsor",
        label: "AI Sponsor",
        icon: Bot,
    },
];

export function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(217,249,157,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(216,137,24,0.16),transparent_26%),linear-gradient(135deg,#021f1a_0%,#063329_52%,#0b150f_100%)] text-white">
            <AuroraField />
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-lime-200/10 bg-[#032b22]/85 px-5 py-6 backdrop-blur xl:block">
                <BrandLogo />

                <nav className="mt-10 space-y-1">
                    {navItems.map((item) => {
                        const active =
                            pathname === item.href ||
                            (item.href !== "/dashboard" &&
                                pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                    active
                                        ? "bg-lime-200 text-emerald-950"
                                        : "text-lime-50/75 hover:bg-lime-100/10 hover:text-lime-50"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="relative z-10 xl:pl-72">
                <header className="sticky top-0 z-20 border-b border-lime-200/10 bg-[#032b22]/85 px-4 py-3 backdrop-blur xl:hidden">
                    <div className="flex items-center justify-between">
                        <BrandLogo compact />
                        <div className="flex gap-1 overflow-x-auto">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active =
                                    pathname === item.href ||
                                    (item.href !== "/dashboard" &&
                                        pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        aria-label={item.label}
                                        className={`grid h-9 w-9 place-items-center rounded-lg ${
                                            active
                                                ? "bg-lime-200 text-emerald-950"
                                                : "text-lime-50/75"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </header>

                <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 xl:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
