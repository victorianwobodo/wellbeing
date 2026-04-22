# Cloudflare Workers React Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/victorianwobodo/wellbeing)

A production-ready full-stack template for building modern web applications using **Cloudflare Workers**, **Durable Objects**, **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. This template provides a scalable backend with stateful entities (e.g., Users, Chats) and a beautiful, responsive frontend.

## ✨ Features

- **Serverless Backend**: Hono-based API with Durable Objects for multi-tenant state management (one DO per entity).
- **Indexed Entities**: Built-in CRUD operations, pagination, seeding, and indexing for efficient listing.
- **Modern Frontend**: React 18, React Router, Tanstack Query for data fetching/caching, shadcn/ui components.
- **Styling**: Tailwind CSS with custom design tokens, dark mode, animations, and glassmorphism effects.
- **Developer Experience**: Hot reload, TypeScript end-to-end, Bun scripts, error reporting, theme toggle.
- **Production-Ready**: CORS, logging, error boundaries, client error reporting, SPA routing.
- **Demo Entities**: Users and ChatBoards with messages – extend in `worker/entities.ts`.
- **Deployment**: One-command deploy to Cloudflare Workers with SQLite-backed Durable Objects.

## 🛠️ Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects (SQLite), TypeScript
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Lucide icons
- **Data/State**: Tanstack Query, Zustand, Immer, React Hook Form, Zod
- **UI/UX**: Framer Motion, Sonner (toasts), Radix UI primitives
- **Tools**: Bun, ESLint, Wrangler, Cloudflare Vite Plugin

## 🚀 Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo>
   cd <your-repo>
   bun install
   ```

2. **Development**:
   ```bash
   bun run dev
   ```
   Opens at `http://localhost:3000` (frontend) with hot reload. Backend API at `/api/*`.

3. **Type Generation** (after `wrangler deploy`):
   ```bash
   bun run cf-typegen
   ```

## 📋 Installation

Ensure you have **Bun** installed (`curl -fsSL https://bun.sh/install | bash`).

```bash
bun install
```

Regenerate TS types for Workers bindings:
```bash
bun run cf-typegen  # Run after first deploy
```

## 💻 Development

- **Frontend**: `bun run dev` (Vite dev server on port 3000).
- **Backend**: Automatically served via Workers preview (proxied by Vite).
- **Lint**: `bun run lint`
- **Build**: `bun run build` (produces `dist/` for deployment).
- **Preview**: `bun run preview`

Extend the app:
- **Backend Routes**: Add to `worker/user-routes.ts` (auto-loaded).
- **Entities**: Extend `worker/entities.ts` (Users/ChatBoards example).
- **Frontend**: Replace `src/pages/HomePage.tsx`. Use `api()` helper in `src/lib/api-client.ts`.
- **API Example**:
  ```ts
  // GET /api/users
  const users = await api<{ items: User[]; next: string | null }>('/api/users');
  ```

Seed data auto-loads on first API call (from `shared/mock-data.ts`).

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/users` | List users (?cursor=?&limit=10) |
| POST | `/api/users` | Create user `{ name: string }` |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/users/deleteMany` | Bulk delete `{ ids: string[] }` |
| GET | `/api/chats` | List chats |
| POST | `/api/chats` | Create chat `{ title: string }` |
| GET | `/api/chats/:chatId/messages` | List messages |
| POST | `/api/chats/:chatId/messages` | Send `{ userId: string, text: string }` |

All responses: `{ success: boolean, data?: T, error?: string }`.

## 🚀 Deployment

Deploy to Cloudflare Workers with one command:

```bash
bun run deploy
```

This builds the frontend, bundles the Worker, and deploys via Wrangler.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/victorianwobodo/wellbeing)

**Post-Deploy**:
```bash
bun run cf-typegen  # Update TS types
```

**Custom Domain**: Edit `wrangler.jsonc` → `assets.directory: "./dist"`.

**Environment Variables**: Add to Wrangler dashboard or `wrangler.toml`.

## 🤝 Contributing

1. Fork & clone.
2. `bun install`.
3. Make changes, test with `bun run dev`.
4. Lint: `bun run lint`.
5. PR with clear description.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Credits

Built with [Cloudflare Workers](https://workers.cloudflare.com), [shadcn/ui](https://ui.shadcn.com), and [Hono](https://hono.dev).