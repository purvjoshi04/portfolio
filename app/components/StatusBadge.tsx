import React from "react";

type Variant = "monochrome" | "green" | "blue" | "glass";

interface StatusBadgeProps {
    variant?: Variant;
    text?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
    variant = "green",
    text = "Open for Work",
}) => {
    const containerStyles = {
        monochrome:
            "bg-neutral-900 border border-neutral-800 text-neutral-100 shadow-sm",
        green: "bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-sm",
        blue: "bg-blue-50 border border-blue-200 text-blue-700 shadow-sm",
        glass:
            "bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 shadow-sm",
    };

    const dotStyles = {
        monochrome: "bg-white",
        green: "bg-emerald-500",
        blue: "bg-blue-500",
        glass: "bg-rose-500",
    };

    const pingStyles = {
        monochrome: "bg-neutral-500",
        green: "bg-emerald-400",
        blue: "bg-blue-400",
        glass: "bg-rose-400",
    };

    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-body transition-transform hover:scale-105 cursor-default ${containerStyles[variant]}`}
        >
            <span className="relative flex h-2.5 w-2.5">
                <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingStyles[variant]}`}
                ></span>
                <span
                    className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotStyles[variant]}`}
                ></span>
            </span>
            <span>{text}</span>
        </div>
    );
};

export default StatusBadge;