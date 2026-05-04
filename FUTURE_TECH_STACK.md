# Tech Stack Modernization Guide
## Stock Portfolio Practice Application

> **Context:** This document outlines the modernization plan for a full-stack stock portfolio practice app (buy/sell stocks for investment practice) that has been dormant for ~6 years. The goal is to update the tech stack and introduce agentic AI as a core feature.

---

## At a Glance: What's Changing

| Layer | Old | New |
|---|---|---|
| Framework | React + Express | Next.js 15 (React 19, App Router) |
| State Management | Redux | Zustand |
| Styling | CSS + React-Bootstrap | Tailwind CSS + shadcn/ui |
| API Layer | Express REST | Hono + tRPC |
| Market Data | — | Polygon.io / Alpaca API |
| AI | — | Claude API + Vercel AI SDK |
| Database | MySQL | PostgreSQL (Neon) |
| ORM | — | Drizzle ORM |
| Cache | — | Upstash Redis |
| Hosting | Heroku | Vercel |
| Auth | Custom / none | Clerk |

---

## Layer-by-Layer Breakdown

### Frontend

#### Next.js 15 with React 19 — *replaces standalone React*

Next.js consolidates the frontend and removes the need for a separate Express server for rendering. Key benefits for this project:

- **App Router** enables server components, layouts, and nested routing out of the box — no more manual React Router configuration.
- **Server Actions** allow form submissions and mutations without building separate API endpoints for simple operations.
- **Built-in optimizations** include image optimization, font loading, and code splitting that previously required manual configuration.

#### Zustand — *replaces Redux*

Redux's boilerplate (actions, reducers, dispatchers, selectors) is excessive for a portfolio app of this scale. Zustand provides the same global state primitives with a fraction of the setup:

- Define a store in a single file with no boilerplate.
- Works natively with React hooks.
- Supports middleware (persistence, devtools) when needed.
- TypeScript support is first-class.

Migrate Redux slices to Zustand stores one-to-one during the transition.

#### Tailwind CSS + shadcn/ui — *replaces CSS + React-Bootstrap*

React-Bootstrap ships opinionated styles that are difficult to customize and carry a dated visual aesthetic. Tailwind + shadcn/ui offers:

- **Tailwind CSS** is a utility-first framework — styles are composed inline rather than in separate files, making components self-contained and easier to maintain.
- **shadcn/ui** is a collection of accessible, unstyled component primitives (modals, dropdowns, tables, charts) built on Radix UI. Components are copied into your codebase, not installed as a black-box dependency, so they're fully customizable.
- The combination produces a modern, consistent design system that's straightforward to theme.

---

### Backend

#### Hono — *replaces Express*

Hono is a modern web framework designed for TypeScript-first development and edge runtimes. Advantages over Express:

- Full TypeScript support with typed request/response objects.
- Runs on Node.js, Vercel Edge Functions, and Cloudflare Workers without code changes.
- Significantly lighter and faster than Express with no legacy baggage.
- Middleware ecosystem covers the same use cases (CORS, auth, rate limiting).

#### tRPC — *new addition*

tRPC eliminates the type disconnect between frontend and backend. With tRPC:

- Procedures defined on the server are automatically typed on the client — no manual interface duplication, no OpenAPI spec to maintain.
- Mutations and queries are called like regular TypeScript functions.
- Errors surface at compile time rather than at runtime.
- Works seamlessly within Next.js via server-side tRPC context.

For a portfolio app, this means your `executeTrade`, `getPortfolio`, and `getStockHistory` procedures are fully typed end-to-end.

#### Polygon.io / Alpaca API — *new addition*

The application needs real-time and historical market data. Two recommended sources:

- **Polygon.io** — provides real-time quotes, historical OHLCV data, and company fundamentals. Free tier covers most development needs.
- **Alpaca Markets API** — additionally supports paper trading (simulated order execution with real market data), which is ideal for a practice portfolio app. Free tier available.

Either can be wrapped in a backend service layer and cached with Redis to avoid hitting rate limits on repeated price lookups.

---

### Agentic AI Layer

This is the largest new capability addition. The AI agent acts as a portfolio advisor that users can converse with — and that can take real actions within the app.

#### Claude API — *new addition*

Anthropic's Claude API powers the agent's reasoning. Claude is well-suited for this use case because:

- It can reason about financial data, explain market events, and analyze portfolio composition in plain language.
- It supports **tool use** (function calling), which allows it to call backend functions as part of a conversation turn.
- Context window size allows it to reason over an entire portfolio's history in a single prompt.

#### Vercel AI SDK — *new addition*

The Vercel AI SDK provides the plumbing between Claude and your Next.js frontend:

- **Streaming responses** — AI responses stream token-by-token rather than waiting for the full reply.
- **Tool call orchestration** — defines the tools the agent can call (see below) and handles the multi-step reasoning loop automatically.
- **React hooks** (`useChat`, `useCompletion`) make it straightforward to build chat interfaces.

