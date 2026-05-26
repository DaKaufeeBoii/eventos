"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { createEvent } from "@/lib/events";

export default function CreateEventPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCreateEvent(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        const { error } = await createEvent({
            title,
            description,
            location,
            event_date: eventDate,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        router.push("/dashboard/events");
    }

    return (
        <div>
            <Link
                href="/dashboard/events"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to events
            </Link>

            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-violet-300 text-zinc-950">
                        <CalendarPlus className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">
                        Create Event
                    </h1>
                    <p className="mt-3 text-zinc-400">
                        Add the operational basics first. You can use the event
                        details later for volunteer planning and sponsor
                        generation.
                    </p>
                </div>

                <form
                    onSubmit={handleCreateEvent}
                    className="space-y-5 rounded-xl border border-white/10 bg-white/[0.06] p-5 sm:p-6"
                >
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Event title
                        </span>
                        <input
                            type="text"
                            placeholder="Summer Hackathon"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Description
                        </span>
                        <textarea
                            placeholder="What should the team know?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="h-32 w-full resize-none rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Location
                        </span>
                        <input
                            type="text"
                            placeholder="Main auditorium"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Date and time
                        </span>
                        <input
                            type="datetime-local"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white py-3 font-semibold text-zinc-950 hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Event"}
                    </button>
                </form>
            </div>
        </div>
    );
}
