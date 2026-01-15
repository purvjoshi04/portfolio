import { Space_Grotesk, Inter, Crimson_Text } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-heading',
    display: "swap"
});

export const inter = Inter({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-body',
    display: "swap"
});

export const crimsonText = Crimson_Text({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-accent',
    display: "swap"
});