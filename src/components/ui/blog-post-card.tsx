"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";


export interface ArticleCardProps {
  headline: string;
  excerpt: string;
  cover?: string;
  tag?: string;
  readingTime?: number; // in seconds
  writer?: string;
  publishedAt?: Date;
  clampLines?: number;
}

// Human-friendly read time: seconds -> "X min read"
export function formatReadTime(seconds: number): string {
  if (!seconds || seconds < 60) return "Less than 1 min read";
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min read`;
}

// Date -> "Aug 15, 2025" (localized but concise)
export function formatPostDate(date: Date): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  cover,
  tag,
  readingTime,
  headline,
  excerpt,
  writer,
  publishedAt,
  clampLines,
}) => {
  const hasMeta = tag || readingTime;
  const hasFooter = writer || publishedAt;

  return (
    <Card className="group flex h-full w-full flex-col bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#F23030]/20 hover:bg-zinc-900/60 hover:shadow-[0_20px_50px_-20px_rgba(242,48,48,0.15)]">
      {cover && (
        <CardHeader className="p-0 relative aspect-[16/10] overflow-hidden">
          <img
            src={cover}
            alt={headline}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {tag && (
            <div className="absolute top-6 left-6">
              <Badge className="bg-[#F23030] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border-0 backdrop-blur-md">
                {tag}
              </Badge>
            </div>
          )}
        </CardHeader>
      )}

      <CardContent className="flex-grow p-8 flex flex-col">
        <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
          {publishedAt && <span>{formatPostDate(publishedAt)}</span>}
          {publishedAt && readingTime && <span className="w-1 h-1 rounded-full bg-zinc-700" />}
          {readingTime && <span>{formatReadTime(readingTime)}</span>}
        </div>

        <h2 className="font-['Inter'] text-2xl font-bold leading-tight text-white mb-4 group-hover:text-[#F23030] transition-colors line-clamp-2">
          {headline}
        </h2>

        <p
          className={cn("text-zinc-400 leading-relaxed text-sm mb-8", {
            "overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]":
              clampLines && clampLines > 0,
          })}
          style={{
            WebkitLineClamp: clampLines,
          }}
        >
          {excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#F23030] group/link">
          <span>Read Full Analysis</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
};
