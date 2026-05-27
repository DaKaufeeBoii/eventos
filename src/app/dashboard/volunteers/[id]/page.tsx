"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Mail,
    Medal,
    Send,
    Star,
    Trophy,
    UserRound,
} from "lucide-react";
import { getVolunteerById, getVolunteers } from "@/lib/volunteers";
import { Volunteer } from "@/types/volunteer";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

type VolunteerRating = {
    id: string;
    author: string;
    score: number;
    note: string;
    createdAt: string;
};

export default function VolunteerDetailsPage() {
    const params = useParams<{ id: string }>();
    const volunteerId = params.id;

    const [volunteer, setVolunteer] =
        useState<Volunteer | null>(null);
    const [otherVolunteers, setOtherVolunteers] =
        useState<Volunteer[]>([]);
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState<VolunteerRating[]>([]);
    const [author, setAuthor] = useState("");
    const [score, setScore] = useState(5);
    const [note, setNote] = useState("");

    const storageKey = useMemo(
        () => `eventos:volunteer-ratings:${volunteerId}`,
        [volunteerId]
    );

    const averageRating =
        ratings.length === 0
            ? 0
            : ratings.reduce((total, rating) => total + rating.score, 0) /
              ratings.length;

    useEffect(() => {
        async function fetchVolunteer() {
            setLoading(true);
            const [{ data }, others] = await Promise.all([
                getVolunteerById(volunteerId),
                getVolunteers(),
            ]);

            if (data) {
                setVolunteer(data);
            }

            if (others.data) {
                setOtherVolunteers(
                    others.data
                        .filter((item) => item.id !== volunteerId)
                        .slice(0, 3)
                );
            }

            setLoading(false);
        }

        fetchVolunteer();
    }, [volunteerId]);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const stored = window.localStorage.getItem(storageKey);

            if (stored) {
                setRatings(JSON.parse(stored) as VolunteerRating[]);
            } else {
                setRatings([
                    {
                        id: "seed-1",
                        author: "Organizer",
                        score: 5,
                        note: "Reliable team member. Add ratings here after shifts, tasks, or event assignments.",
                        createdAt: new Date().toISOString(),
                    },
                ]);
            }
        });

        return () => cancelAnimationFrame(frame);
    }, [storageKey]);

    function addRating(e: React.FormEvent) {
        e.preventDefault();

        const nextRatings = [
            {
                id: crypto.randomUUID(),
                author: author.trim() || "Organizer",
                score,
                note: note.trim(),
                createdAt: new Date().toISOString(),
            },
            ...ratings,
        ];

        setRatings(nextRatings);
        window.localStorage.setItem(storageKey, JSON.stringify(nextRatings));
        setAuthor("");
        setScore(5);
        setNote("");
    }

    if (loading) {
        return (
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-8 text-zinc-300">
                Loading volunteer profile...
            </div>
        );
    }

    if (!volunteer) {
        return (
            <div>
                <Link
                    href="/dashboard/volunteers"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to volunteers
                </Link>
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-8">
                    <h1 className="text-2xl font-bold">
                        Volunteer not found
                    </h1>
                    <p className="mt-2 text-zinc-400">
                        This profile may have been deleted or is unavailable.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Link
                href="/dashboard/volunteers"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to volunteers
            </Link>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                    <Reveal>
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
                            <div className="h-52 bg-[radial-gradient(circle_at_30%_20%,rgba(217,249,157,0.42),transparent_34%),radial-gradient(circle_at_75%_35%,rgba(56,189,248,0.28),transparent_30%),linear-gradient(135deg,#18181b,#111827)]" />
                            <div className="-mt-12 p-5 sm:p-7">
                                <div className="grid h-24 w-24 place-items-center rounded-2xl border border-white/15 bg-white text-3xl font-black text-zinc-950 shadow-2xl shadow-black/30">
                                    {volunteer.name
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </div>
                                <p className="mt-5 text-sm font-medium text-lime-200">
                                    Volunteer profile
                                </p>
                                <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                                    {volunteer.name}
                                </h1>
                                <p className="mt-3 flex items-center gap-2 text-zinc-400">
                                    <Mail className="h-4 w-4 text-lime-200" />
                                    {volunteer.email}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <SpotlightCard>
                        <section className="p-5 sm:p-6">
                            <h2 className="text-2xl font-bold">
                                Skills and contribution
                            </h2>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {volunteer.skills?.length ? (
                                    volunteer.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-zinc-500">
                                        No skills added
                                    </span>
                                )}
                            </div>
                            <p className="mt-5 leading-7 text-zinc-300">
                                Use this profile to understand where the
                                volunteer fits best, how they are performing,
                                and what organizers should know before assigning
                                them to event tasks.
                            </p>
                        </section>
                    </SpotlightCard>

                    <SpotlightCard>
                        <section className="p-5 sm:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <Star className="h-5 w-5 text-lime-200" />
                                <h2 className="text-2xl font-bold">Ratings</h2>
                            </div>

                            <form
                                onSubmit={addRating}
                                className="space-y-3 rounded-xl border border-white/10 bg-zinc-950/60 p-4"
                            >
                                <input
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Reviewer name"
                                    className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                                />
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-zinc-300">
                                        Rating
                                    </span>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={score}
                                        onChange={(e) =>
                                            setScore(Number(e.target.value))
                                        }
                                        className="w-full accent-lime-300"
                                    />
                                    <span className="mt-1 block text-sm text-lime-200">
                                        {score} out of 5
                                    </span>
                                </label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Add performance notes"
                                    required
                                    className="h-28 w-full resize-none rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-semibold text-zinc-950 hover:bg-lime-200"
                                >
                                    <Send className="h-4 w-4" />
                                    Submit Rating
                                </button>
                            </form>

                            <div className="mt-5 space-y-3">
                                {ratings.map((rating) => (
                                    <div
                                        key={rating.id}
                                        className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-semibold">
                                                {rating.author}
                                            </p>
                                            <div className="flex items-center gap-1 text-lime-200">
                                                {Array.from({
                                                    length: rating.score,
                                                }).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        className="h-4 w-4 fill-current"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-2 leading-6 text-zinc-300">
                                            {rating.note}
                                        </p>
                                        <p className="mt-2 text-xs text-zinc-500">
                                            {new Date(
                                                rating.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </SpotlightCard>
                </div>

                <aside className="space-y-5">
                    <SpotlightCard>
                        <div className="grid grid-cols-2 gap-3 p-5">
                            <div className="rounded-lg bg-white/5 p-4">
                                <Trophy className="mb-3 h-5 w-5 text-lime-200" />
                                <p className="text-3xl font-black">
                                    {volunteer.points ?? 0}
                                </p>
                                <p className="text-sm text-zinc-400">Points</p>
                            </div>
                            <div className="rounded-lg bg-white/5 p-4">
                                <Medal className="mb-3 h-5 w-5 text-lime-200" />
                                <p className="text-3xl font-black">
                                    {averageRating.toFixed(1)}
                                </p>
                                <p className="text-sm text-zinc-400">
                                    Avg rating
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard>
                        <div className="p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <UserRound className="h-4 w-4 text-lime-200" />
                                <h2 className="font-bold">
                                    Similar volunteers
                                </h2>
                            </div>
                            {otherVolunteers.length > 0 ? (
                                <Stagger className="space-y-3">
                                    {otherVolunteers.map((item) => (
                                        <StaggerItem key={item.id}>
                                            <Link
                                                href={`/dashboard/volunteers/${item.id}`}
                                                className="block rounded-lg border border-white/10 bg-white/[0.05] p-4 hover:bg-white/10"
                                            >
                                                <p className="font-semibold">
                                                    {item.name}
                                                </p>
                                                <p className="mt-1 text-sm text-zinc-400">
                                                    {item.points ?? 0} points
                                                </p>
                                            </Link>
                                        </StaggerItem>
                                    ))}
                                </Stagger>
                            ) : (
                                <p className="text-sm text-zinc-400">
                                    Add more volunteers to see suggestions.
                                </p>
                            )}
                        </div>
                    </SpotlightCard>
                </aside>
            </div>
        </div>
    );
}
