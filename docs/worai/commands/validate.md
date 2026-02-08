# validate

Validate JSON-LD against SHACL shapes. Required properties surface as errors; recommended properties surface as warnings.

`worai validate` without a subcommand is deprecated. Use `worai validate jsonld` instead. For webpage URLs, use `worai structured-data validate page`.

## Usage
- `worai validate jsonld [--list-shapes] <file.jsonld|url> [--shape <shape>] [--report-file <path>] [--format pretty|raw] [--color|--no-color]`
- `worai structured-data validate page [--list-shapes] <url> [--shape <shape>] [--report-file <path>] [--format pretty|raw] [--color|--no-color]`

## Examples
- `worai validate jsonld ./data.jsonld`
- `worai validate jsonld ./data.jsonld --shape review-snippet`
- `worai validate jsonld ./data.jsonld --shape ./custom-shape.ttl --report-file ./report.txt`
- `worai validate jsonld https://api.wordlift.io/data/example.jsonld --shape review-snippet`
- `worai validate jsonld ./data.jsonld --format raw`
- `worai validate jsonld ./data.jsonld --format pretty --no-color`
- `worai validate --list-shapes`
- `worai structured-data validate page https://example.com/article --shape review-snippet`
