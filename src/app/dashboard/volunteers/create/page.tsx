"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserRoundPlus } from "lucide-react";
import { createVolunteer } from "@/lib/volunteers";

export default function CreateVolunteerPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await createVolunteer({
            name,
            email,
            skills: skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        router.push("/dashboard/volunteers");
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

            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-lime-300 text-zinc-950">
                        <UserRoundPlus className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">
                        Add Volunteer
                    </h1>
                    <p className="mt-3 text-zinc-400">
                        Capture the essentials so this person can be matched to
                        event tasks and tracked on the leaderboard.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 rounded-xl border border-white/10 bg-white/[0.06] p-5 sm:p-6"
                >
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Name
                        </span>
                        <input
                            type="text"
                            placeholder="Aarav Mehta"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Email
                        </span>
                        <input
                            type="email"
                            placeholder="aarav@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Skills
                        </span>
                        <input
                            type="text"
                            placeholder="registration, stage, social media"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                        <span className="mt-2 block text-xs text-zinc-500">
                            Separate multiple skills with commas.
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white py-3 font-semibold text-zinc-950 hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Adding..." : "Add Volunteer"}
                    </button>
                </form>
            </div>
        </div>
    );
}
