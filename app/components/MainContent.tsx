import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { Contact } from "./Contact";
import { SkillsList } from "./SkillsList";

export const MainContent = () => {
    return (
        <div className="flex flex-col max-w-4xl gap-5">
            <div className="flex">
                <Image
                    src="profile.svg"
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-xl"
                />
                <div className="flex flex-col  ml-3 mt-28 items-center gap-2">
                    <StatusBadge variant="green" />
                </div>
            </div>
            <h1 className="text-3xl font-heading text-cyan-400">~ Purv Joshi</h1>
            <p className="text-lg text-neutral-500 font-medium">Full-stack engineer | DevOps & Security | Learning the internet from the ground up.</p>
            <Contact />
            <SkillsList/>
        </div>
    )
}