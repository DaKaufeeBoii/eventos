"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

type TextPressureProps = {
    text?: string;
    fontFamily?: string;
    fontUrl?: string;
    flex?: boolean;
    scale?: boolean;
    alpha?: boolean;
    stroke?: boolean;
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    textColor?: string;
    strokeColor?: string;
    className?: string;
    minFontSize?: number;
    maxFontSize?: number;
};

type Point = {
    x: number;
    y: number;
};

const dist = (a: Point, b: Point) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (
    distance: number,
    maxDist: number,
    minVal: number,
    maxVal: number
) => {
    const val = maxVal - Math.abs((maxVal * distance) / maxDist);
    return Math.max(minVal, val + minVal);
};

const debounce = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
};

export default function TextPressure({
    text = "EventOS",
    fontFamily = "Poppins",
    fontUrl,
    width = true,
    weight = true,
    italic = false,
    alpha = false,
    flex = true,
    stroke = false,
    scale = false,
    textColor = "#F2FFC7",
    strokeColor = "#D88918",
    className = "",
    minFontSize = 24,
    maxFontSize = 180,
}: TextPressureProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const spansRef = useRef<Array<HTMLSpanElement | null>>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    const [fontSize, setFontSize] = useState(minFontSize);
    const [scaleY, setScaleY] = useState(1);
    const [lineHeight, setLineHeight] = useState(1);

    const chars = useMemo(() => text.split(""), [text]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            cursorRef.current.x = event.clientX;
            cursorRef.current.y = event.clientY;
        };

        const handleTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];
            cursorRef.current.x = touch.clientX;
            cursorRef.current.y = touch.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, {
            passive: true,
        });

        if (containerRef.current) {
            const { left, top, width: rectWidth, height } =
                containerRef.current.getBoundingClientRect();
            mouseRef.current.x = left + rectWidth / 2;
            mouseRef.current.y = top + height / 2;
            cursorRef.current.x = mouseRef.current.x;
            cursorRef.current.y = mouseRef.current.y;
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    const setSize = useCallback(() => {
        if (!containerRef.current || !titleRef.current) {
            return;
        }

        const { width: containerWidth, height: containerHeight } =
            containerRef.current.getBoundingClientRect();
        const nextFontSize = Math.min(
            Math.max(
                containerWidth / Math.max(chars.length / 2, 1),
                minFontSize
            ),
            maxFontSize
        );

        setFontSize(nextFontSize);
        setScaleY(1);
        setLineHeight(1);

        requestAnimationFrame(() => {
            if (!titleRef.current) {
                return;
            }

            const textRect = titleRef.current.getBoundingClientRect();

            if (scale && textRect.height > 0) {
                const yRatio = containerHeight / textRect.height;
                setScaleY(yRatio);
                setLineHeight(yRatio);
            }
        });
    }, [chars.length, maxFontSize, minFontSize, scale]);

    useEffect(() => {
        const debouncedSetSize = debounce(setSize, 100);
        debouncedSetSize();
        window.addEventListener("resize", debouncedSetSize);
        return () => window.removeEventListener("resize", debouncedSetSize);
    }, [setSize]);

    useEffect(() => {
        let rafId = 0;

        const animate = () => {
            mouseRef.current.x +=
                (cursorRef.current.x - mouseRef.current.x) / 15;
            mouseRef.current.y +=
                (cursorRef.current.y - mouseRef.current.y) / 15;

            if (titleRef.current) {
                const titleRect = titleRef.current.getBoundingClientRect();
                const maxDist = titleRect.width / 2;

                spansRef.current.forEach((span) => {
                    if (!span) {
                        return;
                    }

                    const rect = span.getBoundingClientRect();
                    const charCenter = {
                        x: rect.x + rect.width / 2,
                        y: rect.y + rect.height / 2,
                    };
                    const distance = dist(mouseRef.current, charCenter);
                    const wdth = width
                        ? Math.floor(getAttr(distance, maxDist, 5, 200))
                        : 100;
                    const wght = weight
                        ? Math.floor(getAttr(distance, maxDist, 100, 900))
                        : 700;
                    const italVal = italic
                        ? getAttr(distance, maxDist, 0, 1).toFixed(2)
                        : 0;
                    const alphaVal = alpha
                        ? getAttr(distance, maxDist, 0, 1).toFixed(2)
                        : "1";
                    const fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

                    if (
                        span.style.fontVariationSettings !==
                        fontVariationSettings
                    ) {
                        span.style.fontVariationSettings =
                            fontVariationSettings;
                    }

                    if (alpha && span.style.opacity !== alphaVal) {
                        span.style.opacity = alphaVal;
                    }
                });
            }

            rafId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(rafId);
    }, [alpha, italic, weight, width]);

    const styleElement = useMemo(() => {
        if (!fontUrl) {
            return null;
        }

        return (
            <style>{`
                @font-face {
                    font-family: '${fontFamily}';
                    src: url('${fontUrl}');
                    font-style: normal;
                }
            `}</style>
        );
    }, [fontFamily, fontUrl]);

    const dynamicClassName = [
        className,
        flex ? "flex justify-between" : "",
        stroke ? "text-pressure-stroke" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full bg-transparent"
        >
            {styleElement}
            <h1
                ref={titleRef}
                className={`text-pressure-title ${dynamicClassName}`}
                style={{
                    color: textColor,
                    fontFamily,
                    textTransform: "uppercase",
                    fontSize,
                    lineHeight,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: "center top",
                    margin: 0,
                    textAlign: "center",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    fontWeight: 900,
                    width: "100%",
                }}
            >
                {chars.map((char, index) => (
                    <span
                        key={`${char}-${index}`}
                        ref={(el) => {
                            spansRef.current[index] = el;
                        }}
                        data-char={char}
                        style={{
                            display: "inline-block",
                            color: stroke ? undefined : textColor,
                            WebkitTextStroke: stroke
                                ? `2px ${strokeColor}`
                                : undefined,
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h1>
        </div>
    );
}
