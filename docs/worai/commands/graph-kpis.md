# graph kpis

Calculate graph KPI snapshots from a local RDF export and generate WordLift API payloads.

## Usage
- `worai graph kpis calculate <file> [--website-host <host>] [--graph-host <host>] [--builtin-shape <name>] [--exclude-builtin-shape <name>] [--shape <file>] [--no-builtin-shapes] [--depth <n>] [--issue-level warning|error] [--shacl-workers <n>] [--memory-mode auto|full|streaming] [--max-full-graph-bytes <bytes>] [--rdf-error-policy fail|repair-iris] [--output <file>]`
- `worai graph kpis payload <file> [--snapshot-date YYYY-MM-DD] [--website-host <host>] [--memory-mode auto|full|streaming] [--max-full-graph-bytes <bytes>] [--rdf-error-policy fail|repair-iris] [--output <file>]`

## Notes
- Requires `wordlift-sdk>=8.3.6`.
- `<file>` accepts any graph format supported by the SDK graph loader, including Turtle and JSON-LD.
- `calculate` writes the detailed KPI JSON, including graph totals, URL coverage, duplicate URL groups, rich snippet candidate counts, graph topology, and URL-rooted schema compliance.
- `payload` writes the numeric-only WordLift API snapshot payload for the selected date.
- `--snapshot-date` must use `YYYY-MM-DD`; when omitted, the current UTC date is used.
- `--website-host` scopes website URL coverage and duplicate URL KPIs to the customer website host.
- `--graph-host` marks graph dataset hosts as internal when computing broken internal edges; repeat it for multiple hosts.
- `--depth` controls subgraph expansion for URL-level SHACL compliance. The default is `1`.
- `--issue-level warning|error` controls whether warnings count as compliance failures. The default is `warning`.
- `--no-builtin-shapes` runs only shapes passed with `--shape`, useful for fast scheduled KPI gates.
- `--shacl-workers` parallelizes URL-level SHACL validation.
- `--memory-mode auto|full|streaming` controls graph KPI memory behavior. `auto` uses full mode for files up to `--max-full-graph-bytes`, then uses streaming partial mode for large N-Triples, Turtle, and RDF/XML files.
- `--max-full-graph-bytes` defaults to `268435456`; large Turtle and RDF/XML files are converted to temporary N-Triples before streaming partial KPIs.
- `--rdf-error-policy fail|repair-iris` controls RDF parser recovery. The default `fail` keeps strict parsing; `repair-iris` only repairs invalid percent escapes inside Turtle IRI tokens before temporary N-Triples conversion.
- `--output` writes the API payload for `payload`; it writes the detailed KPI JSON for `calculate`.

## Examples
- `worai --profile acme graph kpis calculate ./acme-export.ttl --website-host www.example.com --output graph-kpis.json`
- `worai --profile acme graph kpis payload ./acme-export.ttl --snapshot-date 2026-06-29 --website-host www.example.com --output graph-kpi-payload.json`
