import Link from "next/link";
import { LinkedinIcon, XIcon, MailIcon, MailboxIcon } from "../lib/icons";

export const Contact = () => {
    return (
        <div>
            <div>
                <h1 className="text-2xl font-heading text-cyan-400">
                    ~ Contact me
                </h1>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                        href="https://www.linkedin.com/in/purvjoshi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors border border-neutral-700 bg-neutral-900 rounded-lg px-2"
                    >
                        <LinkedinIcon height={3} width={3} />
                        <span>LinkedIn</span>
                    </Link>
                    <Link
                        href="https://x.com/purv04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors border border-neutral-700 bg-neutral-900 rounded-lg px-2 py-1.5"
                    >
                        <XIcon height={3} width={3} />
                        <span>LinkedIn</span>
                    </Link>
                    <Link
                        href="mailto:purvjoshi.dev@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors border border-neutral-700 bg-neutral-900 rounded-lg px-2 py-1.5"
                    >
                        <MailIcon height={7} width={7} />
                        <span>Gmail</span>
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <h1 className="text-2xl font-heading font-medium text-cyan-400">~ Hire Me</h1>
                <p className="text-lg text-neutral-500 mt-2">I’m open to internships, full-time roles and freelance projects. If you’re looking for a passionate, skilled engineer who’s ready to contribute, I’d love to talk.</p>
                <Link
                    href="mailto:purvjoshi.dev@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors border border-neutral-700 bg-neutral-900 rounded-lg px-2 py-1.5 mt-2"
                >
                    <MailboxIcon height={3} width={3} />
                    <span>Hire Me</span>
                </Link>
            </div>
        </div>
    );
}