"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence  } from "framer-motion";
import { Play } from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoProject } from "@/types/videos";
import { getVideoEmbedUrl, getVideoThumbnailUrl } from "@/lib/helper";

interface ProjectCardProps {
    project: VideoProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Handle click outside to stop playing
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsPlaying(false);
            }
        };

        if (isPlaying) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPlaying]);

    // Process Instagram embeds when playing
    useEffect(() => {
        if (isPlaying && project.is_instagram_reel && typeof window !== 'undefined' && (window as any).instgrm) {
            // Small delay to ensure the iframe is rendered
            setTimeout(() => {
                (window as any).instgrm.Embeds.process();
            }, 100);
        }
    }, [isPlaying, project.is_instagram_reel]);

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        window.open(project.video_link, '_blank');
    };

    const handleStopClick = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        e?.preventDefault();
        setIsPlaying(false);
    };

    return (
        <div ref={cardRef} className="h-full">
            <GlassmorphismCard className="h-full group hover:shadow-2xl hover:shadow-blue-900/10 transition-shadow duration-500 flex flex-col">
                <div className="flex flex-col h-full p-5">
                    {/* Media Area */}
                    <div className="relative overflow-hidden rounded-2xl aspect-video mb-5 shadow-lg bg-black isolate">
                        <AnimatePresence mode="wait">
                            {isPlaying ? (
                                <m.div
                                    key="video-redirect"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={`absolute inset-0 z-20 flex items-center justify-center ${
                                        project.is_instagram_reel 
                                            ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"
                                            : project.is_google_drive
                                                ? "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800"
                                                : "bg-gradient-to-br from-red-600 to-red-800"
                                    }`}
                                >
                                    <div className="text-center text-white p-6">
                                        {project.is_instagram_reel ? (
                                            <>
                                                <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                                <p className="text-lg font-semibold mb-2">Opening Instagram Reel</p>
                                                <p className="text-sm opacity-80">Redirecting to Instagram...</p>
                                            </>
                                        ) : project.is_google_drive ? (
                                            <>
                                                <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                                </svg>
                                                <p className="text-lg font-semibold mb-2">Opening Google Drive</p>
                                                <p className="text-sm opacity-80">Redirecting to Google Drive...</p>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0 2.64-2.05 4.78-4.65 4.99"/>
                                                </svg>
                                                <p className="text-lg font-semibold mb-2">Opening Video</p>
                                                <p className="text-sm opacity-80">Loading...</p>
                                            </>
                                        )}
                                    </div>
                                </m.div>
                            ) : (
                                <div
                                    key="thumbnail"
                                    className="relative w-full h-full cursor-pointer group/thumb"
                                    onClick={handlePlayClick}
                                >
                                    <m.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full h-full"
                                    >
                                        {project.is_instagram_reel ? (
                                            // Custom Instagram reel thumbnail
                                            <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                    </svg>
                                                    <p className="text-sm font-semibold">Instagram Reel</p>
                                                </div>
                                            </div>
                                        ) : project.is_google_drive ? (
                                            // Custom Google Drive thumbnail
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                                    </svg>
                                                    <p className="text-sm font-semibold">Google Drive</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <Image
                                                src={getVideoThumbnailUrl(project)}
                                                alt={project.video_title}
                                                fill
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        )}
                                    </m.div>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/40 transition-colors duration-300 flex items-center justify-center backdrop-blur-[0px] group-hover/thumb:backdrop-blur-[2px]">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-90 group-hover/thumb:scale-110 transition-all duration-300 shadow-xl shadow-black/20">
                                            <Play className="ml-1 fill-white" size={28} />
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    {project.duration && (
                                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                            {project.duration}
                                        </div>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col relative w-full">
                        {/* Category Tags - Absolute positioning on top right or just below title if preferred */}
                        <div className="flex gap-2 mb-3 flex-wrap">
                            {project.category.slice(0, 2).map((cat) => (
                                <Badge key={cat} variant="secondary" className="bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-normal border-none">
                                    {cat}
                                </Badge>
                            ))}
                        </div>

                        <Link href={`/project/${project.id}`} className="block group/title">
                            <h3 className="text-xl font-bold mb-3 text-white group-hover/title:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                {project.video_title}
                            </h3>
                        </Link>

                        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {project.video_description}
                        </p>

                        {/* Actions & Metadata */}
                        <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-white/5 p-1">
                                    <Image
                                        src={project.client_image || "/placeholder.svg"}
                                        alt={project.client_name}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-white line-clamp-1 max-w-[100px] truncate">{project.client_name}</span>
                                    <span className="text-[10px] text-gray-500">{new Date(project.publish_date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href={`/project/${project.id}`}>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 px-5 text-xs font-medium text-white bg-white/5 border border-white/10 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl"
                                    >
                                        Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassmorphismCard>
        </div>
    );
}
