import { ReactNode } from "react"

type SkillCardProps = {
    label: string,
    icon: ReactNode;
}

export const SkillsCard = ({ label, icon }: SkillCardProps) => {
    return (
        <div className="inline-flex items-center gap-2 text-gray-300 border border-neutral-700 bg-neutral-900 rounded-lg px-2 py-1.5">
            <span>{icon}</span>
            <span>{label}</span>
        </div>
    )
}