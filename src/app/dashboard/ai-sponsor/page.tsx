"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export default function AISponsorPage() {
    const [eventType, setEventType] = useState("");
    const [audience, setAudience] = useState("");
    const [scale, setScale] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    async function generateSponsors(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setResult("");

            const response = await fetch("/api/sponsor-ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventType,
                    audience,
                    scale,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.data);
            } else {
                setResult(data.error);
            }
        } catch (error: unknown) {
            setResult(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-lime-300 text-zinc-950">
                    <Bot className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-lime-200">
                    Sponsor intelligence
                </p>
                <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                    AI Sponsor Assistant
                </h1>
                <p className="mt-4 max-w-xl text-zinc-400">
                    Give the assistant the event context and it will shape a
                    sponsor category map, example companies, and an outreach
                    angle for your team.
                </p>
            </Reveal>

            <div className="space-y-5">
                <SpotlightCard>
                    <form onSubmit={generateSponsors} className="space-y-5 p-5 sm:p-6">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-zinc-300">
                                Event type
                            </span>
                            <input
                                type="text"
                                placeholder="College hackathon"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                required
                                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-zinc-300">
                                Audience
                            </span>
                            <input
                                type="text"
                                placeholder="Developers, students, startup mentors"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                required
                                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-zinc-300">
                                Expected scale
                            </span>
                            <input
                                type="text"
                                placeholder="500 attendees, 48 hours"
                                value={scale}
                                onChange={(e) => setScale(e.target.value)}
                                required
                                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-semibold text-zinc-950 hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Sparkles className="h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Generate Sponsors
                                </>
                            )}
                        </button>
                    </form>
                </SpotlightCard>

                {result && (
                    <Reveal>
                        <div className="whitespace-pre-wrap rounded-xl border border-lime-300/20 bg-lime-300/10 p-5 leading-7 text-zinc-100">
                            {result}
                        </div>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
