# Sup! docs

End-user documentation for Sup!, built with [Fumadocs](https://fumadocs.dev) on Next.js.

```bash
npm install
npm run dev     # http://localhost:8800
npm run build
```

- Pages live in `content/docs/<section>/*.mdx`; `meta.json` in each folder sets the sidebar order.
- Images go in `public/images/<section>/<page>/`.
- Writing rules (including *when* to update docs) are in [AGENTS.md](AGENTS.md).
