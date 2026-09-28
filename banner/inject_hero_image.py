#!/usr/bin/env python3
"""ينسخ صورة الهيرو (base64) من الكود القديم إلى الكود الجديد.

يستخرج قيمة src لأول وسم <img> في "Old html.txt"، ويضعها مكان
src="HERO_IMAGE" في nks-training-banner.html، ويحفظ الناتج في final.html.
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
OLD = HERE / "Old html.txt"
NEW = HERE / "nks-training-banner.html"
OUT = HERE / "final.html"
PLACEHOLDER = 'src="HERO_IMAGE"'

old_html = OLD.read_text(encoding="utf-8")
new_html = NEW.read_text(encoding="utf-8")

img = re.search(r"<img\b[^>]*?\bsrc\s*=\s*([\"'])(.*?)\1", old_html, re.S | re.I)
if not img:
    sys.exit("لم يُعثر على وسم <img> له src في الملف القديم")
src = img.group(2).strip()
if not src.startswith("data:image"):
    sys.exit("قيمة src لأول <img> لا تبدأ بـ data:image")

count = new_html.count(PLACEHOLDER)
if count != 1:
    sys.exit(f"متوقع وجود {PLACEHOLDER} مرة واحدة، وُجد {count}")

# استبدال نصي مباشر فقط؛ باقي الملف يبقى كما هو حرفيًا
OUT.write_text(new_html.replace(PLACEHOLDER, f'src="{src}"'), encoding="utf-8", newline="")

print(f"src length: {len(src):,} chars ({src.split(',', 1)[0]})")
print(f"old: {OLD.stat().st_size:,} bytes | new: {NEW.stat().st_size:,} bytes | final: {OUT.stat().st_size:,} bytes")
