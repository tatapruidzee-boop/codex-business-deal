# Forma — Pre-IPO Investment Hub

A responsive Georgian-language educational demo built with Next.js, TypeScript and Tailwind CSS. The editorial layout uses locally bundled Noto Georgian fonts. Interface text, lessons, assistant responses and trading messages are Georgian; fictional company names and the Forma brand remain in their original spelling. Euro amounts use Georgian separators consistently, including browsers without Georgian ICU locale support. All five companies, prices, funding figures, percentage changes and transactions are fictional. No real investments, payments, or securities transfers take place.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

When running on your own computer, open http://localhost:3000 in your browser. A cloud server’s localhost is separate from your computer. This Codex onboarding interface does not provide a browser preview; deploy to Vercel to obtain a browser-accessible URL. The server binds to `0.0.0.0`.

```sh
npm test
npm run build
npm run typecheck
npm start
```

`npm start` serves the production build on port 3000. If your npm cache is not writable, append `--cache /tmp/forma-npm-cache` to the install command.

## Demo behaviour

- Begin with €10,000 virtual cash. Buy whole shares at fixed demo prices; sell only shares you own.
- Portfolio, cash and transaction history update together and persist in this browser’s local storage under `forma-demo-v1`.
- Reset demo requires confirmation and clears all simulated trades. Clearing browser data also resets the demo.
- No account, backend, API key or external service is required. The learning assistant uses predefined keyword-based responses; it is not a live AI model.
- Chart artwork is decorative; displayed percentage changes are fictional, not portfolio returns. No fees, taxes, changing prices or real-world liquidity constraints are modelled.
- Knowledge Hub articles explain risk, valuation and private markets. Nothing is personalised investment advice.

## Checks

`npm test` runs trading tests for purchases, sales, cash conservation, rounding, invalid orders, persistence validation and reset state. `npm run typecheck` validates TypeScript; `npm run build` compiles the production app.

## Deploy to Vercel

1. Sign in to Vercel with GitHub and choose **Add New → Project**.
2. Import `tatapruidzee-boop/codex-business-deal` and use the `main` branch. If it is missing, configure GitHub access for the Vercel integration.
3. Keep the **Next.js** framework preset and repository root directory (`./`). Use the default install and build settings. No environment variables or API keys are needed.
4. Click **Deploy**. When deployment is ready, click **Visit** to open the generated website URL.

All trades remain local browser simulations. Each browser starts with its own demo balance; no shared account or financial backend is involved.
