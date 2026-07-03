# graph kpis

Calculate graph KPI snapshots from a local RDF export and optionally upload them to the WordLift API.

## Usage
- `worai graph kpis calculate <file> [--website-host <host>] [--graph-host <host>] [--builtin-shape <name>] [--exclude-builtin-shape <name>] [--shape <file>] [--no-builtin-shapes] [--depth <n>] [--issue-level warning|error] [--shacl-workers <n>] [--memory-mode auto|full|streaming] [--max-full-graph-bytes <bytes>] [--output <file>]`
- `worai graph kpis payload <file> [--snapshot-date YYYY-MM-DD] [--website-host <host>] [--memory-mode auto|full|streaming] [--max-full-graph-bytes <bytes>] [--output <file>]`
- `worai graph kpis push <file> [--snapshot-date YYYY-MM-DD] [--website-host <host>] [--api-url <url>] [--timeout <seconds>] [--memory-mode auto|full|streaming] [--max-full-graph-bytes <bytes>] [--output <file>] [--details-output <file>]`

## Notes
- Requires `wordlift-sdk>=8.3.6`.
- `<file>` accepts any graph format supported by the SDK graph loader, including Turtle and JSON-LD.
- `calculate` writes the detailed KPI JSON, including graph totals, URL coverage, duplicate URL groups, rich snippet candidate counts, graph topology, and URL-rooted schema compliance.
- `payload` writes the numeric-only WordLift API snapshot payload for the selected date.
- `push` calculates the snapshot, resolves the selected account from the active profile API key, and uploads the dated snapshot to the WordLift API.
- `--snapshot-date` must use `YYYY-MM-DD`; when omitted, the current UTC date is used.
- `--website-host` scopes website URL coverage and duplicate URL KPIs to the customer website host.
- `--graph-host` marks graph dataset hosts as internal when computing broken internal edges; repeat it for multiple hosts.
- `--depth` controls subgraph expansion for URL-level SHACL compliance. The default is `1`.
- `--issue-level warning|error` controls whether warnings count as compliance failures. The default is `warning`.
- `--no-builtin-shapes` runs only shapes passed with `--shape`, useful for fast scheduled KPI gates.
- `--shacl-workers` parallelizes URL-level SHACL validation.
- `--memory-mode auto|full|streaming` controls graph KPI memory behavior. `auto` uses full mode for files up to `--max-full-graph-bytes`, then uses streaming partial mode for large N-Triples, Turtle, and RDF/XML files.
- `--max-full-graph-bytes` defaults to `268435456`; large Turtle and RDF/XML files are converted to temporary N-Triples before streaming partial KPIs.
- `--output` writes the API payload for `payload` and `push`; it writes the detailed KPI JSON for `calculate`.
- `--details-output` on `push` writes the detailed KPI JSON from the same calculation used for upload.

## Examples
- `worai --profile acme graph kpis calculate ./acme-export.ttl --website-host www.example.com --output graph-kpis.json`
- `worai --profile acme graph kpis payload ./acme-export.ttl --snapshot-date 2026-06-29 --website-host www.example.com --output graph-kpi-payload.json`
- `worai --profile acme graph kpis push ./acme-export.ttl --snapshot-date 2026-06-29 --website-host www.example.com --shacl-workers 4 --output graph-kpi-payload.json --details-output graph-kpis.json`
- `worai --profile acme graph kpis push ./acme-export.ttl --snapshot-date 2026-06-29 --website-host www.example.com --no-builtin-shapes --shape profiles/_base/shapes/graph-kpis-url-roots.shacl.ttl --output graph-kpi-payload.json --details-output graph-kpis.json`
