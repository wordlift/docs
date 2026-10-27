# validate

Deprecated JSON-LD validation commands. Prefer `worai graph validate` for RDF files/URLs.

`worai validate jsonld` is deprecated. Use `worai graph validate <file-or-url> [<file-or-url> ...]` instead. For webpage URLs, use `worai structured-data validate page`.

## Usage
- `worai validate jsonld [--list-shapes] <file.jsonld|url> [--shape <shape>] [--report-file <path>] [--format pretty|raw] [--color|--no-color]`
- `worai graph validate <file-or-url> [<file-or-url> ...] [--builtin-shape <name>] [--exclude-builtin-shape <name>] [--shape <file-or-url>] [--level warning|error] [--format text|json]`
- `worai structured-data validate page [--list-shapes] <url> [--shape <shape>] [--report-file <path>] [--format pretty|raw] [--color|--no-color]`

## Examples
- `worai validate jsonld ./data.jsonld`
- `worai graph validate ./data.jsonld --builtin-shape review-snippet --shape ./custom.ttl --level warning --format json`
- `worai validate jsonld ./data.jsonld --shape review-snippet`
- `worai validate jsonld ./data.jsonld --shape ./custom-shape.ttl --report-file ./report.txt`
- `worai validate jsonld https://api.wordlift.io/data/example.jsonld --shape review-snippet`
- `worai validate jsonld ./data.jsonld --format raw`
- `worai validate jsonld ./data.jsonld --format pretty --no-color`
- `worai validate --list-shapes`
- `worai structured-data validate page https://example.com/article --shape review-snippet`
