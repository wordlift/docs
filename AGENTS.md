# Repository Agent Rules

## Documentation Duplication Policy

- Never duplicate page content across multiple docs pages.
- Keep one canonical page for each topic and link to it from secondary pages.
- In secondary pages, include only a brief summary plus a link to the canonical page.
- If duplicate content already exists, replace it with a short summary and a link.

## Generated Documentation Artifacts

- Treat `llms.txt` and `llms-full.txt` as generated documentation artifacts.
- Update source documentation first, then regenerate or rebuild the site so generated artifacts reflect the canonical docs.
- Do not hand-maintain duplicate long-form content in generated artifacts when it can be produced from source docs.

## Private Commands

- Do not document `worai graph kpis push` or its upload workflow in public documentation, API specifications, examples, release notes, or generated documentation artifacts.
- Public `worai graph kpis` documentation may cover local calculation and payload generation only.
