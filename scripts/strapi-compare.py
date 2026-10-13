"""
Compare Strapi article data between a backup of the v4 API response and a running Strapi (v4 or v5).

Used to prove a Strapi upgrade did not lose or change content: every article is matched by slug and
title, description, content (SHA-256), publish date, categories, cover image and en/vi localization
links are compared.

Usage:
    python scripts/strapi-compare.py http://127.0.0.1:1338 D:/work/backups/articles-20261013
The backup folder must contain articles-en.json and articles-vi.json (raw v4 responses saved with
populate=*). Exit code 1 if anything differs.
"""
import hashlib
import json
import sys
import urllib.request

base = sys.argv[1].rstrip("/")
backup = sys.argv[2].rstrip("/")


def get(url):
    return json.load(urllib.request.urlopen(url, timeout=30))


def digest(text):
    return hashlib.sha256((text or "").encode("utf-8")).hexdigest()[:12]


def v4_names(entry):
    return sorted(c["attributes"]["name"] for c in (entry.get("categories", {}).get("data") or []))


def image(entry):
    return ((entry.get("image", {}).get("data") or {}).get("attributes") or {})

query = (
    "populate[image]=true&populate[categories]=true&populate[localizations]=true"
    "&pagination[pageSize]=100&sort=publish_date:desc"
)

all_ok = True
total = 0
for locale in ("en", "vi"):
    old = json.load(open(f"{backup}/articles-{locale}.json", encoding="utf-8"))["data"]
    new = get(f"{base}/api/articles?locale={locale}&{query}")["data"]
    print(f"== {locale}: backup={len(old)} articles, live={len(new)} articles")
    if len(old) != len(new):
        all_ok = False
    by_slug = {a.get("slug") or a.get("attributes", {}).get("slug"): a for a in new}
    for entry in old:
        a = entry["attributes"]
        slug = a["slug"]
        b = by_slug.get(slug)
        if b is None:
            print("  MISSING:", slug)
            all_ok = False
            continue
        b = b.get("attributes", b)  # v4 live responses are nested, v5 are flat
        b_cats = sorted(c.get("name") or c["attributes"]["name"] for c in (b.get("categories") or {}).get("data", b.get("categories")) or [])
        b_img = b.get("image") or {}
        b_img = b_img.get("data", {}).get("attributes", {}) if "data" in b_img else b_img
        b_loc = b.get("localizations") or []
        b_loc = b_loc.get("data", []) if isinstance(b_loc, dict) else b_loc
        checks = {
            "title": a["title"] == b["title"],
            "description": (a.get("description") or "") == (b.get("description") or ""),
            "content": digest(a["content"]) == digest(b["content"]),
            "publish_date": str(a.get("publish_date")) == str(b.get("publish_date")),
            "categories": v4_names(a) == b_cats,
            "image": image(a).get("name") == b_img.get("name") and image(a).get("url") == b_img.get("url"),
            "localizations": sorted(x["attributes"]["slug"] for x in (a.get("localizations", {}).get("data") or []))
            == sorted((x.get("attributes", x)).get("slug") for x in b_loc),
        }
        bad = [k for k, ok in checks.items() if not ok]
        total += len(checks)
        print(f"  {'OK  ' if not bad else 'DIFF'} {slug[:52]:52} content={digest(b['content'])}" + (f" -> {', '.join(bad)}" if bad else ""))
        all_ok = all_ok and not bad

print("\nRESULT:", "ALL FIELDS MATCH" if all_ok else "DIFFERENCES FOUND", f"({total} field checks)")
sys.exit(0 if all_ok else 1)
