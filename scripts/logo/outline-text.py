"""
One-off helper: turn the live "Jok Holk" <text> of the logo into outlines.

The logo PDF embeds a subset of the Nasalization font. This reads that subset
(read-only, the original file is never modified), draws the glyphs with
fontTools and writes the resulting SVG path to src/assets/logo/jok-holk-text.json.
The font file itself is NOT written to the repo (only the glyph outlines of the
logo wordmark are kept).

Usage (needs `pip install fonttools`, e.g. inside a throw-away venv):
    python scripts/logo/outline-text.py "D:/logo/Vector 01.pdf" src/assets/logo/jok-holk-text.json
"""
import io
import json
import re
import sys
import zlib

from fontTools.cffLib import CFFFontSet
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

pdf_path, out_path = sys.argv[1], sys.argv[2]

# Values copied from the original SVG: <text class="cls-8" transform="translate(160.89 332.73)">
TEXT = "Jok Holk"
FONT_SIZE = 26.64
ORIGIN_X, ORIGIN_Y = 160.89, 332.73
GLYPHS = {"J": "J", "o": "o", "k": "k", " ": "space", "H": "H", "l": "l"}

data = open(pdf_path, "rb").read()
ref = re.search(rb"/FontFile3\s+(\d+)\s+0\s+R", data)
if not ref:
    raise SystemExit("No embedded CFF font found in the PDF")
obj = re.search(rb"\b" + ref.group(1) + rb"\s+0\s+obj(.*?)stream\r?\n", data, re.S)
start = obj.end()
raw = data[start : data.index(b"endstream", start)].rstrip(b"\r\n")
cff = zlib.decompress(raw) if b"FlateDecode" in obj.group(1) else raw

fontset = CFFFontSet()
fontset.decompile(io.BytesIO(cff), None)
font = fontset[fontset.fontNames[0]]
glyph_set = font.CharStrings
units = 1.0 / font.FontMatrix[0]  # 1000 units per em

scale = FONT_SIZE / units
pen = SVGPathPen(None, ntos=lambda v: ("%.3f" % v).rstrip("0").rstrip("."))
x = 0.0
for ch in TEXT:
    name = GLYPHS[ch]
    cs = glyph_set[name]
    # Flip Y (font space is y-up) and move to the text origin in SVG user space.
    tpen = TransformPen(pen, (scale, 0, 0, -scale, ORIGIN_X + x * scale, ORIGIN_Y))
    cs.draw(tpen)
    width = cs.width if getattr(cs, "width", None) is not None else 0
    x += width

result = {"d": pen.getCommands(), "advance": round(x * scale, 3), "fontSize": FONT_SIZE}
json.dump(result, open(out_path, "w"), indent=2)
print("wrote", out_path, "| path length:", len(result["d"]), "| advance:", result["advance"])
