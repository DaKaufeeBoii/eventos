"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    MapPin,
    MessageSquare,
    QrCode,
    Send,
    Tag,
    TicketCheck,
} from "lucide-react";
import QRCode from "react-qr-code";
import { getEventById, getEvents } from "@/lib/events";
import { Event } from "@/types/event";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

type EventComment = {
    id: string;
    author: string;
    message: string;
    createdAt: string;
};

type EventRegistration = {
    id: string;
    eventId: string;
    eventTitle: string;
    attendeeName: string;
    attendeeEmail: string;
    createdAt: string;
};

export default function EventDetailsPage() {
    const params = useParams<{ id: string }>();
    const eventId = params.id;

    const [event, setEvent] = useState<Event | null>(null);
    const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<EventComment[]>([]);
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");
    const [registration, setRegistration] =
        useState<EventRegistration | null>(null);
    const [attendeeName, setAttendeeName] = useState("");
    const [attendeeEmail, setAttendeeEmail] = useState("");

    const storageKey = useMemo(
        () => `eventos:event-comments:${eventId}`,
        [eventId]
    );
    const registrationStorageKey = useMemo(
        () => `eventos:event-registration:${eventId}`,
        [eventId]
    );

    useEffect(() => {
        async function fetchEvent() {
            setLoading(true);
            const [{ data }, related] = await Promise.all([
                getEventById(eventId),
                getEvents(),
            ]);

            if (data) {
                setEvent(data);
            }

            if (related.data) {
                setRelatedEvents(
                    related.data
                        .filter((item) => item.id !== eventId)
                        .slice(0, 3)
                );
            }

            setLoading(false);
        }

        fetchEvent();
    }, [eventId]);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const stored = window.localStorage.getItem(storageKey);

            if (stored) {
                setComments(JSON.parse(stored) as EventComment[]);
            } else {
                setComments([
                    {
                        id: "seed-1",
                        author: "Event team",
                        message: "Use this space for planning notes, attendee questions, and internal event updates.",
                        createdAt: new Date().toISOString(),
                    },
                ]);
            }
        });

        return () => cancelAnimationFrame(frame);
    }, [storageKey]);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const stored = window.localStorage.getItem(registrationStorageKey);

            if (stored) {
                setRegistration(JSON.parse(stored) as EventRegistration);
            }
        });

        return () => cancelAnimationFrame(frame);
    }, [registrationStorageKey]);

    function addComment(e: React.FormEvent) {
        e.preventDefault();

        const nextComments = [
            {
                id: crypto.randomUUID(),
                author: author.trim() || "Anonymous",
                message: message.trim(),
                createdAt: new Date().toISOString(),
            },
            ...comments,
        ];

        setComments(nextComments);
        window.localStorage.setItem(storageKey, JSON.stringify(nextComments));
        setAuthor("");
        setMessage("");
    }

    function registerForEvent(e: React.FormEvent) {
        e.preventDefault();

        if (!event) {
            return;
        }

        const nextRegistration = {
            id: `EVT-${event.id.slice(0, 8).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
            eventId: event.id,
            eventTitle: event.title,
            attendeeName: attendeeName.trim(),
            attendeeEmail: attendeeEmail.trim(),
            createdAt: new Date().toISOString(),
        };

        setRegistration(nextRegistration);
        window.localStorage.setItem(
            registrationStorageKey,
            JSON.stringify(nextRegistration)
        );
        setAttendeeName("");
        setAttendeeEmail("");
    }

    if (loading) {
        return (
            <div className="rounded-xl border border-white/10 bg-white/[0.06] p-8 text-zinc-300">
                Loading event details...
            </div>
        );
    }

    if (!event) {
        return (
            <div>
                <Link
                    href="/dashboard/events"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to events
                </Link>
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-8">
                    <h1 className="text-2xl font-bold">Event not found</h1>
                    <p className="mt-2 text-zinc-400">
                        This event may have been deleted or is unavailable.
                    </p>
                </div>
            </div>
        );
    }

    const eventDate = new Date(event.event_date);

    return (
        <div>
            <Link
                href="/dashboard/events"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to events
            </Link>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className="space-y-6">
                    <Reveal>
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
                            <div className="h-56 bg-[radial-gradient(circle_at_30%_20%,rgba(217,249,157,0.42),transparent_34%),radial-gradient(circle_at_75%_35%,rgba(56,189,248,0.28),transparent_30%),linear-gradient(135deg,#18181b,#111827)]" />
                            <div className="p-5 sm:p-7">
                                <p className="text-sm font-medium text-lime-200">
                                    Event details
                                </p>
                                <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                                    {event.title}
                                </h1>
                                <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    <SpotlightCard>
                        <section className="p-5 sm:p-6">
                            <h2 className="text-2xl font-bold">Details</h2>
                            <div className="mt-4 space-y-4 leading-7 text-zinc-300">
                                <p>{event.description}</p>
                                <p>
                                    This page collects the operational context
                                    for the event: schedule, location, quick
                                    topics, comments, and related event
                                    suggestions for organizers.
                                </p>
                            </div>
                        </section>
                    </SpotlightCard>

                    <SpotlightCard>
                        <section className="p-5 sm:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <MessageSquare className="h-5 w-5 text-lime-200" />
                                <h2 className="text-2xl font-bold">
                                    Comments
                                </h2>
                            </div>

                            <form
                                onSubmit={addComment}
                                className="space-y-3 rounded-xl border border-white/10 bg-zinc-950/60 p-4"
                            >
                                <input
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                                />
                                <textarea
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    placeholder="Add a comment or planning note"
                                    required
                                    className="h-28 w-full resize-none rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-semibold text-zinc-950 hover:bg-lime-200"
                                >
                                    <Send className="h-4 w-4" />
                                    Post Comment
                                </button>
                            </form>

                            <div className="mt-5 space-y-3">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-semibold">
                                                {comment.author}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        <p className="mt-2 leading-6 text-zinc-300">
                                            {comment.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </SpotlightCard>
                </div>

                <aside className="space-y-5">
                    <SpotlightCard>
                        <div className="space-y-4 p-5">
                            <div className="flex items-start gap-3">
                                <CalendarDays className="mt-1 h-5 w-5 text-lime-200" />
                                <div>
                                    <p className="font-semibold">
                                        {eventDate.toLocaleDateString(
                                            undefined,
                                            {
                                                weekday: "long",
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        {eventDate.toLocaleTimeString(
                                            undefined,
                                            {
                                                hour: "numeric",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 border-t border-white/10 pt-4">
                                <MapPin className="mt-1 h-5 w-5 text-lime-200" />
                                <div>
                                    <p className="font-semibold">
                                        {event.location}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        Primary venue
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard>
                        <section className="p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <TicketCheck className="h-5 w-5 text-lime-200" />
                                <h2 className="font-bold">Registration</h2>
                            </div>

                            {registration ? (
                                <div>
                                    <div className="mb-4 flex items-start gap-3 rounded-lg border border-lime-300/20 bg-lime-300/10 p-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-lime-200" />
                                        <div>
                                            <p className="font-semibold">
                                                Registered
                                            </p>
                                            <p className="text-sm text-zinc-400">
                                                {registration.attendeeName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-white p-4">
                                        <QRCode
                                            value={JSON.stringify(
                                                registration
                                            )}
                                            size={220}
                                            className="h-auto w-full"
                                        />
                                    </div>

                                    <div className="mt-4 rounded-lg bg-white/5 p-3 text-sm">
                                        <p className="text-zinc-500">
                                            Ticket ID
                                        </p>
                                        <p className="mt-1 break-all font-semibold text-zinc-200">
                                            {registration.id}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form
                                    onSubmit={registerForEvent}
                                    className="space-y-3"
                                >
                                    <input
                                        value={attendeeName}
                                        onChange={(e) =>
                                            setAttendeeName(e.target.value)
                                        }
                                        placeholder="Attendee name"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                                    />
                                    <input
                                        type="email"
                                        value={attendeeEmail}
                                        onChange={(e) =>
                                            setAttendeeEmail(e.target.value)
                                        }
                                        placeholder="Attendee email"
                                        required
                                        className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                                    />
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 font-semibold text-zinc-950 hover:bg-lime-200"
                                    >
                                        <QrCode className="h-4 w-4" />
                                        Register and Generate QR
                                    </button>
                                </form>
                            )}
                        </section>
                    </SpotlightCard>

                    <SpotlightCard>
                        <div className="p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <Tag className="h-4 w-4 text-lime-200" />
                                <h2 className="font-bold">Related topics</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {["Events", "Operations", event.location].map(
                                    (topic) => (
                                        <span
                                            key={topic}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                                        >
                                            {topic}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </SpotlightCard>

                    {relatedEvents.length > 0 && (
                        <section>
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="font-bold">
                                    You may also like
                                </h2>
                                <Link
                                    href="/dashboard/events"
                                    className="text-sm text-lime-200"
                                >
                                    See all
                                </Link>
                            </div>
                            <Stagger className="space-y-3">
                                {relatedEvents.map((item) => (
                                    <StaggerItem key={item.id}>
                                        <Link
                                            href={`/dashboard/events/${item.id}`}
                                            className="block rounded-lg border border-white/10 bg-white/[0.05] p-4 hover:bg-white/10"
                                        >
                                            <p className="font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                                                {item.description}
                                            </p>
                                        </Link>
                                    </StaggerItem>
                                ))}
                            </Stagger>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
}
