# Architecture Checklist

- Components are split by reusable UI pattern.
- Static labels, values, lists, routes, and image paths live in `src/data/mockData.ts`.
- Screens are routed with React Router.
- Top app title links back to `/`.
- Every component and page file exports a `Readonly` props interface.
- Component color classes use Tailwind theme tokens from `resources/style-guide.json`.
- Verification scripts require user permission before running.
