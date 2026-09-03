# Collective Creation Games

Visualise knowledge through 3D force graphs.

![graph](assets/graph.png)

A single-page site that renders the Collective Creation Games knowledge base as an interactive 3D graph. Live at [collectivecreationgames.com](https://collectivecreationgames.com).

## How it works

- The knowledge base lives in `src/data/*-nodes.json` (English and Arabic), one node per concept with the links between them.
- `src/data/*-graph-setup.ts` lists which nodes are shown by default on desktop and on mobile, and the tag filters offered in the toolbar.
- `/api/graph/[locale]` serves the data for the active language. The client fetches it once and never revalidates.
- Click a node to reveal its children, click it again to hide all of its descendants. "Reveal" shows the full graph. On mobile the graph is read-only.

## Development

Requires Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Before opening a pull request:

```bash
npm run check      # lint + typecheck + prettier
npm run build
```

Other scripts: `npm run format` rewrites files with Prettier, `npm run clean` removes `.next` and `node_modules`.

### Environment

| Variable                         | Purpose                                                        |
| -------------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_STATS_TRACKING_URL` | Optional analytics script URL. Nothing is injected when unset. |

## Stack

- [Next.js](https://nextjs.org) (Pages Router, Turbopack) and React 19
- [Tailwind CSS v4](https://tailwindcss.com), tokens in `src/styles/globals.css`
- [react-force-graph-3d](https://github.com/vasturiano/react-force-graph) on [three.js](https://threejs.org), labels via `three-spritetext`
- [SWR](https://swr.vercel.app) for data fetching
- Deployed on Vercel

## Layout

```
src/
  components/   force-graph, graph-controls, checkbox, layout, custom-head, home
  data/         node JSON + curated visible-node lists per language
  hooks/        useDeviceDetect, useGraphVisibility
  lib/          pure graph helpers (children index, descendants)
  modules/      language enum and helpers
  pages/        _app, _document, index, api/graph/[locale]
  styles/       globals.css (Tailwind v4 theme + design tokens)
  types/        GraphNode / GraphLink / GraphData
```

## Credits

Rami Chahine and Walid Behlock.
