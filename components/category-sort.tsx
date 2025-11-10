"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Post } from "@/lib/markdown"

export type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc"

interface CategorySortProps {
  posts: Post[]
}

// Helper function to extract description from HTML content
function extractDescription(htmlContent: string): string {
  const textContent = htmlContent.replace(/<[^>]*>/g, '')
  const paragraphs = textContent.split('\n').filter(line => line.trim().length > 50)
  if (paragraphs.length > 0) {
    return paragraphs[0].slice(0, 150) + '...'
  }
  return textContent.slice(0, 150) + '...'
}

export function CategorySort({ posts }: CategorySortProps) {
  const [sortBy, setSortBy] = useState<SortOption>("date-desc")

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return (
    <div>
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px] bg-card/50 backdrop-blur-sm border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group h-full">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-4">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                  {extractDescription(post.content)}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
