"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import type { VideoProject } from "@/types/videos";
import { getVideoProjectsByCategory } from "@/lib/helper";

interface ProjectGridProps {
  initialCategories: { category: string; count: number }[];
  initialProjects: VideoProject[];
}

export default function ProjectGrid({ initialCategories, initialProjects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedProjects, setDisplayedProjects] = useState<VideoProject[]>(initialProjects.slice(0, 6));
  const [allProjects, setAllProjects] = useState<VideoProject[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProjects.length > 6);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const ITEMS_PER_PAGE = 6;

  // Load projects for selected category
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      let projects;
      if (selectedCategory === "All") {
        projects = initialProjects;
      } else {
        projects = getVideoProjectsByCategory(selectedCategory);
      }

      setAllProjects(projects);
      setDisplayedProjects(projects.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
      setHasMore(projects.length > ITEMS_PER_PAGE);
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, initialProjects]);

  // Load more projects with smooth animation
  const loadMoreProjects = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate slight delay for smooth animation
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newProjects = allProjects.slice(startIndex, endIndex);

      setDisplayedProjects((prev) => [...prev, ...newProjects]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < allProjects.length);
      setLoading(false);
    }, 400);
  }, [currentPage, allProjects, loading, hasMore]);

  const projectsLoaded = (currentPage - 1) * ITEMS_PER_PAGE + displayedProjects.filter((p, i) => i < ITEMS_PER_PAGE).length;
  const totalAvailable = allProjects.length;

  return (
    <>
      {/* Category Filter */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {initialCategories.map(({ category, count }) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
            relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
            ${
              selectedCategory === category
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20 hover:scale-105"
            }
            `}
          >
            {category}
            <span
              className={`
            ml-2 text-[10px] px-1.5 py-0.5 rounded-full transition-colors
            ${selectedCategory === category ? "bg-black text-white" : "bg-white/10 text-gray-400"}
            `}
            >
              {count}
            </span>
          </button>
        ))}
      </m.div>

      {/* Projects Grid */}
      <m.div
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <m.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: isTransitioning ? 0 : index * 0.05,
              }}
            >
              <ProjectCard project={project} />
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>

      {/* Empty State for filtered categories */}
      {displayedProjects.length === 0 && !isTransitioning && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <p className="text-gray-400 text-lg">No projects in this category yet.</p>
        </m.div>
      )}

      {/* Load More Section */}
      <AnimatePresence>
        {hasMore && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6 mt-20"
          >
            {/* Stats */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="text-gray-400 text-sm">
                Showing{" "}
                <span className="text-white font-semibold">{displayedProjects.length}</span> of{" "}
                <span className="text-white font-semibold">{totalAvailable}</span> projects
              </p>
            </m.div>

            {/* Load More Button */}
            <button
              onClick={loadMoreProjects}
              disabled={loading}
              className={`
              px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${
                loading
                  ? "bg-white/5 text-gray-400 cursor-not-allowed"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20 hover:scale-105"
              }
              `}
            >
              {loading ? "Loading..." : "Load More Projects"}
            </button>
          </m.div>
        )}
      </AnimatePresence>

      {/* No More Projects Message */}
      {!hasMore && displayedProjects.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center py-20"
        >
          <m.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Sparkles className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
          </m.div>
          <p className="text-gray-400 text-lg">
            You've seen all <span className="text-white font-semibold">{totalAvailable}</span> projects! 🎉
          </p>
        </m.div>
      )}
    </>
  );
}
