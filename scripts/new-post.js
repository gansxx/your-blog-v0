#!/usr/bin/env node

/**
 * Script to create a new blog post with frontmatter template
 *
 * Usage: node scripts/new-post.js "My Post Title" "Development"
 */

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)

if (args.length < 2) {
  console.log('Usage: node scripts/new-post.js "Post Title" "Category"')
  console.log('Example: node scripts/new-post.js "Getting Started with React" "Development"')
  process.exit(1)
}

const title = args[0]
const category = args[1]

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

// Get current date
const date = new Date().toISOString().split('T')[0]

// Create frontmatter template
const template = `---
title: "${title}"
date: "${date}"
readTime: "5 min read"
category: "${category}"
---

# ${title}

Write your introduction here...

## Section 1

Your content here...

## Section 2

More content...

## Conclusion

Wrap up your post...
`

const postsDir = path.join(process.cwd(), 'content', 'posts')
const filePath = path.join(postsDir, `${slug}.md`)

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`Error: File already exists: ${slug}.md`)
  process.exit(1)
}

// Create the file
fs.writeFileSync(filePath, template, 'utf8')

console.log('✅ Blog post created successfully!')
console.log(`📝 File: content/posts/${slug}.md`)
console.log(`🔗 URL: /blog/${slug}`)
console.log('\nNext steps:')
console.log('1. Edit the markdown file')
console.log('2. Run `pnpm build` to generate the static page')
console.log('3. Run `pnpm dev` to preview locally')
