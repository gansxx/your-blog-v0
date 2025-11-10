import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import ParticleBackground from "@/components/particles"
import Link from "next/link"
import { getPostsByCategory, getAllCategorySlugs, getAllCategories, categoryToSlug } from "@/lib/markdown"
import { notFound } from "next/navigation"
import { CategorySort } from "@/components/category-sort"

// Generate static paths for all category pages
export async function generateStaticParams() {
  const categorySlugs = await getAllCategorySlugs()
  return categorySlugs.map((slug) => ({
    slug,
  }))
}

// Helper function to find category name from slug
async function getCategoryNameFromSlug(slug: string): Promise<string | null> {
  const allCategories = await getAllCategories()

  // Find the category that matches the slug
  const category = allCategories.find(
    cat => categoryToSlug(cat) === slug.toLowerCase()
  )

  return category || null
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Get the actual category name from the slug
  const categoryName = await getCategoryNameFromSlug(slug)

  if (!categoryName) {
    notFound()
  }

  // Get all posts for this category
  const posts = await getPostsByCategory(categoryName)

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />

      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-10" />

      <header className="border-b border-border relative z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
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
              {categoryName} <span className="italic text-muted-foreground">Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore all articles in the {categoryName} category
            </p>
          </div>

          <CategorySort posts={posts} />

          {posts.length === 0 && (
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
