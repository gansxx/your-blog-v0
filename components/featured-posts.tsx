import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { getAllPosts } from "@/lib/markdown"

export default async function FeaturedPosts() {
  const posts = await getAllPosts()
  const featuredPosts = posts.slice(0, 3) // Get the 3 most recent posts

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredPosts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group">
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {/* Extract first paragraph from content as description */}
                {post.content
                  .replace(/<[^>]*>/g, '')
                  .split('\n')
                  .find(line => line.trim().length > 50)
                  ?.slice(0, 150) + '...'}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
  )
}
