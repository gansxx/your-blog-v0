# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 blog application built with v0.app, featuring a modern, animated design with particle backgrounds and glassmorphism effects. The project uses the App Router architecture and is deployed on Vercel.

**Important**: This repository is automatically synced with v0.app deployments. Changes made to deployed chats on v0.app are automatically pushed here.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint the codebase
pnpm lint
```

## Architecture

### Routing Structure

**App Router (Next.js 14)** with file-based routing:
- `/` - Homepage with hero, featured articles, categories, about, and contact sections
- `/blog/[slug]` - Individual blog post pages with markdown rendering
- `/category/[slug]` - Category listing pages

### Component Organization

**UI Components** (`components/ui/`): Shadcn/ui components following the "New York" style
- All UI components are generated via Shadcn/ui CLI
- Uses Radix UI primitives with custom Tailwind styling
- Components use `cn()` utility for class merging (from `lib/utils.ts`)

**Custom Components** (`components/`):
- `particles.tsx` - Animated particle background effect
- `articles-dialog.tsx` - Article management dialog
- `theme-provider.tsx` - Theme context provider

### Styling System

**Tailwind CSS v4** with:
- CSS variables for theming (defined in `app/globals.css`)
- `tw-animate-css` for animations
- `tailwindcss-animate` plugin
- Custom gradient backgrounds and glassmorphism effects

**Import alias**: `@/` points to the root directory (configured in `tsconfig.json` and `components.json`)

### Content Management

**Markdown-based blog system**:
- Blog posts are stored as `.md` files in `content/posts/` directory
- Each markdown file includes frontmatter metadata (title, date, readTime, category)
- Markdown processing pipeline: `gray-matter` → `remark` → `remark-gfm` → `remark-html`
- Static generation at build time using `generateStaticParams()`
- Utilities in `lib/markdown.ts` handle reading, parsing, and converting markdown to HTML

### Key Dependencies

- **UI**: Radix UI components, Lucide icons, Shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Markdown**: gray-matter, remark, remark-gfm, remark-html, rehype
- **Animations**: Tailwind animate, custom particles
- **Analytics**: Vercel Analytics
- **Fonts**: Geist Sans and Geist Mono

## Architectural Patterns

### Server Components First
All pages use React Server Components by default. Client components are marked with `"use client"` directive (e.g., homepage for interactive navigation).

### Styling Convention
- Components use `backdrop-blur-sm` and `bg-card/50` for glassmorphism
- Gradient overlays with `from-primary/5` patterns for depth
- Border styling with `border-border` for consistency
- Hover states with `hover:shadow-lg hover:shadow-primary/10` for interactive elements

### Path Aliasing
All imports use `@/` prefix:
```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### Component Variants
UI components use `class-variance-authority` (CVA) for variant management, following Shadcn/ui patterns.

## Adding New Components

Use the Shadcn/ui CLI (configured in `components.json`):
```bash
npx shadcn@latest add [component-name]
```

Components will be added to `components/ui/` with proper styling and TypeScript types.

## Adding Blog Posts

**Create a new markdown file in `content/posts/`:**

1. Use the slug as filename: `your-post-slug.md`
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "2024-03-15"
readTime: "8 min read"
category: "Development"
---

# Your Post Title

Your markdown content here...
```

3. Write content using standard markdown syntax
4. Run `pnpm build` to generate static pages
5. Posts automatically appear on homepage (3 most recent)

**Supported markdown features**: headings (h1-h3), paragraphs, lists (ordered/unordered), code blocks with syntax highlighting, bold/italic text, links, images.

**No code changes required** - just add `.md` files and rebuild!
