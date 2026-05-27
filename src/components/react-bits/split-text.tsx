"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type SplitTextProps = {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: "chars" | "words" | "lines" | "words, chars";
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: React.CSSProperties["textAlign"];
    onLetterAnimationComplete?: () => void;
};

gsap.registerPlugin(useGSAP);

export default function SplitText({
    tag = "p",
    text,
    className = "",
    delay = 50,
    duration = 1.25,
    ease = "power3.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onLetterAnimationComplete,
}: SplitTextProps) {
    const ref = useRef<HTMLElement | null>(null);
    const targetsRef = useRef<HTMLSpanElement[]>([]);
    const completeRef = useRef(onLetterAnimationComplete);

    useEffect(() => {
        completeRef.current = onLetterAnimationComplete;
    }, [onLetterAnimationComplete]);

    const parts = useMemo(() => {
        if (splitType.includes("words")) {
            return text.split(/(\s+)/).map((part, index) => ({
                key: `${part}-${index}`,
                value: part,
                isSpace: /^\s+$/.test(part),
            }));
        }

        return Array.from(text).map((part, index) => ({
            key: `${part}-${index}`,
            value: part,
            isSpace: part === " ",
        }));
    }, [splitType, text]);

    useGSAP(
        () => {
            if (!ref.current || targetsRef.current.length === 0) {
                return;
            }

            const media = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

            if (media.matches) {
                gsap.set(targetsRef.current, { opacity: 1, y: 0 });
                completeRef.current?.();
                return;
            }

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    observer.disconnect();
                    gsap.fromTo(targetsRef.current, from, {
                        ...to,
                        duration,
                        ease,
                        stagger: delay / 1000,
                        onComplete: () => completeRef.current?.(),
                    });
                },
                {
                    threshold,
                    rootMargin,
                }
            );

            observer.observe(ref.current);

            return () => observer.disconnect();
        },
        {
            dependencies: [
                text,
                delay,
                duration,
                ease,
                splitType,
                JSON.stringify(from),
                JSON.stringify(to),
                threshold,
                rootMargin,
            ],
            scope: ref,
        }
    );

    const Tag = tag;

    return (
        <Tag
            ref={ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement>}
            className={`split-parent ${className}`}
            style={{
                textAlign,
                overflow: "hidden",
                display: "inline-block",
                whiteSpace: "normal",
                wordWrap: "break-word",
            }}
        >
            {parts.map((part, index) => (
                <span
                    key={part.key}
                    ref={(el) => {
                        if (el) {
                            targetsRef.current[index] = el;
                        }
                    }}
                    className={
                        splitType.includes("words")
                            ? "split-word inline-block"
                            : "split-char inline-block"
                    }
                    aria-hidden={part.isSpace ? "true" : undefined}
                >
                    {part.isSpace ? "\u00A0" : part.value}
                </span>
            ))}
        </Tag>
    );
}
