# Project: Cafe Dashboard
**Context & Instructions for Future AI Models**

## What is this App?
A **High-End Cafe / Roastery Management Dashboard** built for a client/manager to track live cafe operations:
- Active Orders (takeout, table service)
- Table Reservations & Status
- Menu Inventory & Popularity
- Accounting & Recent Transactions
- Store Settings (Notifications, Dashboard Preferences)

## The Aesthetic: "Midnight Luxe"
The design system enforces a highly premium, cinematic UI:
- **Colors**: Deep Obsidian backgrounds (`#0D0D12`), Champagne Gold accents (`#C9A84C` — reserved for titles, icons, and primary buttons ONLY), Ivory/White text (`#FAF8F5` — used for all body text, descriptions, and item names). Card borders are a subtle Slate (`#2A2A35`).
- **Typography**: `Geist` (primary UI) and `Geist Mono` (for data, numbers, and stats).
- **Icons**: `lucide-react` icons globally set to a lightweight, premium stroke width (`strokeWidth={1.5}`).
- **Components**: Heavy use of glassmorphism (`backdrop-blur-md`), deep glowing drop shadows (`shadow-[0_0_30px_rgba(...)]`), and complex CSS hover states (scale, translate, ring).

## Tech Stack
- **Framework**: Next.js 16.2.4 (App Router)
- **Database**: Supabase (PostgreSQL) — Project ID: `lmxphybsbmglkjdodopl`
- **Styling**: Tailwind CSS v4-compatible CSS Variables
- **Icons**: Lucide React
- **Data Visualization**: Recharts (Custom AreaCharts with gradients and custom tooltips)
- **Deployment Target**: Netlify (see `netlify.toml`)

## Database Schema (Supabase)
All tables are in the `public` schema. RLS is currently **disabled** (no auth yet).

| Table | Primary Key | Key Columns |
|---|---|---|
| `orders` | `id` (text) | `customer_name`, `items`, `status`, `color`, `created_at` |
| `tables` | `id` (text) | `name`, `time`, `guests`, `created_at` |
| `menu_items` | `id` (uuid) | `category`, `name`, `price`, `status`, `created_at` |
| `transactions` | `id` (text) | `processed_by`, `img`, `amount`, `time`, `created_at` |

## Supabase Connection Pattern
- **Client**: `src/lib/supabase.ts` — exports a singleton `supabase` client.
- **Env Vars**: `.env.local` contains `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Data Fetching**: All page components are **async Server Components** that call `supabase.from('table').select('*')` directly. No client-side fetching or `useEffect` — data is fetched at request time on the server.

## What We Have Done So Far
1. **Core Layout**: Sticky `Sidebar` (with Settings only at bottom, no Support) and `TopActions` header with profile avatar and notification bell.
2. **Dashboard Overview (`/`)**: Full-width AreaChart tracking hourly orders, plus a 3-column grid showing Live Orders, Reserved Tables, and Top Menu items. All data fetched from Supabase.
3. **Dedicated Pages** (all Supabase-backed):
   - `/orders`: Live orders queue with customer initials and statuses.
   - `/tables`: Grid of reservation cards with guest counts and times.
   - `/menu`: Inventory grouped by category (Coffee, Pastries) with status badges.
   - `/accounting`: Revenue summary cards + transactions table with staff avatars.
   - `/settings`: Tabbed settings with iOS-style toggles for In-App, Email, and Push notifications, plus Dashboard Preferences dropdowns.
   - `/new`: A high-fidelity "Create New Order" form (currently static, not yet wired to DB).
4. **Interactivity**: Complex hover states, dynamic route highlighting in sidebar, interactive chart tooltips, avatar integrations.

## Instructions for Future AI Models
1. **Maintain the Aesthetic**: NEVER revert to basic Tailwind defaults. Keep borders subtle (`border-card-border/50`), use glassmorphism (`bg-card/50 backdrop-blur-md`). Use `text-primary` (gold) for section headings and accent icons ONLY. Use `text-foreground` (white) for all body text, item names, descriptions, and table data.
2. **Icons**: Whenever you add a new `lucide-react` icon, you MUST add `strokeWidth={1.5}`.
3. **Data**: All pages now fetch from Supabase. When adding new features, follow the async Server Component pattern in existing pages.
4. **Avatars**: Use Unsplash image URLs for avatars to maintain the premium feel, not generic icons.
5. **DO NOT change the fonts** away from Geist without explicit user instruction.
6. **Color Rule**: Gold (`text-primary`) = headings, category titles, icon accents. White (`text-foreground`) = everything else (names, items, descriptions, buttons).

