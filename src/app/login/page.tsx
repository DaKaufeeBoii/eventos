"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleLogin(
        e: React.FormEvent
    ) {
        e.preventDefault();

        setLoading(true);

        const { error } = await signIn(
            email,
            password
        );

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(217,249,157,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_30%),#09090b] px-4 text-white">
            <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
                <div className="mb-8">
                    <BrandLogo />
                </div>
                <h1 className="text-3xl font-black tracking-tight">
                    Welcome Back
                </h1>

                <p className="mb-6 mt-2 text-zinc-400">
                    Login to continue to EventOS.
                </p>

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Email
                        </span>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-zinc-300">
                            Password
                        </span>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white py-3 font-semibold text-zinc-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-zinc-400">
                    New here?{" "}
                    <Link href="/signup" className="font-semibold text-lime-200">
                        Create an account
                    </Link>
                </p>
            </div>
        </main>
    );
}
