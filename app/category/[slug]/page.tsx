"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import ParticleBackground from "@/components/particles"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

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
    title: "Color Theory for Web Designers",
    description: "Understanding the psychology and application of color in creating engaging web experiences.",
    category: "Design",
    date: "Mar 6, 2024",
    readTime: "7 min read",
    slug: "color-theory-web-design",
  },
  {
    title: "Growing as a Senior Engineer",
    description: "Key insights and lessons learned on the path from junior to senior software engineer.",
    category: "Career",
    date: "Feb 28, 2024",
    readTime: "9 min read",
    slug: "growing-senior-engineer",
  },
  {
    title: "Building Your Personal Brand",
    description: "Strategies for creating a strong professional presence in the tech industry.",
    category: "Career",
    date: "Feb 22, 2024",
    readTime: "8 min read",
    slug: "building-personal-brand",
  },
  {
    title: "Getting Started with React Hooks",
    description: "A comprehensive tutorial on React Hooks and how to use them effectively in your projects.",
    category: "Tutorials",
    date: "Feb 18, 2024",
    readTime: "15 min read",
    slug: "react-hooks-tutorial",
  },
  {
    title: "Deploying Next.js Apps to Vercel",
    description: "Step-by-step guide to deploying your Next.js application to Vercel with best practices.",
    category: "Tutorials",
    date: "Feb 12, 2024",
    readTime: "10 min read",
    slug: "deploying-nextjs-vercel",
  },
]

const categoryMap: Record<string, string> = {
  development: "Development",
  design: "Design",
  career: "Career",
  tutorials: "Tutorials",
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const category = categoryMap[slug] || slug

  const filteredArticles = articles.filter((article) => article.category === category)

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />

      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-10" />

      <header className="border-b border-border relative z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-xl font-bold">Your Blog</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Search
            </Button>
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 relative z-20">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              CATEGORY
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {category} <span className="italic text-muted-foreground">Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore all articles in the {category} category
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link key={index} href={`/blog/${article.slug}`}>
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

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 relative z-20 mt-20">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2025 Your Blog. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
