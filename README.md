# Moviedex - Movies & Shows Directory

![Project Banner](/public/posters/interstellar.jpg)

> **Submission for Intern Assessment**

## 🔗 Links
- **GitHub Repository**: [INSERT GITHUB REPO LINK HERE]
- **Live Demo (Vercel)**: [INSERT VERCEL LIVE URL HERE]

---

## 5. Dataset Used & Source
The application relies on a **comprehensive static dataset** of movies, stored in `data/movies.json`.

- **Source**: The primary data (titles, overviews, ratings, release dates) stems from the **TMDB (The Movie Database) API**.
- **Images**: High-quality posters and backdrops are sourced from TMDB's image CDN (`image.tmdb.org`) and local assets for key feature films to ensure reliability.
- **Diversity**: The dataset features a mix of genres including Sci-Fi (Interstellar, Matrix), Crime (Pulp Fiction, Goodfellas), and Animation (Spirited Away, Spider-Verse).

## 6. How Data Was Generated
To ensure a robust testing environment without hitting API rate limits during development, the data was **generated and expanded** using custom Node.js scripts:

1.  **Fetching**: Initial seed data for key movies was fetched/defined based on real TMDB attributes.
2.  **Expansion Script** (`scripts/expand-data.js`): 
    - We implemented a custom algorithm to validly duplicate and vary the seed movies to create a larger dataset (~160 items).
    - It generates unique IDs, rotates titles slightly (for pagination testing), varies ratings randomly within a realistic range, and distributes release years.
    - This allows for thorough testing of the **Pagination**, **Sorting**, and **Search** features without needing thousands of manual entries.

## 7. Tech Stack & Design Inspiration

### Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first, responsive)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: Async/Await with Server Actions simulation
- **Deployment**: Optimized for Vercel

### Design Inspiration
The User Interface is heavily inspired by **Letterboxd**, chosen for its content-first approach and dark aesthetic which is beloved by film enthusiasts.
- **Aesthetics**: Dark gunmetal backgrounds (`#14181c`), vibrant green accents (`#00e054`), and serif typography for headlines to evoke a cinematic feel.
- **UX Patterns**: Horizontal cards for lists, grid layouts for posters, and a dense information hierarchy that favors metadata (Director, Year) over decorative fluff.

## 8. AI Prompt Examples
Throughout the development, AI was leveraged to accelerate boilerplate and solve specific logical hurdles. Here are 3 key prompts used:

### Prompt 1: Component Architecture
> "Create a 'MovieCard' component using Tailwind CSS that mimics the Letterboxd poster style. It should have a 2:3 aspect ratio, a hover effect that fades in a dark overlay with the movie title and rating at the bottom, and use the Next.js <Image /> component for optimization. Ensure the border glows green on hover."

### Prompt 2: Data Logic
> "Write a Node.js script `expand-data.js` that takes an array of 5 base movie objects and expands it into 160 items. For each duplicate, create a unique ID, vary the release year slightly (randomly within 5 years), and perturb the rating by +/- 0.5 so sorting is visible. Save this to `data/movies.json`."

### Prompt 3: Debugging & Layout
> "I added a Sidebar to the Movie Detail page, but on mobile, it pushes the main content too far down. Update the grid layout in `app/movies/[slug]/page.tsx` to be a single column on mobile and a 2-column grid (3fr 1fr) on desktop (md: breakpoint). Ensure the sidebar appears *below* the main info on mobile."

## 9. Future Improvements (With 2 More Days)
If I had 48 more hours to work on this, I would prioritize:

1.  **Real-time Database Integration**:
    - Migrate from `movies.json` to **PostgreSQL (via Supabase)** or **MongoDB**. This would allow for real dynamic updates, better filtering performance (SQL queries), and persistence.

2.  **User Authentication & Social Features**:
    - Implement **Clerk** or **NextAuth.js** to allow users to sign in.
    - Add functionality to "Log" movies, create "Watchlists," and leave actual text reviews that persist to the database.

3.  **Interactive "Showdown" Mode**:
    - Build out the "Showdown" feature hinted at in the home page widgets, allowing users to vote between two random movies (like "FaceMash" for films) to crowd-source a community ranking.

---
**Author**: [Your Name/ID]
