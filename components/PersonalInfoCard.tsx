"use client";

import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";

interface PersonalInfoCardProps {
    name: string;
    role: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    status?: string;
    avatarUrl?: string;
}

export const PersonalInfoCard = ({
    name,
    role,
    location,
    email,
    github,
    linkedin,
    status = "Open to Opportunities",
    avatarUrl,
}: PersonalInfoCardProps) => {
    return (
        <div className="w-full max-w-3xl mx-auto p-1 rounded-2xl bg-gradient-to-b from-white/5 to-transparent">
            <div className="glass rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                {/* Subtle sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Left: Avatar */}
                <div className="relative shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/30 transition-colors duration-300 bg-zinc-900 flex items-center justify-center relative shadow-2xl">
                        {avatarUrl ? (
                            <Image src={avatarUrl} alt={name} fill className="object-cover" />
                        ) : (
                            <div className="text-zinc-700 text-4xl font-mono">IS</div>
                        )}
                    </div>
                    {/* Status Badge */}
                    <div className="absolute bottom-2 right-2 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-full flex items-center gap-2 shadow-lg z-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-xs font-medium text-zinc-300 whitespace-nowrap">{status}</span>
                    </div>
                </div>

                {/* Right: Info */}
                <div className="text-center md:text-left space-y-4 w-full relative z-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{name}</h2>
                        <p className="text-cyan-400 font-medium text-lg mt-1 tracking-wide">{role}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-400">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <MapPin size={16} className="text-zinc-500" />
                            <span>{location}</span>
                        </div>

                        <a href={`mailto:${email}`} className="flex items-center gap-2 justify-center md:justify-start hover:text-white transition-colors group/link">
                            <Mail size={16} className="text-zinc-500 group-hover/link:text-cyan-400 transition-colors" />
                            <span>{email}</span>
                        </a>

                        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center md:justify-start hover:text-white transition-colors group/link">
                            <Github size={16} className="text-zinc-500 group-hover/link:text-white transition-colors" />
                            <span className="font-mono">github.com</span>
                        </a>

                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center md:justify-start hover:text-white transition-colors group/link">
                            <Linkedin size={16} className="text-zinc-500 group-hover/link:text-cyan-400 transition-colors" />
                            <span className="font-mono">linkedin.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
