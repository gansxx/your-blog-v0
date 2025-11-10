import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import ParticleBackground from "@/components/particles"
import type { JSX } from "react"

const articles: Record<
  string,
  {
    title: string
    date: string
    readTime: string
    category: string
    content: string
  }
> = {
  "building-scalable-web-applications": {
    title: "Building Scalable Web Applications with Next.js",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    category: "Development",
    content: `
# Building Scalable Web Applications with Next.js

Next.js has become the go-to framework for building modern web applications. In this comprehensive guide, we'll explore the key patterns and best practices that will help you build production-ready, scalable applications.

## Why Next.js?

Next.js combines the best of server-side rendering, static site generation, and client-side rendering into one powerful framework. With features like:

- **Automatic code splitting** for optimal performance
- **Built-in optimization** for images, fonts, and third-party scripts
- **API routes** for backend functionality
- **File-based routing** for intuitive navigation

## Key Architecture Patterns

### 1. Server Components First

With Next.js 13+ and the App Router, server components are now the default. This paradigm shift allows us to:

- Fetch data directly in components
- Reduce client-side JavaScript bundle size
- Improve initial page load performance

\`\`\`tsx
// app/posts/page.tsx
async function Posts() {
  const posts = await fetch('https://api.example.com/posts')
  return <PostList posts={posts} />
}
\`\`\`

### 2. Smart Data Fetching

Leverage Next.js caching strategies for optimal performance:

- **Static Generation** for content that doesn't change often
- **Incremental Static Regeneration** for periodically updated content
- **Dynamic Rendering** for personalized content

### 3. Modular Component Architecture

Break down your application into small, reusable components. This makes your codebase:

- Easier to test
- Simpler to maintain
- More scalable as your team grows

## Performance Optimization

Performance is crucial for user experience and SEO. Here are essential optimizations:

### Image Optimization

Always use Next.js Image component for automatic optimization:

\`\`\`tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero image"
  priority
/>
\`\`\`

### Code Splitting

Next.js automatically splits your code by route, but you can also use dynamic imports for heavy components:

\`\`\`tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
\`\`\`

## State Management

For scalable applications, choose the right state management solution:

- **Server State**: Use React Query or SWR
- **Client State**: Context API for simple cases, Zustand or Redux for complex apps
- **URL State**: Use searchParams for shareable state

## Testing Strategy

A solid testing strategy ensures your application remains reliable:

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test how components work together
3. **E2E Tests**: Use Playwright to test critical user flows

## Deployment Best Practices

When deploying your Next.js application:

- Use environment variables for configuration
- Implement proper error boundaries
- Set up monitoring and analytics
- Use a CDN for static assets
- Enable compression and caching headers

## Conclusion

Building scalable web applications with Next.js requires thoughtful architecture, performance optimization, and solid development practices. By following these patterns, you'll create applications that can grow with your needs while maintaining excellent performance and developer experience.

Remember: start simple, measure performance, and optimize based on real data. Happy coding!
    `,
  },
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = articles[slug]

  if (!article) {
    return <div>Article not found</div>
  }

  // Simple markdown-to-HTML converter for demonstration
  const renderMarkdown = (md: string) => {
    const lines = md.trim().split("\n")
    const elements: JSX.Element[] = []
    let currentList: string[] = []
    let codeBlock: string[] = []
    let inCodeBlock = false
    let codeLanguage = ""

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={elements.length} className="list-disc list-inside mb-6 text-muted-foreground space-y-2">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>,
        )
        currentList = []
      }
    }

    const flushCodeBlock = () => {
      if (codeBlock.length > 0) {
        elements.push(
          <pre
            key={elements.length}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 mb-6 overflow-x-auto"
          >
            <code className="text-sm text-foreground font-mono">{codeBlock.join("\n")}</code>
          </pre>,
        )
        codeBlock = []
        inCodeBlock = false
        codeLanguage = ""
      }
    }

    lines.forEach((line, idx) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          flushCodeBlock()
        } else {
          flushList()
          inCodeBlock = true
          codeLanguage = line.slice(3)
        }
        return
      }

      if (inCodeBlock) {
        codeBlock.push(line)
        return
      }

      // Headers
      if (line.startsWith("# ")) {
        flushList()
        elements.push(
          <h1 key={idx} className="text-4xl font-bold mb-6 mt-8">
            {line.slice(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        flushList()
        elements.push(
          <h2 key={idx} className="text-3xl font-bold mb-4 mt-8">
            {line.slice(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        flushList()
        elements.push(
          <h3 key={idx} className="text-2xl font-semibold mb-4 mt-6">
            {line.slice(4)}
          </h3>,
        )
      }
      // Lists
      else if (line.startsWith("- ")) {
        const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        currentList.push(content)
      }
      // Paragraphs
      else if (line.trim() === "") {
        flushList()
      } else if (!line.startsWith("#") && line.trim() !== "") {
        flushList()
        const content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        elements.push(
          <p
            key={idx}
            className="text-muted-foreground mb-6 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />,
        )
      }
    })

    flushList()
    flushCodeBlock()

    return elements
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

              <div className="prose prose-invert max-w-none">{renderMarkdown(article.content)}</div>
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
