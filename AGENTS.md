# Sup! docs — instructions for AI assistants

End-user documentation for Sup! (follow-ups / standups, forms, leave tracking and
more on Slack and Microsoft Teams). Built with [Fumadocs](https://fumadocs.dev)
on Next.js. The product code lives next door: `../sup-frontend` (React web app) and
`../sup-backend` (Django API and the Slack/Teams bots).

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
- Webex is being deprecated: do not mention it, even where the code still supports it.

## Writing style

- Readers are workspace admins/managers setting things up and members answering
  in chat. Write in the second person, task first ("To duplicate a follow-up…").
- Members mostly answer in Slack or Microsoft Teams. Lead with the chat interaction;
  answering from the dashboard comes after, as the alternative.
- Call the web app "the dashboard" (or "the Sup! dashboard"), never "the web app".
- Bold UI labels as they appear on screen: **Create follow-up**, **Save**.
- Call out platform differences (Slack / Microsoft Teams) and paid-plan
  limits where they exist; don't assume Slack-only.
- One page per task or concept; link related pages instead of repeating them.
- Use Fumadocs components where they help: `<Steps>`/`<Step>` for procedures,
  `<Callout>` for notes and warnings, `<Tabs>` for per-platform differences,
  `<Cards>` on section index pages.

## Layout

- Pages: `content/docs/<section>/<page>.mdx`, frontmatter `title` + `description`.
- Sidebar order and section titles: `content/docs/<section>/meta.json` (`pages` array).
- Images: `public/images/<section>/<name>.png`, referenced as
  `/images/<section>/<name>.png`, with alt text that says what the screenshot shows.
- Screenshots: light mode only, of the current UI, taken in the fictional **Acme Corp**
  workspace (made-up people, channels and answers; never real customer data), 1440px wide
  at 2× and cropped to what the page is about. Write the page from the code, then capture.
- No screenshots of third-party tools embedded in or linked from Sup! (Draxlr stats,
  Jotform, Google Sheets…). Describe them in text. Sup!'s own Slack/Teams message previews
  are fine.
- Site name, nav and GitHub link: `lib/shared.ts`, `lib/layout.shared.tsx`.

## Commands

```bash
npm run dev          # http://localhost:8800
npm run build        # must pass before you say you're done
npm run types:check
```
