#!/usr/bin/env python3
"""Targeted fixes after the ShopMate port: variant price deltas on the PDP,
watch strap size guide, Bag wording, tech price buckets, prerender entries,
olive accent hex -> black. Run from ~/workspace/electdove."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def sub(path: Path, old: str, new: str, count: int = 0) -> None:
    text = path.read_text()
    n = text.count(old)
    if n == 0:
        if new in text:
            print(f"{path.relative_to(ROOT)}: already applied: {old[:50]!r}")
            return
        assert False, f"{path}: not found: {old[:70]!r}"
    path.write_text(text.replace(old, new) if count == 0 else text.replace(old, new, count))
    print(f"{path.relative_to(ROOT)}: replaced {n}x {old[:50]!r}")

PDP = ROOT / "src/routes/product/[id]/+page.svelte"

# --- PDP: variant-aware pricing ---
sub(PDP, "import { shop, formatDate, formatPrice } from '../../../lib/data/store.svelte';",
    "import { shop, formatDate, formatPrice, variantDelta } from '../../../lib/data/store.svelte';")
sub(PDP, "\tconst images = $derived(product?.images ?? []);",
    "\tconst images = $derived(product?.images ?? []);\n"
    "\t/** Displayed unit price: base price + selected variant's delta. */\n"
    "\tconst unitPrice = $derived(\n"
    "\t\t(product?.price ?? 0) + (product ? variantDelta(product, selectedVariant) : 0)\n"
    "\t);")
sub(PDP, "formatPrice(product.price)", "formatPrice(unitPrice)")
sub(PDP, "product.price / 6", "unitPrice / 6")
sub(PDP, "\t\t\t? product.price +\n", "\t\t\t? unitPrice +\n")

# --- PDP: watch strap size guide (replaces shoes / t-shirt guides) ---
text = PDP.read_text()
start = text.index("\t/** Size chart for products sold by size (shoes, apparel). */")
end = text.index("\n\t});", start) + len("\n\t});")
new_guide = """\t/** Size guide for the Apple Watch Ultra 2 strap (wrist sizes). */
\tconst sizeGuide = $derived.by(() => {
\t\tif (!product) return null;
\t\tif (product.id === 5)
\t\t\treturn {
\t\t\t\ttitle: 'Apple Watch Ultra 2 — strap size guide',
\t\t\t\tnote: 'Measure your wrist snugly, just above the wrist bone. Between sizes? Go a size up for comfort.',
\t\t\t\tcols: ['Strap size', 'Wrist'],
\t\t\t\trows: [
\t\t\t\t\t['S', '130–160 mm'],
\t\t\t\t\t['M', '150–185 mm'],
\t\t\t\t\t['L', '180–210 mm']
\t\t\t\t]
\t\t\t};
\t\treturn null;
\t});"""
PDP.write_text(text[:start] + new_guide + text[end:])
print(f"{PDP.relative_to(ROOT)}: size guide replaced")

# --- PDP: Bag wording + accent ---
sub(PDP, "Add to Cart", "Add to Bag")
sub(PDP, "to Cart", "to Bag")
sub(PDP, "Sticky mobile Add-to-Cart bar", "Sticky mobile Add-to-Bag bar")
sub(PDP, "accent-[#5c7038]", "accent-black")

# --- CartDrawer ---
CD = ROOT / "src/lib/components/CartDrawer.svelte"
sub(CD, "import { shop, formatPrice, FREE_SHIPPING_OVER } from '../data/store.svelte';",
    "import { shop, formatPrice, lineUnitPrice, FREE_SHIPPING_OVER } from '../data/store.svelte';")
sub(CD, "formatPrice(p.price * line.qty)", "formatPrice(lineUnitPrice(line) * line.qty)")
sub(CD, "Your Cart", "Your Bag")
sub(CD, "Your cart is empty", "Your bag is empty")
sub(CD, "View Cart", "View Bag")
sub(CD, 'aria-label="Shopping cart"', 'aria-label="Shopping bag"')
sub(CD, 'aria-label="Close cart"', 'aria-label="Close bag"')

# --- Cart page ---
CP = ROOT / "src/routes/cart/+page.svelte"
sub(CP, "import { shop, formatPrice, FREE_SHIPPING_OVER, type CartItem } from '../../lib/data/store.svelte';",
    "import { shop, formatPrice, lineUnitPrice, FREE_SHIPPING_OVER, type CartItem } from '../../lib/data/store.svelte';")
sub(CP, "{formatPrice(p.price)} each", "{formatPrice(lineUnitPrice(line))} each")
sub(CP, "formatPrice(p.price * line.qty)", "formatPrice(lineUnitPrice(line) * line.qty)")
sub(CP, "<title>Your Cart — Electdove</title>", "<title>Your Bag — Electdove</title>")
sub(CP, "Your cart is empty", "Your bag is empty")

# --- Checkout page ---
CO = ROOT / "src/routes/checkout/+page.svelte"
sub(CO, "import { shop, formatPrice, GIFT_WRAP_FEE, type Address, type SavedAddress } from '../../lib/data/store.svelte';",
    "import { shop, formatPrice, lineUnitPrice, GIFT_WRAP_FEE, type Address, type SavedAddress } from '../../lib/data/store.svelte';")
sub(CO, "{formatPrice(p.price)} × {line.qty}", "{formatPrice(lineUnitPrice(line))} × {line.qty}")
sub(CO, "formatPrice(p.price * line.qty)", "formatPrice(lineUnitPrice(line) * line.qty)")
sub(CO, "Your cart is empty. Redirecting…", "Your bag is empty. Redirecting…")
sub(CO, "accent-[#5c7038]", "accent-black")

# --- Checkout steps + bottom nav + quick view + signup accent ---
sub(ROOT / "src/lib/components/CheckoutSteps.svelte", "{ n: 1, label: 'Cart', href: '/cart' },",
    "{ n: 1, label: 'Bag', href: '/cart' },")
BN = ROOT / "src/lib/components/BottomNav.svelte"
sub(BN, 'aria-label="Open cart, {shop.cartCount} items"', 'aria-label="Open bag, {shop.cartCount} items"')
sub(BN, "\t\tCart\n", "\t\tBag\n")
sub(ROOT / "src/lib/components/QuickView.svelte", "Add to Cart", "Add to Bag")
sub(ROOT / "src/routes/signup/+page.svelte", "accent-[#5c7038]", "accent-black")

# --- Shop page: tech price buckets ---
SP = ROOT / "src/routes/shop/+page.svelte"
sub(SP, "\ttype PriceKey = 'all' | 'under25' | '25-50' | '50-100' | '100plus';",
    "\ttype PriceKey = 'all' | 'under600' | '600-900' | '900-1100' | '1100plus';")
sub(SP, """\t\t{ key: 'all', label: 'All prices' },
\t\t{ key: 'under25', label: 'Under $25' },
\t\t{ key: '25-50', label: '$25 – $50' },
\t\t{ key: '50-100', label: '$50 – $100' },
\t\t{ key: '100plus', label: '$100+' }""",
    """\t\t{ key: 'all', label: 'All prices' },
