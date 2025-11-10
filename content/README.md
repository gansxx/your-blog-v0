# Blog Content Management

This directory contains all blog posts in Markdown format.

## Adding a New Blog Post

1. Create a new `.md` file in `content/posts/` directory
2. Use the slug as the filename (e.g., `my-awesome-post.md`)
3. Add frontmatter metadata at the top:

```markdown
---
title: "Your Post Title"
date: "2024-03-15"
readTime: "8 min read"
category: "Development"
---

# Your Post Title

Your content here...
```

## Frontmatter Fields

- **title**: The post title (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **readTime**: Estimated reading time (required)
- **category**: Post category (required)

## Markdown Support

The following Markdown features are supported:

### Headings
```markdown
# H1
## H2
### H3
```

### Lists
```markdown
- Unordered item
- Another item

1. Ordered item
2. Another item
```

### Code Blocks
````markdown
```typescript
const greeting = "Hello World"
```
````

### Text Formatting
```markdown
**Bold text**
*Italic text*
`inline code`
```

### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

## File Structure

```
content/
└── posts/
    ├── building-scalable-web-applications.md
    ├── minimalist-ui-design.md
    └── ai-modern-development.md
```

## How It Works

1. Markdown files are stored in `content/posts/`
2. At build time, Next.js:
   - Reads all `.md` files
   - Parses frontmatter with `gray-matter`
   - Converts markdown to HTML with `remark`
   - Generates static pages for each post
3. Posts are automatically listed on the homepage

## Static Generation

All blog posts are statically generated at build time for optimal performance:

```bash
pnpm build  # Generates static HTML for all posts
```

## Adding Posts in Production

After adding a new markdown file:

1. Commit the new `.md` file to git
2. Push to your repository
3. Vercel will automatically rebuild and deploy

No code changes needed - just add markdown files!
