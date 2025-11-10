"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface Article {
  title: string
  description: string
  category: string
  date: string
  readTime: string
  slug: string
}

const articles: Article[] = [
  {
    title: "Building Scalable Web Applications with Next.js",
    description:
      "Exploring best practices and patterns for building production-ready applications with the latest Next.js features.",
    category: "Development",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    slug: "building-scalable-web-applications",
  },
  {
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they change the way we build modern web applications.",
    category: "Development",
    date: "Mar 12, 2024",
    readTime: "12 min read",
    slug: "understanding-react-server-components",
  },
  {
    title: "TypeScript Best Practices for Large Applications",
    description:
      "Learn how to leverage TypeScript's powerful type system to build maintainable and scalable codebases.",
    category: "Development",
    date: "Mar 8, 2024",
    readTime: "10 min read",
    slug: "typescript-best-practices",
  },
  {
    title: "The Art of Minimalist UI Design",
    description: "How less can be more when creating intuitive and beautiful user interfaces that users love.",
    category: "Design",
    date: "Mar 10, 2024",
    readTime: "6 min read",
    slug: "minimalist-ui-design",
  },
  {
    title: "AI in Modern Development Workflows",
    description: "Examining how AI tools are transforming the way we write code and solve complex problems.",
    category: "AI & Innovation",
    date: "Mar 5, 2024",
    readTime: "10 min read",
    slug: "ai-development-workflows",
  },
]

interface ArticlesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: string
}

export default function ArticlesDialog({ open, onOpenChange, category }: ArticlesDialogProps) {
  const filteredArticles = articles.filter((article) => article.category === category)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {category} <span className="italic text-muted-foreground">Articles</span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {filteredArticles.map((article, index) => (
            <Link key={index} href={`/blog/${article.slug}`} onClick={() => onOpenChange(false)}>
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group h-full">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-4">
                    {article.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{article.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
