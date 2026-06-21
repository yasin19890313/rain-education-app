#!/usr/bin/env python3
"""Verify v28.1 final credibility cleanup."""

from __future__ import annotations

import argparse
from pathlib import Path


def text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def term(*parts: str) -> str:
    return "".join(parts)


PUBLIC_FORBIDDEN = [
    term("详细样本范围与统计周期", "待", "内部确认后补充公开说明。"),
    term("待", "内部确认"),
    term("以下反馈", "需"),
    term("每一次 ", "升学选择"),
    term("admission ", "offer"),
    term("unconditional ", "offer"),
    term("查看 ", "Offer"),
    term("Offer ", "与入学规划"),
    term("不只展示 ", "Offer"),
    term("Dr.", " Olivia Zhang"),
    term("PhD Mathematics", ", University of Cambridge"),
    term("former ", "STEP"),
]

SCRIPT_FORBIDDEN = [
    term("以下反馈", "需"),
    term("Offer ", "与入学规划"),
    term("查看 ", "Offer"),
    term("不只展示 ", "Offer"),
]

REQUIRED_PUBLIC = [
    "以长期规划，管理每一次升学选择",
    "录取与入学规划",
    "不只展示录取结果，更展示规划如何改变申请路径",
    "查看录取案例库",
    "获得香港科技大学商业分析硕士录取",
    "获得 UCL 心理学与教育学本科课程无条件录取",
]

REQUIRED_SCRIPT = [
    '"录取与入学规划"',
    '"不只展示录取结果，更展示规划如何改变申请路径"',
    '"查看录取案例库"',
    '"获得香港科技大学商业分析硕士录取。"',
    '"获得 UCL 心理学与教育学本科课程无条件录取。"',
]

TABLE_FORBIDDEN = [
    term("Oxford PhD ", "Offer"),
    term("HKUST PhD ", "student"),
    term("former ", "STEP"),
    "Dr. 头衔",
    "PhD 学位",
    "待用户确认",
]


def mentor_table(markdown: str) -> str:
    start = markdown.index("## 导师资历核验表")
    end = markdown.index("## 导师图片使用表")
    return markdown[start:end]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("site_dir", type=Path)
    args = parser.parse_args()

    index = text(args.site_dir / "index.html")
    script = text(args.site_dir / "script.js")
    review_tables = text(args.site_dir / "v28-review-tables.md")
    failures: list[str] = []

    for forbidden in PUBLIC_FORBIDDEN:
        if forbidden in index:
            failures.append(f"Forbidden public text remains: {forbidden}")

    for required in REQUIRED_PUBLIC:
        if required not in index:
            failures.append(f"Required public replacement missing: {required}")

    if 'href="#testimonials"' in index:
        failures.append("Testimonials section navigation should be removed")
    if 'id="testimonials"' in index:
        failures.append("Testimonials section should be fully hidden from public page")
    if "v28-pending-feedback" in index:
        failures.append("Testimonials placeholder should not remain in public page")

    for forbidden in SCRIPT_FORBIDDEN:
        if forbidden in script:
            failures.append(f"Forbidden language-map text remains: {forbidden}")
    for required in REQUIRED_SCRIPT:
        if required not in script:
            failures.append(f"Required language-map replacement missing: {required}")

    table = mentor_table(review_tables)
    for forbidden in TABLE_FORBIDDEN:
        if forbidden in table:
            failures.append(f"Mentor review table still exposes non-conservative credential wording: {forbidden}")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("v28.1 final credibility cleanup checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
