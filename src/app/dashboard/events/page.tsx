"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarPlus, MapPin, Plus } from "lucide-react";
import { getEvents } from "@/lib/events";
import { Event } from "@/types/event";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const { data } = await getEvents();

            if (data) {
                setEvents(data);
            }
        }

        fetchEvents();
    }, []);

    return (
        <div>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-lime-200">
                        Schedule and venues
                    </p>
                    <h1 className="mt-2 text-4xl font-black tracking-tight">
                        Events
                    </h1>
                    <p className="mt-3 max-w-2xl text-zinc-400">
                        Track what is happening, where it is happening, and
                        when the team needs to be ready.
                    </p>
                </div>

                <Link
                    href="/dashboard/create-event"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 font-semibold text-zinc-950 hover:bg-lime-200"
                >
                    <Plus className="h-4 w-4" />
                    Create Event
                </Link>
            </div>

            {events.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.04] p-10 text-center">
                    <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg bg-white text-zinc-950">
                        <CalendarPlus className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">No events yet</h2>
                    <p className="mx-auto mt-2 max-w-md text-zinc-400">
                        Create your first event to start building schedules,
                        volunteer plans, and sponsor opportunities.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-lime-300/40 hover:bg-white/[0.08]"
                        >
                            <Link href={`/dashboard/events/${event.id}`}>
                                <h2 className="text-xl font-bold">
                                    {event.title}
                                </h2>
                                <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
                                    {event.description}
                                </p>
                            </Link>

                            <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm text-zinc-300">
                                <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-lime-200" />
                                    {event.location}
                                </p>

                                <p className="flex items-center gap-2">
                                    <CalendarPlus className="h-4 w-4 text-lime-200" />
                                    {new Date(
                                        event.event_date
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <Link
                                href={`/dashboard/events/${event.id}`}
                                className="mt-5 inline-flex rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-lime-100 hover:bg-white/10"
                            >
                                View details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
