#Visit the Deployment here:
[https://patrify-next.vercel.app/](https://patrify-next.vercel.app/)
# Patrify

Patrify is a lightweight, creator-first platform that makes it simple for creators to receive one-off payments and contributions directly from their community. Built with Next.js (App Router), NextAuth for authentication, and integrated with Razorpay for secure payments.

This README gives you a quick overview, developer setup, deployment notes and troubleshooting tips for the payment flow and authentication.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start (development)](#quick-start-development)
- [Environment variables](#environment-variables)
- [Payment flow notes (Razorpay)](#payment-flow-notes-razorpay)
- [Authentication (NextAuth)](#authentication-nextauth)
- [Project structure](#project-structure)
- [Testing & debugging tips](#testing--debugging-tips)
- [Deploying](#deploying)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Public, shareable creator profiles with cover and avatar.
- One-off payments and messaging for supporters (Razorpay checkout).
- Creator dashboard to view incoming payments.
- Authentication via NextAuth (GitHub provider configured in the sample project).
- Minimal, responsive UI using Tailwind CSS.

---

## Tech stack

- Next.js (App Router)
- React (client components for interactivity)
- NextAuth for authentication
- Razorpay for payment processing
- Tailwind CSS for styling
- MongoDB / Mongoose for data persistence (models are in `app/models`)

---

## Quick start (development)

Prerequisites:

- Node.js 18+
- A MongoDB connection (local or hosted)
- Razorpay account for API keys
- Git

Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Notes:

- The app uses the App Router (`app/`); pages are server components by default. Client-only components are marked with `"use client"`.
- If you change environment variables, restart the dev server.

---

## Environment variables

Create a `.env.local` file in the project root and add the following variables (example names):

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/patrify
GITHUB_ID=<your_github_oauth_client_id>
GITHUB_SECRET=<your_github_oauth_client_secret>
RAZORPAY_KEY_ID=<your_razorpay_key_id>
RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<a_random_secret_string>
NEXT_PUBLIC_URL=http://localhost:3000
```

Guidance:

- Keep server-only secrets (Razorpay secret, DB URI) unprefixed (do not expose them as `NEXT_PUBLIC_...`).
- `NEXT_PUBLIC_URL` is used to build absolute callback URLs for Razorpay and client redirects.

---

## Payment flow notes (Razorpay)

High level:

1. Client requests an order from the server (server creates an order through the Razorpay server SDK using your secret key).
2. Server returns order details to the client.
3. Client loads Razorpay Checkout (checkout.js) and opens the payment modal using the public `RAZORPAY_KEY_ID`.
4. On success the checkout can either:
   - Use a client-side `handler` callback to POST the payment result to your API for verification (recommended), or
   - Use `callback_url` where Razorpay posts form data to the provided URL. If you rely on `callback_url`, make sure that endpoint accepts both `POST` (form) and `GET` (query params) because different browsers / in-app browsers behave differently.

Important gotchas we handle in this project:

- Browser differences: some mobile / in-app browsers submit a POST to the callback URL while others redirect with query parameters. Make sure your API accepts both POST form-data and GET query parameters (or use a client-side handler + server webhook for robustness).
- Redirect status: if you accept Razorpay POST and then redirect the browser, use HTTP 303 (See Other) so the browser follows with GET (prevents re-POSTing to the destination page).
- Webhooks: for a fully resilient flow, add a Razorpay webhook that verifies payments server-to-server (webhooks are the recommended final source-of-truth).

Example client handler usage (simplified):

```js
const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  order_id: order.id,
  handler: async function(response) {
    // response contains payment_id, order_id, signature
    await fetch('/api/razorpay/verify', { method: 'POST', body: JSON.stringify(response) });
    window.location.href = `/profile/${username}?payment=success`;
  }
}
```

---

## Authentication (NextAuth)

- This app uses NextAuth with the GitHub provider in `app/api/auth/[...nextauth]/route.js`.
- The `authOptions` configuration includes a `session` callback that attaches `username` read from the database to `session.user` — call `useSession()` in client components to access `session.user.username`.
- Ensure the `SessionProvider` (or `SessionWrapper`) is mounted at the top-level layout (`app/layout.js`) so `useSession()` works in client components.

Session refresh: after you update user profile data server-side (for example, username), call `useSession().update()` on the client to refresh the NextAuth session data so `session.user.username` is up-to-date.

---

## Project structure (important files)

- `app/` — app router pages and layout
  - `app/about/page.js` — the About page
  - `app/profile/[username]/page.js` — public profile route
  - `app/dashboard/page.js` — creator dashboard
  - `app/api/auth/[...nextauth]/route.js` — NextAuth handlers and callbacks
  - `app/api/razorpay/route.js` — payment verification endpoint (accepts POST/GET and returns redirect with 303)
- `components/` — React components (Navbar, Footer, PaymentInfo, AboutInfoCard)
- `app/models/` — Mongoose models (User, Payment)
- `public/` — images and GIFs used in the site

---

## Testing & debugging tips

- Developer console / Network tab: watch the final request Razorpay sends (URL + method). If you see a POST to `/profile/...` it means the callback was set to that URL and the browser posted form data to it.
- Server logs: add logging at the top of `app/api/razorpay/route.js` to determine whether you receive a POST (form) or GET (query) and where verification fails.
- Clear cookies: if session-related behavior looks stale, clear `localhost` cookies and re-login.
- Restart dev server after env changes: `npm run dev`.

---

## Deploying

You can deploy to Vercel or any platform that supports Next.js App Router. On Vercel, make sure to set the environment variables in the project settings (especially `MONGODB_URI`, `RAZORPAY_KEY_SECRET`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, and `NEXT_PUBLIC_URL`).

If you use webhooks, ensure the webhook endpoint is configured in the Razorpay dashboard and reachable by Razorpay (public URL).

---

## Contributing

Contributions are welcome. Open a PR with clear description and testing steps. For issues related to payments or auth flows, include network traces and server logs (mask sensitive data).

---

## License

This project is provided as-is. Add your preferred license here (e.g., MIT) or contact the repository owner.

---

If you'd like, I can also add a short `docs/` page with flow diagrams for the Razorpay checkout and webhook verification steps. Want that added?
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
