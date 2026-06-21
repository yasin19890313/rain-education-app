#!/usr/bin/env python3
"""Verify the v27 review scope: Hero background and homepage mentor team."""

from __future__ import annotations

import argparse
import re
from html.parser import HTMLParser
from pathlib import Path


EXPECTED_MENTORS = [
    "Alison Ballance",
    "Bodan Ding",
    "Minting Luo",
    "Qi Miao",
    "Ruiyi Ren",
    "Xiaoyu Sun",
    "Wenhuai Wu",
    "Dr. Olivia Zhang",
    "Sophia Chen",
]

VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class MentorCardParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.cards: list[dict[str, str]] = []
        self._in_card = False
        self._depth = 0
        self._in_h3 = False
        self._in_degree = False
        self._current: dict[str, str] = {}
        self._h3 = ""
        self._degree = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = {key: value or "" for key, value in attrs}
        classes = attrs_dict.get("class", "").split()
        if tag == "article" and "mentor-card" in classes:
            self._in_card = True
            self._depth = 1
            self._current = {"class": attrs_dict.get("class", ""), "category": attrs_dict.get("data-mentor-category", "")}
            self._h3 = ""
            self._degree = ""
            return
        if not self._in_card:
            return
        if tag not in VOID_TAGS:
            self._depth += 1
        if tag == "h3":
            self._in_h3 = True
        elif tag == "p" and not self._degree:
            self._in_degree = True
        elif tag == "img" and not self._current.get("src"):
            self._current["src"] = attrs_dict.get("src", "")
            self._current["alt"] = attrs_dict.get("alt", "")

    def handle_endtag(self, tag: str) -> None:
        if not self._in_card:
            return
        if tag == "h3":
            self._in_h3 = False
        elif tag == "p":
            self._in_degree = False
        self._depth -= 1
        if self._depth == 0:
            self._current["name"] = " ".join(self._h3.split())
            self._current["degree"] = " ".join(self._degree.split())
            self.cards.append(self._current)
            self._in_card = False

    def handle_data(self, data: str) -> None:
        if self._in_h3:
            self._h3 += data
        elif self._in_degree:
            self._degree += data


def rule_block(css: str, selector: str) -> str:
    match = re.search(rf"{re.escape(selector)}\s*\{{([^}}]+)\}}", css, re.S)
    return match.group(1) if match else ""


def require(condition: bool, message: str, failures: list[str]) -> None:
    if not condition:
        failures.append(message)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("site_dir", type=Path)
    args = parser.parse_args()

    index = (args.site_dir / "index.html").read_text(encoding="utf-8")
    css = (args.site_dir / "styles.css").read_text(encoding="utf-8")
    failures: list[str] = []

    require("hero-academic-advisory-pexels-5311406" not in index + css, "Hero must not reference the rejected academic advisory stock image", failures)
    require("bg-hong-kong-clear-v10.webp" in index, "Hero preload / metadata should use the v26 Hong Kong image", failures)
    hero_block = rule_block(css, ".v26-hero-banner")
    overlay_block = rule_block(css, ".v26-hero-overlay")
    require('url("assets/bg-hong-kong-clear-v10.webp")' in hero_block, "Hero CSS should use the v26 Hong Kong harbour asset", failures)
    require("background-size: cover" in hero_block, "Hero should use background-size: cover", failures)
    require("background-position: center" in hero_block, "Hero should use background-position: center", failures)
    require("0.5" not in overlay_block and "0.6" not in overlay_block and "0.7" not in overlay_block, "Hero overlay should not exceed the requested 35%-50% range", failures)

    mentor_parser = MentorCardParser()
    mentor_parser.feed(index)
    names = [card["name"] for card in mentor_parser.cards]
    require(len(mentor_parser.cards) == 9, f"Expected 9 homepage mentor cards, found {len(mentor_parser.cards)}: {names}", failures)
    require(names == EXPECTED_MENTORS, f"Mentor order/names should match v24 complete set: {names}", failures)
    for card in mentor_parser.cards:
        require(card.get("src"), f"{card.get('name', 'mentor')} should have an image src", failures)
        require((args.site_dir / card.get("src", "")).exists(), f"{card.get('name', 'mentor')} image file missing: {card.get('src')}", failures)
        require(card.get("degree"), f"{card.get('name', 'mentor')} should retain degree/background text", failures)

    photo_block = rule_block(css, ".mentor-photo")
    photo_img_block = rule_block(css, ".mentor-photo img")
    require("aspect-ratio: 4 / 5" in photo_block or "aspect-ratio: 3 / 4" in photo_block, "Mentor photo container should use a vertical ratio", failures)
    require("aspect-ratio: 4 / 3" not in photo_block, "Mentor photo container must not use horizontal 4:3 ratio", failures)
    require("object-position: center top" not in photo_img_block, "Mentor images must not all share one forced object-position", failures)
    for slug in [
        "wenhuai-wu",
        "bodan-ding",
        "minting-luo",
        "qi-miao",
        "ruiyi-ren",
        "xiaoyu-sun",
        "alison-ballance",
        "olivia-zhang",
        "sophia-chen",
    ]:
        require(f"mentor-photo--{slug}" in index, f"Missing per-mentor photo class for {slug}", failures)
        require(f".mentor-photo--{slug} img" in css, f"Missing per-mentor photo CSS for {slug}", failures)

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print("v27 hero and mentors checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
