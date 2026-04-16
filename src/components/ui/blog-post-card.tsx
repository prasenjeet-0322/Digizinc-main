"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";


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
    <Card className="flex h-full w-full max-w-sm flex-col gap-3 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md p-3 shadow-lg transition-all duration-300 hover:border-[#F23030]/30 hover:shadow-[#F23030]/5">
      {cover && (
        <CardHeader className="p-0">
          <div className="relative h-56 w-full overflow-hidden rounded-2xl">
            <img
              src={cover}
              alt={headline}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </CardHeader>
      )}

      <CardContent className="flex-grow p-3">
        {hasMeta && (
          <div className="mb-4 flex items-center text-sm text-zinc-500">
            {tag && (
            <Badge className="rounded-full border-none bg-zinc-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:bg-[#F23030] hover:text-white transition-colors duration-200">
              {tag}
            </Badge>

            )}
            {tag && readingTime && <span className="mx-2 opacity-30">•</span>}
            {readingTime && <span className="text-xs font-medium uppercase tracking-wide">{formatReadTime(readingTime)}</span>}
          </div>
        )}

        <h2 className="mb-3 text-2xl font-bold leading-tight text-white group-hover:text-[#F23030] transition-colors">
          {headline}
        </h2>

        <p
          className={cn("text-zinc-400 leading-relaxed text-sm", {
            "overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]":
              clampLines && clampLines > 0,
          })}
          style={{
            WebkitLineClamp: clampLines,
          }}
        >
          {excerpt}
        </p>
      </CardContent>

      {hasFooter && (
        <CardFooter className="flex items-center justify-between p-3 pt-0 border-t border-white/5 mt-2">
          {writer && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">By</p>
              <p className="text-xs font-bold text-zinc-300">{writer}</p>
            </div>
          )}
          {publishedAt && (
            <div className={writer ? "text-right" : ""}>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-0.5">Published</p>
              <p className="text-xs font-bold text-zinc-300">
                {formatPostDate(publishedAt)}
              </p>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
