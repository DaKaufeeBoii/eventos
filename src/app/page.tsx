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
import logoEventos from "@/utils/logo-eventos.png";
import { AuroraField } from "@/components/motion/aurora-field";
import {
    FloatingPanel,
    Reveal,
    Stagger,
    StaggerItem,
} from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import SplitText from "@/components/react-bits/split-text";
import TextPressure from "@/components/react-bits/text-pressure";

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
        <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(217,249,157,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(216,137,24,0.18),transparent_28%),linear-gradient(135deg,#021f1a_0%,#063329_52%,#0b150f_100%)] text-lime-50">
            <AuroraField />
            <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
                <BrandLogo compact />
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-lime-50/75 hover:bg-lime-100/10 hover:text-lime-50"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-lg bg-[#d88918] px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-lime-200"
                    >
                        Start
                    </Link>
                </div>
            </nav>

            <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-20">
                <Reveal>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-lime-200/10 px-3 py-1 text-sm text-lime-100">
                        <span className="h-2 w-2 rounded-full bg-lime-300" />
                        AI-assisted event operations
                    </div>

                    <Image
                        src={logoEventos}
                        alt="EventOS logo"
                        width={220}
                        height={160}
                        priority
                        className="mb-6 h-auto rounded-3xl shadow-2xl shadow-lime-950/50"
                    />

                    <SplitText
                        tag="h1"
                        text="Run the whole event from one calm command center."
                        splitType="words"
                        delay={70}
                        duration={0.8}
                        textAlign="left"
                        className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-lime-50 sm:text-6xl lg:text-7xl"
                    />

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-lime-50/75">
                        EventOS brings event planning, volunteer coordination,
                        sponsor ideation, analytics, and ticket verification
                        into one focused workspace for organizing teams.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d88918] px-5 py-3 font-semibold text-emerald-950 hover:bg-lime-200"
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center rounded-lg border border-lime-100/20 px-5 py-3 font-semibold text-lime-50 hover:bg-lime-100/10"
                        >
                            View Dashboard
                        </Link>
                    </div>
                </Reveal>

                <FloatingPanel className="rounded-2xl border border-lime-100/10 bg-lime-50/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur">
                    <SpotlightCard className="bg-[#032b22]/80">
                        <div className="p-5">
                        <div className="flex items-center justify-between border-b border-lime-100/10 pb-4">
                            <div>
                                <p className="text-sm text-lime-50/60">
                                    Live operations
                                </p>
                                <h2 className="text-2xl font-bold">
                                    Hackathon Week
                                </h2>
                            </div>
                            <span className="rounded-full bg-[#d88918] px-3 py-1 text-xs font-bold text-emerald-950">
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
                                    className="rounded-lg bg-lime-50/5 p-4"
                                >
                                    <p className="text-3xl font-black">
                                        {value}
                                    </p>
                                    <p className="text-sm text-lime-50/60">
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
                                    className="flex items-center justify-between rounded-lg bg-lime-50/5 px-4 py-3 text-sm"
                                >
                                    <span>{item}</span>
                                    <span className="text-[#f0a326]">Ready</span>
                                </div>
                            ))}
                        </div>
                        </div>
                    </SpotlightCard>
                </FloatingPanel>
            </section>

            <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10">
                <div className="overflow-hidden rounded-2xl border border-lime-100/10 bg-[#032b22]/45 px-4 py-6 shadow-2xl shadow-black/20 backdrop-blur sm:px-8">
                    <div className="h-20 sm:h-28 lg:h-32">
                    <TextPressure
                        text="EventOS"
                        textColor="#f4ffc9"
                        strokeColor="#d88918"
                        minFontSize={42}
                        maxFontSize={132}
                        weight
                        width
                        italic={false}
                    />
                    </div>
                </div>
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
