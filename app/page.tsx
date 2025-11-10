"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Code, Lightbulb, TrendingUp, Calendar, Clock } from "lucide-react"
import ParticleBackground from "@/components/particles"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PersonalBlog() {
  const router = useRouter()

  const handleCategoryClick = (category: string) => {
    router.push(`/category/${category.toLowerCase()}`)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />

      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-10" />

      <header className="border-b border-border relative z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">Your Blog</div>
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("articles")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Articles
            </button>
            <button
              onClick={() => scrollToSection("categories")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </nav>
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
        <div className="container mx-auto text-center max-w-4xl relative">
          <Badge variant="secondary" className="mb-6">
            WELCOME TO MY BLOG
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Thoughts on Tech,
            <br />
            Design & <span className="italic text-muted-foreground">Innovation.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sharing insights, tutorials, and stories from my journey in software development and creative
            problem-solving.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg"
            onClick={() => scrollToSection("articles")}
          >
            Explore Articles
          </Button>
        </div>
      </section>

      <section id="articles" className="py-20 px-4 relative z-20 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              FEATURED POSTS
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Recent <span className="italic text-muted-foreground">Articles</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/blog/building-scalable-web-applications">
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-4">
                    Development
                  </Badge>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    Building Scalable Web Applications with Next.js
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Exploring best practices and patterns for building production-ready applications with the latest
                    Next.js features.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Mar 15, 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>8 min read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer group">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-4">
                  Design
                </Badge>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  The Art of Minimalist UI Design
                </h3>
                <p className="text-muted-foreground mb-4">
                  How less can be more when creating intuitive and beautiful user interfaces that users love.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Mar 10, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>6 min read</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-4">
                  AI & Innovation
                </Badge>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  AI in Modern Development Workflows
                </h3>
                <p className="text-muted-foreground mb-4">
                  Examining how AI tools are transforming the way we write code and solve complex problems.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Mar 5, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>10 min read</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="categories" className="py-20 px-4 relative z-20 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              EXPLORE
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Topics I <span className="italic text-muted-foreground">Write About</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              onClick={() => handleCategoryClick("Development")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Development</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Web technologies, frameworks, and coding best practices
                </p>
                <Badge variant="secondary">24 articles</Badge>
              </CardContent>
            </Card>

            <Card
              className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer"
              onClick={() => handleCategoryClick("Design")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Design</h3>
                <p className="text-muted-foreground text-sm mb-3">UI/UX principles and creative design patterns</p>
                <Badge variant="secondary">18 articles</Badge>
              </CardContent>
            </Card>

            <Card
              className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              onClick={() => handleCategoryClick("Career")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career</h3>
                <p className="text-muted-foreground text-sm mb-3">Professional growth and industry insights</p>
                <Badge variant="secondary">12 articles</Badge>
              </CardContent>
            </Card>

            <Card
              className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer"
              onClick={() => handleCategoryClick("Tutorials")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tutorials</h3>
                <p className="text-muted-foreground text-sm mb-3">Step-by-step guides and learning resources</p>
                <Badge variant="secondary">16 articles</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 relative z-20 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-4">
                    ABOUT ME
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    Hi, I'm <span className="italic text-primary">Your Name</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    A passionate software developer and designer focused on building beautiful, functional web
                    experiences. I love sharing knowledge and helping others grow in their tech journey.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    When I'm not coding, you'll find me exploring new technologies, contributing to open source, or
                    writing about my latest discoveries.
                  </p>
                  <Button variant="outline">
                    Learn More About Me
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 border-t border-border relative z-20 scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="container mx-auto text-center max-w-2xl relative">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8">
            Get notified when I publish new articles. Join my newsletter for weekly insights and tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 relative z-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">Your Blog</div>
              <p className="text-muted-foreground text-sm">Sharing thoughts on technology, design, and innovation.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Content</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    All Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Uses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    RSS Feed
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Your Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
