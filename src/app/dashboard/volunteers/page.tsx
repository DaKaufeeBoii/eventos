"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trophy, UserRoundPlus, Users } from "lucide-react";
import { getVolunteers } from "@/lib/volunteers";
import { Volunteer } from "@/types/volunteer";

export default function VolunteersPage() {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

    useEffect(() => {
        async function fetchVolunteers() {
            const { data } = await getVolunteers();

            if (data) {
                setVolunteers(data);
            }
        }

        fetchVolunteers();
    }, []);

    return (
        <div>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-lime-200">
                        Team coordination
                    </p>
                    <h1 className="mt-2 text-4xl font-black tracking-tight">
                        Volunteers
                    </h1>
                    <p className="mt-3 max-w-2xl text-zinc-400">
                        Sort the volunteer bench by points, skills, and
                        readiness for event assignments.
                    </p>
                </div>

                <Link
                    href="/dashboard/volunteers/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 font-semibold text-zinc-950 hover:bg-lime-200"
                >
                    <Plus className="h-4 w-4" />
                    Add Volunteer
                </Link>
            </div>

            {volunteers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.04] p-10 text-center">
                    <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg bg-white text-zinc-950">
                        <UserRoundPlus className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">No volunteers yet</h2>
                    <p className="mx-auto mt-2 max-w-md text-zinc-400">
                        Add volunteers with skills so the team can assign the
                        right people to the right event work.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {volunteers.map((volunteer, index) => (
                        <div
                            key={volunteer.id}
                            className="rounded-xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-lime-300/40 hover:bg-white/[0.08]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <Link
                                    href={`/dashboard/volunteers/${volunteer.id}`}
                                    className="flex items-center gap-3"
                                >
                                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-white text-sm font-black text-zinc-950">
                                        {volunteer.name
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {volunteer.name}
                                        </h2>
                                        <p className="text-sm text-zinc-400">
                                            {volunteer.email}
                                        </p>
                                    </div>
                                </Link>

                                <span className="inline-flex items-center gap-1 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-zinc-950">
                                    <Trophy className="h-3.5 w-3.5" />
                                    {volunteer.points ?? 0}
                                </span>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {volunteer.skills?.length ? (
                                    volunteer.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-zinc-500">
                                        No skills added
                                    </span>
                                )}
                            </div>

                            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-zinc-400">
                                <Users className="h-4 w-4 text-lime-200" />
                                Rank #{index + 1} on the leaderboard
                            </div>

                            <Link
                                href={`/dashboard/volunteers/${volunteer.id}`}
                                className="mt-5 inline-flex rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-lime-100 hover:bg-white/10"
                            >
                                View profile
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
