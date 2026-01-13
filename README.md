# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
# delsud-finanzas-frontend

Frontend for a small finance dashboard built with React, TypeScript and Vite. The app authenticates users, fetches expenses and sales data from an API, and renders charts.

## Features
- Authentication with context (`useContext`) and `useAuth` hook
- Fetch and display `gastos` (expenses) and `ventas` (sales)
- Chart visualization using `recharts` and helper utilities
- TypeScript interfaces for data shapes

## Tech stack
- React 19 + TypeScript
- Vite
- Recharts
- Sass for styles

## Project layout (important files)
- `src/context/AuthContext.tsx` — auth provider and token handling
- `src/hooks/useAuth.ts` — convenience hook to access auth
- `src/services/auth.service.ts` — login/register API calls
- `src/services/gastos.service.ts` — expenses API calls
- `src/services/ventas.service.ts` — sales API calls
- `src/interfaces/ventas.interface.ts` — sales data types
- `src/components/RechartsArea.tsx` — chart component
- `src/utils/transformarParaGrafico.ts` — data transform for charts
- `src/pages/*` — route pages (`auth`, `dashboard`, `gastos`, `ventas`)

## Getting started

Prerequisites
- Node.js (18+ recommended)
- npm (or pnpm/yarn)

Install

```bash
npm install
````

Environment

Create a `.env` file in the project root (Vite uses `VITE_` prefix for env vars). At minimum set:

```
VITE_API_BASE_URL=http://localhost:4000/api
```

Replace the URL with your backend API base.

Available scripts

- `npm run dev` — start dev server (Vite)
- `npm run build` — build production bundle (`tsc -b && vite build`)
- `npm run lint` — run ESLint
- `npm run preview` — locally preview build

These scripts come from `package.json`.

## Authentication flow

- The app uses `src/context/AuthContext.tsx` together with `src/hooks/useAuth.ts` to manage authentication state.
- `src/services/auth.service.ts` contains functions that call the backend endpoints (typically `/auth/login` and `/auth/register`).
- On successful login the backend should return an access token (e.g., JWT). The token is stored by the context (and usually mirrored to `localStorage`) and attached to API requests via an `Authorization: Bearer <token>` header.

Tips

- Verify `VITE_API_BASE_URL` is correct and that the backend enables CORS for the frontend origin.
- If the API requires refresh tokens or cookie-based sessions, update `AuthContext` and the services accordingly.

## Data & services

- `src/services/gastos.service.ts` should expose functions to fetch expenses. Example endpoints: `GET /gastos`, `POST /gastos`.
- `src/services/ventas.service.ts` should expose functions to fetch sales. Example endpoints: `GET /ventas`, `POST /ventas`.
- Expected responses:
  - `GET /ventas` -> Array of sale objects (see `src/interfaces/ventas.interface.ts`)
  - `GET /gastos` -> Array of expense objects

Refer to `src/interfaces/ventas.interface.ts` for the exact TypeScript types used in the app.

## Charts

- Chart rendering is implemented in `src/components/RechartsArea.tsx` using `recharts`.
- Data transformation for charts is done by `src/utils/transformarParaGrafico.ts` — keep API responses compatible with this transform helper (dates and numeric values).

## Routing and pages

- `src/pages/auth/*` — login and registration pages; `AuthLayout.tsx` wraps auth routes
- `src/pages/dashboard/Dashboard.tsx` — main dashboard (overview + charts)
- `src/pages/gastos/Gastos.tsx` — expenses page
- `src/pages/ventas/Ventas.tsx` — sales page

## Development notes

- Use the `VITE_API_BASE_URL` env var when calling APIs; e.g. `fetch(`${import.meta.env.VITE_API_BASE_URL}/ventas`)`.
- To speed up local development you can run the API locally or use a proxy. For Vite, you can configure `vite.config.ts`'s `server.proxy` if needed.

## Contributing

If you add features, please:

- Keep TypeScript types updated in `src/interfaces`
- Update `src/utils/transformarParaGrafico.ts` if API response shapes change
- Add tests or manual verification steps for data flows

## Troubleshooting

- No data in charts: check network requests in devtools and confirm the shape matches the transform function.
- Authentication issues: confirm the backend returns a valid token and that `AuthContext` sets it in headers.

## License

This repository does not include a license file. Add one if you plan to open-source the code.
