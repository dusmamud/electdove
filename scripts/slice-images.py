"""Content-aware slicer for white-background product strips.

Instead of fixed quarters (which break when the generator lays products out
at different positions/sizes), this detects each product as a cluster of
non-white columns, crops its tight bounding box, and pads it to a square
on white. Run BEFORE deleting static/raw, and eyeball the outputs first.
"""
from PIL import Image
import os, sys

raw = 'static/raw'

def load(name):
    for f in sorted(os.listdir(raw)):
        if f.startswith(name) and f.endswith('.webp'):
            return os.path.join(raw, f)
    raise FileNotFoundError(name)

def find_clusters(im, thresh=245, min_gap=40, min_width=60):
    """Return list of (x0, x1) column clusters containing non-white pixels."""
    g = im.convert('L')
    w, h = g.size
    px = g.load()
    col_has = []
    for x in range(w):
        found = False
        for y in range(0, h, 2):  # sample every 2nd row for speed
            if px[x, y] < thresh:
                found = True
                break
        col_has.append(found)
    clusters, start = [], None
    gap = 0
    for x, has in enumerate(col_has):
        if has:
            if start is None:
                start = x
            gap = 0
        else:
            if start is not None:
                gap += 1
                if gap >= min_gap:
                    if x - gap - start >= min_width:
                        clusters.append((start, x - gap))
                    start = None
                    gap = 0
    if start is not None and w - start >= min_width:
        clusters.append((start, w - 1))
    return clusters

def crop_product(im, x0, x1, pad=24, out=900):
    g = im.convert('L')
    px = g.load()
    top, bottom = None, None
    for y in range(im.size[1]):
        row_has = any(px[x, y] < 245 for x in range(x0, x1 + 1, 2))
        if row_has:
            if top is None:
                top = y
            bottom = y
    if top is None:
        raise ValueError('empty cluster')
    top = max(0, top - pad)
    bottom = min(im.size[1] - 1, bottom + pad)
    x0 = max(0, x0 - pad)
    x1 = min(im.size[0] - 1, x1 + pad)
    crop = im.crop((x0, top, x1 + 1, bottom + 1)).convert('RGB')
    # pad to square on white
    s = max(crop.size)
    canvas = Image.new('RGB', (s, s), (255, 255, 255))
    canvas.paste(crop, ((s - crop.size[0]) // 2, (s - crop.size[1]) // 2))
    return canvas.resize((out, out), Image.LANCZOS)

def slice_strip(src, names):
    im = Image.open(src).convert('RGB')
    print(src, im.size)
    clusters = find_clusters(im)
    print(' clusters:', clusters)
    if len(clusters) != len(names):
        print(f'WARNING: found {len(clusters)} clusters, expected {len(names)}')
    for (x0, x1), name in zip(clusters, names):
        out = crop_product(im, x0, x1)
        out.save(f'static/{name}.webp', 'WEBP', quality=88)
        print(' ->', name)

if __name__ == '__main__':
    slice_strip(load('media-generation-ready-to-wear-strip'),
                ['product-watch', 'product-headphones', 'product-ps5', 'product-galaxy'])
    slice_strip(load('media-generation-smartphones-strip'),
                ['phone-iphone15pro', 'phone-pixel8pro', 'phone-galaxy-s24', 'phone-iphone14'])
    print('Done. Eyeball static/*.webp BEFORE deleting static/raw.')
