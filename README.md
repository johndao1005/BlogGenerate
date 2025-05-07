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
- [ ] `/app`
    - [ ] `/blog`
        - [ ] `page.tsx`: Blog listing page showing all generated blog posts
        - [ ] `/[slug]`
            - [ ] `/page.tsx`: Dynamic route for individual blog posts
- [ ] `/api`
    - [ ] `/generate-blog/`
        - [ ] `route.ts`: API endpoint that connects to OpenAI
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
- [ ] `/styles`: Directory for CSS and styling files
`public` Directory
- [ ] public assets like images, icons, and fonts

# Technical Design
## Architecture Diagram

┌────────────┐      ┌─────────────────┐      ┌─────────────┐
│  Browser   │←─CDN─│   Next.js SSR   │←─API─│ OpenAI API  │
│ (React UI) │      │ & Static Pages  │      │ (GPT Models)│
└────────────┘      └─────────────────┘      └─────────────┘
        ↓                   ↑
      Vercel Edge       Vercel Edge
      Functions          Functions
      (OpenAI Call)     (Other APIs)

flowchart LR
    Browser["Browser\n(React UI)"]
    NextJS["Next.js SSR\n& Static Pages"]
    OpenAI["OpenAI API\n(GPT Models)"]
    EdgeFn1["Vercel Edge Functions\n(OpenAI Call)"]
    EdgeFn2["Vercel Edge Functions\n(Other APIs)"]
    
    NextJS -->|CDN| Browser
    OpenAI -->|API| NextJS
    Browser -->|Request| EdgeFn1
    EdgeFn2 -->|Response| NextJS


Pages and components use the App Router (Next.js 14+) for hybrid rendering 
DEV Community
.

Tailwind CSS handles styling via tailwind.config.js and JIT mode, keeping CSS bundle minimal 
PixelFreeStudio Blog -
.

## Serverless API Routes

/api/generate edge function on Vercel calls OpenAI’s endpoints using the Vercel AI SDK or native fetch 
Vercel
.

Rate-limits and timeouts are managed via Vercel Function config 
Vercel
.

## AI Blog Generator Workflow

User clicks “Generate Draft” → client sends request to /api/generate.

API route composes a prompt (e.g. topic, tone) and forwards to OpenAI’s GPT-4 via REST API 
Vercel
.

Response (blog text) is returned to the UI, displayed in a rich editor (e.g., Markdown preview).

## Deployment

Code pushed to GitHub triggers Vercel CI/CD → builds and deploys both static assets and Edge Functions.

### Implementation Steps

|                   Step                  | Description & Reference Links                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     **1. Scaffold Next.js Project**     | `bash npx create-next-app@latest portfolio-ai-blog --typescript` ([Medium][1])                                                                                                                                                                                                                                                                                                                     |
| **2. Install & Configure Tailwind CSS** | - Install: `npm install -D tailwindcss postcss autoprefixer`<br>- Init: `npx tailwindcss init -p`<br>- Configure `tailwind.config.js` with JIT and purge paths ([tailwindcss.com][2])                                                                                                                                                                                                              |
|       **3. Build Layout & Pages**       | - Create `app/layout.tsx` with header, footer, and global styles.<br>- Add `app/page.tsx` showcasing your portfolio items.                                                                                                                                                                                                                                                                         |
|  **4. Set Up Vercel & Edge Functions**  | - Connect GitHub repo to Vercel.<br>- In `vercel.json`, define Edge Function for API routes:<br>`json{"functions":{ "api/*.ts":{ "runtime":"edge" }}}` ([Vercel][3])                                                                                                                                                                                                                               |
|   **5. Implement OpenAI Integration**   | - Install SDK: `npm install openai`<br>- Create `pages/api/generate.ts`:<br>``ts import OpenAI from "openai"; const ai=new OpenAI(); export default async (req,res)=>{ const {topic}=await req.json(); const resp=await ai.chat.completions.create({ model:"gpt-4", messages:[{role:"user", content:\`Write a blog post about ${topic}\`}]}); res.json(resp.choices[0].message); }`` ([Medium][4]) |
|         **6. Build AI Blog UI**         | - In `app/page.tsx`, add a form for topic input and a button to call `/api/generate`.<br>- Display result in a `<textarea>` or Markdown preview component.                                                                                                                                                                                                                                         |
|        **7. Style with Tailwind**       | - Use utility classes (`prose`, `bg-white`, `rounded-lg`, `p-6`) for the editor and buttons. ([Wikipedia][5])                                                                                                                                                                                                                                                                                      |
|          **8. Optimize & Test**         | - Test Edge Function latency in Vercel dashboard.<br>- Add loading states and error handling.                                                                                                                                                                                                                                                                                                      |
|         **9. SEO & Performance**        | - Use `next-seo` for meta tags.<br>- Leverage Next.js’s `<Image>` component and static asset caching.                                                                                                                                                                                                                                                                                              |
|         **10. Deploy & Monitor**        | - Push to main branch → Vercel auto-deploys.<br>- Monitor logs in Vercel for function errors.                                                                                                                                                                                                                                                                                                      |

[1]: https://sviat-kuzhelev.medium.com/mastering-nextjs-architecture-with-typescript-in-mind-design-abstractions-2024-a6f9612300d1?utm_source=chatgpt.com "Mastering NextJS Architecture with TypeScript in Mind"
[2]: https://tailwindcss.com/?utm_source=chatgpt.com "Tailwind CSS - Rapidly build modern websites without ever leaving ..."
[3]: https://vercel.com/docs/functions?utm_source=chatgpt.com "Vercel Functions"
[4]: https://medium.com/%40amitjha167/integrating-openai-gpt-api-with-next-js-app-router-and-tailwind-css-in-typescript-a-guide-586e2c6b40f0?utm_source=chatgpt.com "Integrating OpenAI GPT API with Next.js (App Router) and Tailwind ..."
[5]: https://en.wikipedia.org/wiki/Tailwind_CSS?utm_source=chatgpt.com "Tailwind CSS"


## References
Next.js hybrid SSR & App Router 
Medium

Vercel & OpenAI integration guide 
Vercel

Integrating GPT API in Next.js + Tailwind 
Medium

Vercel Edge Functions overview 
Vercel

Building GPT-3 apps with Edge Functions 
Vercel

Tailwind CSS utility-first framework 
tailwindcss.com
Wikipedia

Tailwind JIT mode setup 
PixelFreeStudio Blog -

OpenAI SDK usage in Node.js 
Medium

Vercel deployment configuration 
Vercel

Next.js SEO best practices (internal knowledge)

This plan equips you to build a performant, AI-enhanced portfolio that showcases both your front-end expertise and ability to integrate cutting-edge AI services.