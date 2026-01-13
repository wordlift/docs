# validate

Validate RDF (Turtle or JSON-LD) against SHACL shapes. Required properties surface as errors; recommended properties surface as warnings.

## Usage
- `worai validate [--list-shapes] <file.ttl|file.jsonld|url> [--shape <shape>] [--report-file <path>] [--format pretty|raw] [--color|--no-color]`

## Examples
- `worai validate ./data.jsonld`
- `worai validate ./data.jsonld --shape review-snippet`
- `worai validate ./data.jsonld --shape ./custom-shape.ttl --report-file ./report.txt`
- `worai validate https://api.wordlift.io/data/example.jsonld --shape review-snippet`
- `worai validate ./data.jsonld --format raw`
- `worai validate ./data.jsonld --format pretty --no-color`
- `worai validate --list-shapes`
