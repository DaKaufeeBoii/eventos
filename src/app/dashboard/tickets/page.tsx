"use client";

import QRCode from "react-qr-code";
import { Download, QrCode, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

export default function TicketsPage() {
    const ticketData = {
        attendee: "John Doe",
        event: "EventOS Hackathon",
        ticketId: "EVT-2026-001",
    };

    return (
        <div className="grid min-h-[calc(100vh-4rem)] items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
                <p className="text-sm font-medium text-lime-200">
                    Entry verification
                </p>
                <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                    Ticket Preview
                </h1>
                <p className="mt-4 max-w-xl text-zinc-400">
                    A cleaner ticket surface for validating attendee details at
                    the door. The QR payload is ready for scanner workflows.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                        ["Attendee", ticketData.attendee],
                        ["Event", ticketData.event],
                        ["Ticket ID", ticketData.ticketId],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
                        >
                            <p className="text-xs uppercase tracking-wider text-zinc-500">
                                {label}
                            </p>
                            <p className="mt-1 font-semibold">{value}</p>
                        </div>
                    ))}
                </div>
            </Reveal>

            <SpotlightCard className="mx-auto w-full max-w-md p-6 text-center shadow-2xl shadow-black/30">
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                        <span className="grid h-10 w-10 place-items-center rounded-lg bg-lime-300 text-zinc-950">
                            <QrCode className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="text-xl font-bold">Event Ticket</h2>
                            <p className="text-sm text-zinc-400">
                                Secure entry pass
                            </p>
                        </div>
                    </div>
                    <ShieldCheck className="h-5 w-5 text-lime-200" />
                </div>

                <div className="inline-block rounded-xl bg-white p-4">
                    <QRCode value={JSON.stringify(ticketData)} size={220} />
                </div>

                <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 font-semibold text-zinc-950 hover:bg-lime-200">
                    <Download className="h-4 w-4" />
                    Export Ticket
                </button>
            </SpotlightCard>
        </div>
    );
}
