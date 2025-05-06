This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure Breakdown

Root Directory

- [ ] `package.json` : Dependencies and scripts configuration
- [ ] `.env`: Environment variables (store OpenAI API key here)
- [ ] `next.config.js`: Next.js configuration
- [ ] `postcss.config.js`: PostCSS configuration for Tailwind
- [ ] `tailwind.config.js`: Tailwind CSS configuration
- [ ] `tsconfig.json`: TypeScript configuration
`/app` Directory (Next.js App Router)
- [ ] `layout.tsx`: Root layout component with shared UI across all pages
- [ ] `page.tsx`: Home page component displaying featured blog posts
- [ ] `globals.css`: Global styles including Tailwind imports
- [ ] `/app/blog`
    - [ ] `page.tsx`: Blog listing page showing all generated blog posts
    - [ ] `/[slug]/page.tsx`: Dynamic route for individual blog posts
- [ ] `/app/api`
- [ ] `/generate-blog/route.ts: API endpoint that connects to OpenAI
`/components` Directory
- [ ] `Header.tsx`: Navigation header component
- [ ] `Footer.tsx`: Footer component with links and copyright
- [ ] `BlogGenerator.tsx`: UI for generating blog posts with topic and tone controls
- [ ] `BlogCard.tsx`: Card component for displaying blog post previews
- [ ] `BlogContent.tsx`: Component for rendering blog post content
`/lib` Directory
- [ ] `api.ts`: Utility functions for API calls to OpenAI
- [ ] `types.ts`: TypeScript type definitions
- [ ] `utils.ts`: Helper functions for formatting, validation, etc.
`public` Directory
- public assets like images, icons, and fonts