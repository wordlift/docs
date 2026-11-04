#!/bin/sh
# Stores the licensed Denim INK webfont as repository secrets so production
# builds can include it without committing the file to this public repository.
#
# A secret holds at most 48 KB, so the base64 text is split into three parts.
# Run once, by a repository admin, with the WOFF2 file from the Displaay order:
#
#   scripts/set-denim-ink-secrets.sh /path/to/DenimINK-Regular.woff2
#
# The font file and the secret values are never printed.

set -eu

FONT="${1:?usage: $0 /path/to/DenimINK-Regular.woff2}"
REPO="${REPO:-wordlift/docs}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

base64 < "$FONT" | tr -d '\n' > "$TMP/font.b64"
split -n 3 "$TMP/font.b64" "$TMP/part." 2>/dev/null || {
    size=$(wc -c < "$TMP/font.b64")
    chunk=$(( (size + 2) / 3 ))
    split -b "$chunk" "$TMP/font.b64" "$TMP/part."
}

i=1
for part in "$TMP"/part.*; do
    gh secret set "DENIM_INK_WOFF2_PART_$i" --repo "$REPO" < "$part"
    i=$((i + 1))
done
echo "Stored Denim INK in $((i - 1)) secrets on $REPO."
