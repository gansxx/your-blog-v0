import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMetadata {
  title: string
  date: string
  readTime: string
  category: string
}

export interface Post extends PostMetadata {
  slug: string
  content: string
}

/**
 * Get all post slugs from the content directory
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

/**
 * Get post data by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content)

    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      readTime: data.readTime || '',
      category: data.category || '',
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Get all posts with metadata
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  )

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      // Sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(
    post => post.category.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get all unique categories from posts
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const categories = new Set<string>()

  allPosts.forEach(post => {
    if (post.category) {
      categories.add(post.category)
    }
  })

  return Array.from(categories)
}

/**
 * Convert category name to URL-friendly slug
 */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Get all category slugs for static generation
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getAllCategories()
  return categories.map(category => categoryToSlug(category))
}
