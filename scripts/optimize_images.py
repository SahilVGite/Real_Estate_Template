"""Convert reference images in /samples into optimised, descriptively named
WebP files in /public/images. Re-run with: npm run optimize-images"""
import os
from PIL import Image

SRC = "samples"
OUT = "public/images"

# source filename -> (output name, mode)
# mode: "photo" = flatten onto white & crop rounded corners, "cutout" = keep alpha
MAP = {
    "Frame 134.png": ("hero-villa-pool", "photo"),
    "hero image 1.png": ("cutout-modern-villa", "cutout"),
    "3d-rendering-isometric-fdgdf 1.png": ("cutout-isometric-white", "cutout"),
    "Final ii 1.png": ("cutout-isometric-dark", "cutout"),
    "Frame 133 (2).png": ("architecture-facade-wide", "photo"),
    "Frame 133.png": ("architecture-facade", "photo"),
    "Frame 133 (1).png": ("office-team", "photo"),
    "81HZb-MH.jpg.png": ("office-loft", "photo"),
    "Frame 179.png": ("interior-kitchen-open", "photo"),
    "Frame 181.png": ("interior-living-minimal", "photo"),
    "Frame 182.png": ("interior-living-wood", "photo"),
    "Frame 6.png": ("exterior-brick-modern", "photo"),
    "Frame 7.png": ("exterior-brick-window", "photo"),
    "Rectangle 1.png": ("city-glass-tower", "photo"),
    "Rectangle 2.png": ("city-skyline-blue", "photo"),
    "Rectangle 3.png": ("city-towers-lookup", "photo"),
    "Rectangle 3 (1).png": ("interior-dining-garden", "photo"),
    "Rectangle 13.png": ("banner-resort-courtyard", "photo"),
    "Rectangle 19.png": ("render-villa-orange", "photo"),
    "Rectangle 20.png": ("render-villa-terraces", "photo"),
    "Rectangle 21.png": ("render-house-blue", "photo"),
    "Rectangle 4.png": ("thumb-house-dusk", "photo"),
    "Rectangle 4 (1).png": ("thumb-house-lawn", "photo"),
    "Rectangle 4 (2).png": ("thumb-white-curves", "photo"),
    "Rectangle 4 (3).png": ("thumb-glass-house", "photo"),
    "Rectangle 4 (4).png": ("thumb-brick-timber", "photo"),
    "Rectangle 4 (5).png": ("thumb-townhouse-evening", "photo"),
    "Rectangle 52.png": ("commercial-retail", "photo"),
    "Rectangle 52 (1).png": ("exterior-beach-house", "photo"),
    "Rectangle 52 (2).png": ("exterior-apartment-block", "photo"),
    "Rectangle 52 (3).png": ("exterior-family-house", "photo"),
    "Rectangle 52 (4).png": ("aerial-coastal-community", "photo"),
    "Rectangle 52 (5).png": ("interior-duplex-living", "photo"),
    "Rectangle 52 (6).png": ("city-towers-sky", "photo"),
    "image (10) 2.png": ("exterior-villa-pool-dusk", "photo"),
    "image (21) 2.png": ("exterior-villa-pool-front", "photo"),
    "image 2.png": ("exterior-villa-pool-lawn", "photo"),
    "image (24).png": ("interior-double-height", "photo"),
    "image (26).png": ("interior-bedroom-cream", "photo"),
    "image (27).png": ("interior-bedroom-wood", "photo"),
    "luxury_and_rich_home_exterior_side_view.png": ("exterior-luxury-side", "photo"),
    "pexels-john-tekeridis-1428348.png": ("interior-living-warm", "photo"),
    "pexels-vecislavas-popa-1571468 1.png": ("interior-living-grey", "photo"),
    "pexels-vecislavas-popa-1743227.png": ("interior-dining-bright", "photo"),
    "unsplash_9rYfG8sWRVo.png": ("interior-bedroom-view", "photo"),
    "unsplash_XyGvEj587Mc.png": ("interior-lounge-wood", "photo"),
    "unsplash_hCU4fimRW-c.png": ("interior-bedroom-grey", "photo"),
    "unsplash_mGZX2MOPR-s.png": ("interior-living-stairs", "photo"),
    "unsplash_tHkJAMcO3QE.png": ("interior-living-bay", "photo"),
    **{f"team{i}.png": (f"person-{i}", "photo") for i in range(1, 9)},
}


def crop_transparent_corners(im):
    """Trim edges that contain transparent rounded corners."""
    a = im.getchannel("A")
    w, h = im.size
    inset = 0
    while inset < min(w, h) // 6:
        if a.getpixel((inset, inset)) > 200 and a.getpixel((w - 1 - inset, h - 1 - inset)) > 200:
            break
        inset += 1
    if inset:
        inset += 2
        im = im.crop((inset, inset, w - inset, h - inset))
    return im


os.makedirs(OUT, exist_ok=True)
for src, (name, mode) in MAP.items():
    im = Image.open(os.path.join(SRC, src)).convert("RGBA")
    if mode == "cutout":
        if name == "cutout-modern-villa":
            # erase a stray render artefact floating left of the building
            a = im.getchannel("A")
            a.paste(0, (0, 430, 120, 590))
            im.putalpha(a)
        im.save(os.path.join(OUT, name + ".webp"), "WEBP", quality=86, method=6)
    else:
        im = crop_transparent_corners(im)
        bg = Image.new("RGB", im.size, (255, 255, 255))
        # some sources carry a near-opaque alpha everywhere; treat it as opaque
        alpha = im.getchannel("A").point(lambda v: 255 if v > 200 else v)
        bg.paste(im.convert("RGB"), mask=alpha)
        bg.save(os.path.join(OUT, name + ".webp"), "WEBP", quality=84, method=6)
    print(f"{src:45s} -> {name}.webp {im.size}")