\t\t{ key: 'under600', label: 'Under $600' },
\t\t{ key: '600-900', label: '$600 – $900' },
\t\t{ key: '900-1100', label: '$900 – $1,100' },
\t\t{ key: '1100plus', label: '$1,100+' }""")
sub(SP, """\t\t\tcase 'under25':
\t\t\t\treturn p.price < 25;
\t\t\tcase '25-50':
\t\t\t\treturn p.price >= 25 && p.price <= 50;
\t\t\tcase '50-100':
\t\t\t\treturn p.price > 50 && p.price <= 100;
\t\t\tcase '100plus':
\t\t\t\treturn p.price > 100;""",
    """\t\t\tcase 'under600':
\t\t\t\treturn p.price < 600;
\t\t\tcase '600-900':
\t\t\t\treturn p.price >= 600 && p.price <= 900;
\t\t\tcase '900-1100':
\t\t\t\treturn p.price > 900 && p.price <= 1100;
\t\t\tcase '1100plus':
\t\t\t\treturn p.price > 1100;""")

# --- Prerender entries ---
sub(ROOT / "src/routes/product/[id]/+page.ts",
    "return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }];",
    "return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }];")
sub(ROOT / "src/routes/blog/[slug]/+page.ts",
    """\t\t{ slug: 'choose-right-running-shoes' },
\t\t{ slug: 'wireless-headphones-buying-guide' },
\t\t{ slug: 'capsule-wardrobe-beginners-guide' }""",
    """\t\t{ slug: 'choose-right-smartphone' },
\t\t{ slug: 'wireless-headphones-buying-guide' },
\t\t{ slug: 'smartwatch-buying-guide' }""")

print("OK")
