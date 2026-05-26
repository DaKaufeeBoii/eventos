import Link from "next/link";
import {
    ArrowRight,
    Bot,
    CalendarCheck,
    QrCode,
    Users,
} from "lucide-react";
import Image from "next/image";
import { BrandLogo } from "@/components/brand-logo";
import { AuroraField } from "@/components/motion/aurora-field";
import {
    FloatingPanel,
    Reveal,
    Stagger,
    StaggerItem,
} from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export default function HomePage() {
    const features = [
        {
            title: "Plan events",
            text: "Create event records, locations, schedules, and operational context in minutes.",
            icon: CalendarCheck,
        },
        {
            title: "Coordinate teams",
            text: "Keep volunteer skills, points, and team assignments visible for faster decisions.",
            icon: Users,
        },
        {
            title: "Find sponsors",
            text: "Turn audience and scale details into sponsor categories and outreach ideas.",
            icon: Bot,
        },
        {
            title: "Verify entry",
            text: "Use QR tickets as the foundation for cleaner check-in and attendee movement.",
            icon: QrCode,
        },
    ];

    return (
        <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_28%),linear-gradient(135deg,#09090b_0%,#111827_52%,#0f172a_100%)] text-white">
            <AuroraField />
            <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                <BrandLogo compact />
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-violet-200"
                    >
                        Start
                    </Link>
                </div>
            </nav>

            <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-20">
                <Reveal>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1 text-sm text-violet-100">
                        <span className="h-2 w-2 rounded-full bg-violet-300" />
                        AI-assisted event operations
                    </div>

                    <Image
                        src="/eventos-logo.svg"
                        alt="EventOS logo"
                        width={112}
                        height={112}
                        priority
                        className="mb-6 rounded-3xl shadow-2xl shadow-violet-950/50"
                    />

                    <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                        Run the whole event from one calm command center.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                        EventOS brings event planning, volunteer coordination,
                        sponsor ideation, analytics, and ticket verification
                        into one focused workspace for organizing teams.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-zinc-950 hover:bg-violet-200"
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 font-semibold text-white hover:bg-white/10"
                        >
                            View Dashboard
                        </Link>
                    </div>
                </Reveal>

                <FloatingPanel className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur">
                    <SpotlightCard className="bg-zinc-950/70">
                        <div className="p-5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <p className="text-sm text-zinc-400">
                                    Live operations
                                </p>
                                <h2 className="text-2xl font-bold">
                                    Hackathon Week
                                </h2>
                            </div>
                            <span className="rounded-full bg-violet-300 px-3 py-1 text-xs font-bold text-zinc-950">
                                On track
                            </span>
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-3">
                            {[
                                ["12", "Events"],
                                ["48", "Volunteers"],
                                ["312", "Guests"],
                            ].map(([value, label]) => (
                                <div
                                    key={label}
                                    className="rounded-lg bg-white/5 p-4"
                                >
                                    <p className="text-3xl font-black">
                                        {value}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 space-y-3">
                            {[
                                "Sponsor shortlist ready",
                                "Volunteer onboarding queue clear",
                                "QR ticket batch prepared",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-sm"
                                >
                                    <span>{item}</span>
                                    <span className="text-violet-200">Ready</span>
                                </div>
                            ))}
                        </div>
                        </div>
                    </SpotlightCard>
                </FloatingPanel>
            </section>

            <Stagger className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 pb-16 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <StaggerItem key={feature.title}>
                            <SpotlightCard>
                                <div className="p-5">
                                    <div className="mb-5 grid h-10 w-10 place-items-center rounded-lg bg-white text-zinc-950">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-lg font-bold">
                                        {feature.title}
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                                        {feature.text}
                                    </p>
                                </div>
                            </SpotlightCard>
                        </StaggerItem>
                    );
                })}
            </Stagger>
        </main>
    );
}
