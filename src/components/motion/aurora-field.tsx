"use client";

import { motion } from "framer-motion";

export function AuroraField() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute left-[8%] top-[12%] h-56 w-56 rounded-full bg-lime-300/18 blur-3xl"
                animate={{ x: [0, 45, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[8%] right-[12%] h-72 w-72 rounded-full bg-orange-500/16 blur-3xl"
                animate={{ x: [0, -35, 0], y: [0, -26, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
        </div>
    );
}
