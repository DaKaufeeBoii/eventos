"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Bot, CalendarDays, TicketCheck, Users } from "lucide-react";

const data = [
    { name: "Jan", events: 4 },
    { name: "Feb", events: 7 },
    { name: "Mar", events: 12 },
    { name: "Apr", events: 9 },
];

export default function DashboardPage() {
    const [chartReady, setChartReady] =
        useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setChartReady(true);
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    const stats = [
        {
            label: "Total Events",
            value: "12",
            note: "4 active this month",
            icon: CalendarDays,
        },
        {
            label: "Volunteers",
            value: "48",
            note: "18 high-skill matches",
            icon: Users,
        },
        {
            label: "Participants",
            value: "312",
            note: "92% ticket readiness",
            icon: TicketCheck,
        },
    ];

    return (
        <div>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-lime-200">
                        Operations overview
                    </p>
                    <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                        Dashboard
                    </h1>
                    <p className="mt-3 max-w-2xl text-zinc-400">
                        A fast pulse check across events, teams, sponsors, and
                        attendee readiness.
                    </p>
                </div>
                <div className="rounded-lg border border-lime-300/20 bg-lime-300/10 px-4 py-3 text-sm text-lime-100">
                    Today: 3 priority actions
                </div>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-white/10 bg-white/[0.06] p-5"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-sm text-zinc-400">
                                        {stat.label}
                                    </h2>
                                    <p className="mt-3 text-4xl font-black">
                                        {stat.value}
                                    </p>
                                </div>
                                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-zinc-950">
                                    <Icon className="h-5 w-5" />
                                </span>
                            </div>
                            <p className="mt-4 text-sm text-zinc-400">
                                {stat.note}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Event Analytics
                            </h2>
                            <p className="text-sm text-zinc-400">
                                Monthly event volume
                            </p>
                        </div>
                    </div>

                    <div className="h-[320px] min-w-0">
                        {chartReady ? (
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                                minWidth={0}
                            >
                                <BarChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#a1a1aa" }}
                                    />
                                    <Tooltip
                                        cursor={{
                                            fill: "rgba(255,255,255,0.06)",
                                        }}
                                        contentStyle={{
                                            background: "#09090b",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRadius: "10px",
                                            color: "white",
                                        }}
                                    />
                                    <Bar
                                        dataKey="events"
                                        fill="#a78bfa"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full rounded-lg bg-white/5" />
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5">
                    <div className="mb-5 flex items-center gap-3">
                                <span className="grid h-10 w-10 place-items-center rounded-lg bg-lime-300 text-zinc-950">
                            <Bot className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="text-xl font-bold">
                                Next Best Actions
                            </h2>
                            <p className="text-sm text-zinc-400">
                                Suggested workflow
                            </p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {[
                            "Create the next event schedule",
                            "Assign volunteer skill clusters",
                            "Generate sponsor targets",
                            "Prepare QR ticket batch",
                        ].map((action, index) => (
                            <div
                                key={action}
                                className="flex gap-3 rounded-lg bg-white/5 p-3 text-sm"
                            >
                                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-zinc-950">
                                    {index + 1}
                                </span>
                                <span className="text-zinc-200">{action}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
