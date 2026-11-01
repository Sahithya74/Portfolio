# Sahithya K. — Portfolio

An animated portfolio built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, GSAP and React Three Fiber.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Connect the contact form

Messages are delivered with [Web3Forms](https://web3forms.com) (free).

1. Go to web3forms.com, enter the email address that should receive messages, and copy the access key.
2. Copy `.env.example` to `.env` and fill it in:

   ```
   VITE_WEB3FORMS_KEY=your-access-key
   VITE_CONTACT_EMAIL=you@example.com   # optional, shows an Email link on the site
   ```

3. Restart `npm run dev` (or rebuild). Your hosting provider also needs these two variables set.

Until a key is set, the form validates input and then tells the visitor plainly that it is not connected yet. It never reports success without an actual delivery.

## Editing content

All text lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `personal.ts` | Name, roles, quote, About text, links, résumé path, philosophy, traits |
| `projects.ts` | The six projects: descriptions, features, URLs, tech stack, screenshots |
| `skills.ts` | Skill groups and the short badge labels |
| `experience.ts` | Aaroh club role (with an optional `duration`) and education |

Common updates:

- **Ilamthalir URL**: set `url` for `ilamthalir` in `projects.ts`.
- **Project screenshots**: put images in `public/projects/` and list them, e.g. `screenshots: ['/projects/ledplanet-home.jpg']`. The first one replaces the cover art.
- **Tech stacks / GitHub links**: fill in each project's `tech` and `github`.
- **Résumé**: put the PDF in `public/` and set `resume: '/Sahithya-K-Resume.pdf'` in `personal.ts`.
- **Profile photo**: replace `src/assets/profile.jpg` (and `public/og-image.jpg` for link previews).

## Hosting

The site is static apart from the Web3Forms call. Case-study pages use client-side routes (`/project/<slug>`), so configure your host to serve `index.html` for unknown paths. On Netlify that's a `_redirects` file with `/* /index.html 200`; Vercel does this automatically for Vite projects.