#### Agent Tools

The agent should be equipped with the following tools, each backed by a tRPC procedure or direct API call:

| Tool | Description |
|---|---|
| `get_stock_price` | Fetches the current price for a given ticker from Polygon.io or Alpaca |
| `get_portfolio_summary` | Returns the user's current holdings, cost basis, and P&L |
| `execute_paper_trade` | Places a simulated buy or sell order on the user's practice portfolio |
| `get_stock_history` | Returns historical price data for charting or analysis |
| `analyze_portfolio_risk` | Calculates concentration risk, sector allocation, and volatility metrics |
| `explain_market_event` | Searches for recent news or context around a given ticker or market event |
| `get_watchlist` | Returns the user's saved watchlist stocks |

With these tools, a user can ask questions like *"How is my portfolio performing this week?"*, *"Buy 10 shares of AAPL for me"*, or *"Why did NVDA drop today?"* and the agent will reason, call the appropriate tools, and respond with grounded information.

---

### Data Layer

#### PostgreSQL — *replaces MySQL*

PostgreSQL is the modern standard for relational databases and is better supported across the current hosting and ORM ecosystem:

- Native JSON/JSONB columns are useful for storing instrument metadata and AI conversation history.
- Superior full-text search, useful for a stock search feature.
- First-class support from Drizzle ORM, Prisma, and every major hosting provider.
- Neon (below) is Postgres-native.

#### Drizzle ORM — *new addition*

Drizzle is a TypeScript-first ORM that generates fully-typed query builders from your schema:

- Schema is defined in TypeScript, not a separate DSL or JSON file.
- Migrations are straightforward and version-controlled.
- No runtime query-builder magic — queries are transparent and debuggable.
- Works natively with Neon's serverless driver for edge deployments.

Core tables for this application: `users`, `portfolios`, `holdings`, `transactions`, `watchlist`, `ai_conversations`.

#### Upstash Redis — *new addition*

A serverless Redis instance used for:

- **Price caching** — cache stock prices for 15–60 seconds to avoid hammering the market data API on every user request or AI tool call.
- **Rate limiting** — prevent abuse of the paper trading endpoint and AI advisor.
- **Session data** — short-lived data that doesn't need to be persisted to Postgres.

Upstash bills per request with no minimum, making it cost-effective for a low-to-medium traffic app.

---

### Infrastructure

#### Vercel — *replaces Heroku*

Vercel is the natural deployment target for a Next.js application:

- **Zero-config deploys** — push to GitHub and the app deploys automatically with environment variable management built in.
- **Edge network** — static assets and edge functions are served from a CDN globally, reducing latency for real-time stock data display.
- **Preview deployments** — every pull request gets its own live URL, making review and QA much easier.
- **Native integrations** with Neon, Upstash, and Clerk via the Vercel Marketplace.
- Cost-effective — the hobby tier covers development and low-traffic production.

#### Clerk — *new addition (replaces custom auth)*

Clerk is a fully managed authentication and user management service:

- Drop-in React components for sign-up, sign-in, and user profile pages.
- Supports email/password, OAuth (Google, GitHub, etc.), and magic links out of the box.
- User data (ID, email, metadata) is available server-side in Next.js middleware and route handlers.
- Webhooks sync user creation/deletion events to your Postgres `users` table.

#### Neon — *new addition (replaces Heroku Postgres)*

Neon is a serverless PostgreSQL hosting platform:

- **Scales to zero** when idle — no idle compute costs during development.
- **Branching** — create isolated database branches for feature development, similar to Git branches.
- One-click integration with Vercel; connection strings are automatically injected as environment variables.
- Generous free tier covers development and small production workloads.

---

## Migration Path

The recommended migration order minimizes disruption by keeping the app functional at each step:

1. **Infrastructure first** — Provision Neon (Postgres), set up Vercel project, configure Clerk. Migrate MySQL data to Postgres.
2. **Backend** — Replace Express with Hono, introduce tRPC router, connect Drizzle ORM to Neon.
3. **Frontend** — Migrate React app into Next.js App Router structure. Replace Redux with Zustand. Replace Bootstrap with Tailwind + shadcn/ui incrementally.
4. **Market data** — Integrate Polygon.io or Alpaca API, add Upstash Redis caching layer.
5. **AI agent** — Integrate Claude API via Vercel AI SDK, define and test agent tools, build chat UI.

---

## Environment Variables Reference

```env
# Database
DATABASE_URL=postgresql://...

# Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Market Data
POLYGON_API_KEY=...
ALPACA_API_KEY=...
ALPACA_API_SECRET=...

# AI
ANTHROPIC_API_KEY=sk-ant-...

# Cache
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

*Last updated: May 2026*
