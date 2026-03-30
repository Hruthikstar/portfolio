"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import GlassmorphismCard from "@/components/glassmorphism-card";
import {
    ArrowLeft,
    Play,
    ExternalLink,
} from "lucide-react";
import type { VideoProject } from "@/types/videos";

interface ProjectDetailsProps {
    project: VideoProject;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Button
                        asChild
                        variant="outline"
                        className="pl-4 pr-6 py-2 h-auto text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl group"
                    >
                        <Link href="/">
                            <ArrowLeft className="mr-2" size={16} />
                            Back
                        </Link>
                    </Button>
                </m.div>

                {/* Title Section */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                        {project.video_title}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {project.video_description}
                    </p>
                </m.div>

                {/* Video Player Section */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <GlassmorphismCard className="p-1">
                        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-900">
                            {project.is_instagram_reel ? (
                                <div className="relative w-full h-full">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                                        <div className="text-center">
                                            <svg className="w-20 h-20 mx-auto mb-6 opacity-90 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                            <h3 className="text-2xl font-bold mb-4 text-white">Instagram Reel</h3>
                                            <p className="text-lg mb-6 opacity-90 text-white">{project.video_title}</p>
                                            <Button
                                                asChild
                                                size="lg"
                                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/30"
                                            >
                                                <a
                                                    href={project.video_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    <Play size={20} fill="white" />
                                                    Watch on Instagram
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : project.is_google_drive ? (
                                <div className="relative w-full h-full">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 flex items-center justify-center">
                                        <div className="text-center">
                                            <svg className="w-20 h-20 mx-auto mb-6 opacity-90 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                            </svg>
                                            <h3 className="text-2xl font-bold mb-4 text-white">Google Drive Video</h3>
                                            <p className="text-lg mb-6 opacity-90 text-white">{project.video_title}</p>
                                            <Button
                                                asChild
                                                size="lg"
                                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/30"
                                            >
                                                <a
                                                    href={project.video_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    <ExternalLink size={20} />
                                                    Open on GDrive
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={
                                            project.cover_image
                                                ? `https://img.youtube.com/vi/${project.cover_image}/maxresdefault.jpg`
                                                : "/placeholder.svg"
                                        }
                                        alt={project.video_title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-red-600 hover:bg-red-700 cursor-pointer"
                                        >
                                            <a
                                                href={project.video_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center"
                                            >
                                                <Play className="mr-2" size={24} />
                                                Watch on YouTube
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </GlassmorphismCard>
                </m.div>

                {/* Project Metadata */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12"
                >
                    <GlassmorphismCard className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Category */}
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">
                                    Category
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.category.map((category) => (
                                        <Badge
                                            key={category}
                                            variant="outline"
                                            className="border-gray-600 text-gray-300 bg-white/5"
                                        >
                                            {category}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Software */}
                            {project.software_used && (
                                <div>
                                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">
                                        Tools
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.software_used.map((software) => (
                                            <Badge
                                                key={software}
                                                variant="outline"
                                                className="border-gray-600 text-gray-300 bg-white/5"
                                            >
                                                {software}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Info */}
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">
                                    Details
                                </p>
                                <div className="space-y-1 text-sm text-gray-400">
                                    <p>
                                        {new Date(project.publish_date).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}
                                    </p>
                                    <p>{project.client_name}</p>
                                </div>
                            </div>
                        </div>
                    </GlassmorphismCard>
                </m.div>

                {/* Project Gallery */}
                {project.project_images && project.project_images.length > 0 && (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-12"
                    >
                        <GlassmorphismCard className="p-8">
                            <h2 className="text-2xl font-bold text-white mb-8">
                                Gallery
                            </h2>
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {project.project_images.map((image, index) => (
                                        <CarouselItem key={index} className="basis-1/2">
                                            <div className="p-1">
                                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                                    <Image
                                                        src={image || "/placeholder.svg"}
                                                        alt={`Project image ${index + 1}`}
                                                        fill
                                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="cursor-pointer" />
                                <CarouselNext className="cursor-pointer" />
                            </Carousel>
                        </GlassmorphismCard>
                    </m.div>
                )}

                {/* Client Feedback */}
                {project.client_feedback && (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <GlassmorphismCard className="p-8">
                            <div className="max-w-3xl mx-auto">
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-4">
                                    Feedback
                                </p>
                                <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">
                                    "{project.client_feedback}"
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={project.client_image || "/placeholder.svg"}
                                        alt={project.client_name}
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <p className="font-medium text-white">
                                        {project.client_name}
                                    </p>
                                </div>
                            </div>
                        </GlassmorphismCard>
                    </m.div>
                )}
            </div>
        </div>
    );
}
