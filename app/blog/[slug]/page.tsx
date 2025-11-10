import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import ParticleBackground from "@/components/particles"
import { getPostBySlug, getAllPostSlugs } from "@/lib/markdown"
import { notFound } from "next/navigation"

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = await getPostBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />

      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-10" />

      <header className="border-b border-border relative z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
            Your Blog
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#articles" className="text-muted-foreground hover:text-foreground transition-colors">
              Articles
            </Link>
            <Link href="/#categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <article className="py-12 px-4 relative z-20">
        <div className="container mx-auto max-w-4xl">
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <div className="p-8 md:p-12">
              <Badge variant="secondary" className="mb-4">
                {article.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-12 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <div
                className="prose prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6 prose-p:text-muted-foreground prose-p:mb-6 prose-p:leading-relaxed prose-ul:list-disc prose-ul:list-inside prose-ul:mb-6 prose-ul:text-muted-foreground prose-ul:space-y-2 prose-ol:list-decimal prose-ol:list-inside prose-ol:mb-6 prose-ol:text-muted-foreground prose-ol:space-y-2 prose-strong:font-semibold prose-strong:text-foreground prose-code:text-sm prose-code:font-mono prose-pre:bg-card/50 prose-pre:backdrop-blur-sm prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:mb-6 prose-pre:overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </Card>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg"
              >
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <footer className="border-t border-border py-12 px-4 relative z-20 mt-20">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2025 Your Blog. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
