#!/usr/bin/env python3
"""Adapt ShopMate-copied files to Electdove: brand, colours, URLs, storage keys.
Run from ~/workspace/electdove. Only touches the copied storefront files.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # ~/workspace/electdove

TARGETS = [
    ROOT / "src/lib/data/store.svelte.ts",
    ROOT / "src/lib/data/blog.ts",
    *sorted((ROOT / "src/lib/components").glob("*.svelte")),
    *sorted((ROOT / "src/routes").rglob("*.svelte")),
    *sorted((ROOT / "src/routes").rglob("*.ts")),
    ROOT / "static/sitemap.xml",
    ROOT / "static/robots.txt",
]

# Files to EXCLUDE (Electdove's own, already correct)
EXCLUDE = {
    ROOT / "src/lib/components/Header.svelte",
    ROOT / "src/lib/components/Footer.svelte",
    ROOT / "src/lib/components/ProductCard.svelte",
    ROOT / "src/routes/+page.svelte",
    ROOT / "src/routes/+layout.svelte",
    ROOT / "src/routes/+error.svelte",
    ROOT / "src/routes/+layout.ts",
}

# Ordered longest-first so compound tokens are replaced before their prefixes.
REPLACEMENTS = [
    ("shopmates.pages.dev", "electdove.pages.dev"),
    ("ShopMate", "Electdove"),
    ("shopmate", "electdove"),
    ("hover:bg-olive-dark", "hover:bg-neutral-900"),
    ("bg-olive-dark", "bg-neutral-900"),
    ("hover:bg-olive-soft", "hover:bg-neutral-100"),
    ("bg-olive-soft", "bg-neutral-100"),
    ("bg-olive-2", "bg-neutral-800"),
    ("text-olive-2", "text-neutral-800"),
    ("hover:text-olive-dark", "hover:text-neutral-800"),
    ("text-olive-dark", "text-neutral-800"),
    ("hover:text-olive", "hover:text-black"),
    ("text-olive", "text-black"),
    ("hover:bg-olive", "hover:bg-black"),
    ("bg-olive", "bg-black"),
    ("hover:border-olive", "hover:border-black"),
    ("border-olive", "border-black"),
    ("ring-olive", "ring-black"),
    ("hover:bg-cream", "hover:bg-mist"),
    ("bg-cream-2", "bg-mist"),
    ("bg-cream", "bg-mist"),
    ("bg-sand", "bg-neutral-100"),
    ("bg-[#f6f1e7]", "bg-mist"),
    ("text-cream", "text-white"),
    ("'SM' +", "'ED' +"),
]

def main() -> int:
    changed = 0
    for path in TARGETS:
        if path in EXCLUDE or not path.exists():
            continue
        text = path.read_text()
        original = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text)
            changed += 1
            print("adapted", path.relative_to(ROOT))
    print(f"{changed} files changed")
    return 0

if __name__ == "__main__":
    sys.exit(main())
