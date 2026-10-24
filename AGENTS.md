# Sup! docs — instructions for AI assistants

End-user documentation for Sup! (follow-ups / standups, forms, leave tracking and
more on Slack, Microsoft Teams and Webex). Built with [Fumadocs](https://fumadocs.dev)
on Next.js. The product code lives next door: `../sup-frontend` (React web app) and
`../sup-backend` (Django API and the Slack/Teams/Webex bots).

## When to write docs

**Only create or change documentation once a feature is finalized** — merged, or
the user has said it is done. Do not write docs for work in progress, and do not
update docs as a side effect of a feature change while the feature is still moving.

- If the user tells you to update the docs, do it.
- If you finish a change that would make an existing page wrong (a renamed button,
  a new option, a removed step), and the feature is finalized, ask the user
  whether to update the docs before touching them — even for a minor change.
  Name the page(s) affected so the answer is quick.
- Never delete or rewrite a page for a feature you were not asked about.

## Source of truth

- Describe the product as the **current code** shows it. Read the screens in
  `../sup-frontend/src` and the bot messages in `../sup-backend` and copy
  user-visible labels exactly (button text, step names, toggle labels).
- The old in-app docs at `../sup-frontend/public/content/documentation/` are from
  2023 and show the pre-redesign UI. Use them for structure and topic ideas
  only, check every claim against the code, and do not delete them — they still
  serve `/documentation` in the web app until the user retires them.
- If the code and an existing page disagree, the code wins; tell the user.
- Workflows are legacy and being deprecated: do not document them.

## Writing style

- Readers are workspace admins/managers setting things up and members answering
  in chat. Write in the second person, task first ("To duplicate a follow-up…").
- Bold UI labels as they appear on screen: **Create follow-up**, **Save**.
- Call out platform differences (Slack / Microsoft Teams / Webex) and paid-plan
  limits where they exist; don't assume Slack-only.
- One page per task or concept; link related pages instead of repeating them.
- Use Fumadocs components where they help: `<Steps>`/`<Step>` for procedures,
  `<Callout>` for notes and warnings, `<Tabs>` for per-platform differences,
  `<Cards>` on section index pages.

## Layout

- Pages: `content/docs/<section>/<page>.mdx`, frontmatter `title` + `description`.
- Sidebar order and section titles: `content/docs/<section>/meta.json` (`pages` array).
- Images: `public/images/<section>/<page>/<name>.png`, referenced as
  `/images/<section>/<page>/<name>.png`. Only add screenshots of the current UI.
- Site name, nav and GitHub link: `lib/shared.ts`, `lib/layout.shared.tsx`.

## Commands

```bash
npm run dev          # http://localhost:5000
npm run build        # must pass before you say you're done
npm run types:check
```
