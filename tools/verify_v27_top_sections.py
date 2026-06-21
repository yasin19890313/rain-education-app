#!/usr/bin/env python3
"""Static checks for the v27 top-of-homepage review pass."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


FORBIDDEN_TOKENS = (
    "<video",
    "<canvas",
    "requestAnimationFrame",
    "particle",
    "map-surface",
    "global-route-animation",
    "heroPathway",
)


def require(condition: bool, message: str, failures: list[str]) -> None:
    if not condition:
        failures.append(message)


def rule_block(css: str, selector: str) -> str:
    match = re.search(rf"{re.escape(selector)}\s*\{{([^}}]+)\}}", css, re.S)
    return match.group(1) if match else ""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "site_dir",
        type=Path,
        help="Path to a Rain Education static site work directory.",
    )
    args = parser.parse_args()

    index = (args.site_dir / "index.html").read_text(encoding="utf-8")
    css = (args.site_dir / "styles.css").read_text(encoding="utf-8")
    combined = index + "\n" + css
    failures: list[str] = []

    require("20260620-v27-oxbridge-editorial-polish" in index, "cache version should identify v27", failures)
    require("assets/hero-academic-advisory-pexels-5311406.webp" in index, "hero should preload the v27 academic advisory image", failures)
    require("assets/hero-academic-advisory-pexels-5311406.webp" in css, "hero CSS should use the v27 academic advisory image", failures)
    require("utility-bar" in index, "header should include a restrained utility bar", failures)
    require("香港总部" in index and "WhatsApp" in index and "info@rainedu.hk" in index, "utility bar should include Hong Kong HQ, WhatsApp, and email", failures)

    require('"Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", serif' in css, "hero Chinese title should use the required Songti serif stack", failures)
    require('Georgia, "Times New Roman", serif' in css, "hero English title should use the required English serif stack", failures)

    hero_block = rule_block(css, ".v26-hero-banner")
    require("clamp(320px, 28vw, 360px)" in hero_block, "desktop hero height should be capped at 360px", failures)
    require("background-position" in hero_block and "center" in hero_block, "hero image should have explicit responsive positioning", failures)

    mobile_block = re.search(r"@media\s*\(max-width:\s*680px\)\s*\{(.+)\}\s*$", css, re.S)
    mobile_css = mobile_block.group(1) if mobile_block else ""
    require(".v26-hero-banner { height: clamp(250px, 70vw, 290px);" in mobile_css, "mobile hero height should stay within 250-290px", failures)
    require(".v26-hero-content h1 { font-size: clamp(2.625rem, 11vw, 3rem);" in mobile_css, "mobile hero title should stay around 42-48px", failures)

    intro_inner = rule_block(css, ".v26-introduction-inner")
    require("max-width: 960px" in intro_inner, "introduction should be centered within 960px", failures)
    require("grid-template-columns" not in intro_inner, "introduction should not keep the v26 left-title/right-button grid", failures)
    require("text-align: center" in rule_block(css, ".v26-introduction .v26-section-head"), "introduction copy should be centered", failures)

    metric_grid = rule_block(css, ".v26-metric-grid")
    metric_article = rule_block(css, ".v26-metric-grid article")
    require("gap: 0" in metric_grid, "trust metrics should be an open five-column layout without card gaps", failures)
    require("border-right" in metric_article, "trust metric items should use fine vertical dividers", failures)
    require("border: 1px solid" not in metric_article, "trust metrics should not look like SaaS cards", failures)
    require("background: transparent" in metric_article, "trust metric items should sit on an open background", failures)

    for token in FORBIDDEN_TOKENS:
        require(token not in combined, f"forbidden homepage animation/video token found: {token}", failures)

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("v27 top-section static checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
