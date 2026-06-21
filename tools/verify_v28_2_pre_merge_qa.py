#!/usr/bin/env python3
"""Verify v28.2 pre-merge QA requirements."""

from __future__ import annotations

import argparse
import re
from html.parser import HTMLParser
from pathlib import Path


EXPECTED_MENTOR_CREDENTIALS = {
    "Alison Ballance": "Goldsmiths University of London 艺术学习背景",
    "Bodan Ding": "Imperial College London 数学方向背景",
    "Minting Luo": "HKU 应用人工智能学习背景",
    "Qi Miao": "HKUST 生物信息学方向",
    "Ruiyi Ren": "The University of Hong Kong 经济与中文背景",
    "Xiaoyu Sun": "Imperial College London 物理方向背景",
    "Wenhuai Wu": "University of Cambridge 数学方向",
    "Olivia Zhang": "Yale University 教育研究方向",
    "Sophia Chen": "UCLA 高等教育方向背景",
}

DOC_REQUIRED = [
    "当前正式开发版本",
    "v28.2 Parent-facing Copy & Credibility Release Candidate",
    "来源审核分支",
    "review/v28-parent-facing-copy-polish",
    "合并来源 commit",
    "0d116f8c8a4b5066eff38a09dee7cc4b43de446a",
    "当前尚未部署",
]

LANGUAGE_MAP_REQUIRED = [
    "香港总部",
    "规划案例 · HK Associate Pathway",
    "录取案例 · HKUST Business Analytics",
    "录取案例 · UCL Psychology",
    "规划案例 · Low GPA Recovery",
    "擅长：环境毒理、生物信息、科研写作、课程规划",
    "辅导方向：副学士/本科 GPA 管理、理科升学与学术沟通",
    "擅长：物理、数学分析、机器学习、计算物理",
    "辅导方向：A-Level Physics、G5 申请、科研与 GPA 规划",
    "擅长：副学士升本科、GPA 恢复、课程规划、家庭咨询沟通",
    "辅导方向：香港本科衔接、研究生申请、跨地区升学路径规划",
]


def term(*parts: str) -> str:
    return "".join(parts)


FORBIDDEN_PUBLIC_MENTOR_CREDENTIALS = [
    term("M", "FA, Goldsmiths"),
    term("M", "Sc, Imperial College London"),
    term("M", "Sc Applied Artificial Intelligence"),
    term("B", "A, The University of Hong Kong"),
    term("B", "Sc Physics"),
    term("M.", "Ed. Higher Education"),
    term("Dr.", " Olivia Zhang"),
    term("Ph", "D"),
    term("Offer"),
    term("former ", "STEP"),
]


class MentorParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.cards: list[dict[str, str]] = []
        self._in_card = False
        self._depth = 0
        self._in_h3 = False
        self._capture_p = False
        self._name = ""
        self._credential = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = {key: value or "" for key, value in attrs}
        classes = attrs_dict.get("class", "").split()
        if tag == "article" and "mentor-card" in classes:
            self._in_card = True
            self._depth = 1
            self._name = ""
            self._credential = ""
            return
        if not self._in_card:
            return
        if tag not in {"br", "img", "input", "meta", "link", "source"}:
            self._depth += 1
        if tag == "h3":
            self._in_h3 = True
        elif tag == "p" and not self._credential:
            self._capture_p = True

    def handle_endtag(self, tag: str) -> None:
        if not self._in_card:
            return
        if tag == "h3":
            self._in_h3 = False
        elif tag == "p":
            self._capture_p = False
        self._depth -= 1
        if self._depth == 0:
            self.cards.append({
                "name": " ".join(self._name.split()),
                "credential": " ".join(self._credential.split()),
            })
            self._in_card = False

    def handle_data(self, data: str) -> None:
        if self._in_h3:
            self._name += data
        elif self._capture_p:
            self._credential += data


def text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def rule_block(css: str, selector: str) -> str:
    match = re.search(rf"{re.escape(selector)}\s*\{{([^}}]+)\}}", css, re.S)
    return match.group(1) if match else ""


def mentor_section(index: str) -> str:
    start = index.index('id="mentor-team"')
    end = index.index('id="faq"', start)
    return index[start:end]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("repo_dir", type=Path)
    parser.add_argument("site_dir", type=Path)
    args = parser.parse_args()

    index = text(args.site_dir / "index.html")
    css = text(args.site_dir / "styles.css")
    script = text(args.site_dir / "script.js")
    review_tables = text(args.site_dir / "v28-review-tables.md")
    failures: list[str] = []

    new_title_text = "先评估学生起点，再设计可执行的升学路径"
    old_title_text = "先看清学生条件，再设计可执行的升学路径"
    if old_title_text in index or old_title_text in script or old_title_text in review_tables:
        failures.append("Old Trust Metrics title remains")
    if new_title_text not in index.replace('<span class="no-break">', "").replace("</span>", ""):
        failures.append("New Trust Metrics title missing")
    if '<span class="no-break">升学路径</span>' not in index:
        failures.append("The phrase 升学路径 should be protected with a no-break span")
    if "white-space: nowrap" not in rule_block(css, ".no-break"):
        failures.append(".no-break should prevent line breaks inside 升学路径")
    if "先评估学生起点，再设计可执行的" not in script or '"升学路径"' not in script:
        failures.append("Language map should support the split no-break Trust Metrics title")
    for required_language_key in LANGUAGE_MAP_REQUIRED:
        if required_language_key not in script:
            failures.append(f"Language map missing public text key: {required_language_key}")

    enquire_copy = rule_block(css, ".v26-enquire-copy")
    scan_card = rule_block(css, ".scan-card")
    if "#0" not in enquire_copy and "var(--navy)" not in enquire_copy:
        failures.append("Enquire left information area should have an explicit dark blue background")
    if "color: #fff" not in enquire_copy and "color: white" not in enquire_copy:
        failures.append("Enquire left information area should set high-contrast light text")
    if "background: #fff" not in scan_card:
        failures.append("QR scan cards should use a white independent card background")

    parser_obj = MentorParser()
    parser_obj.feed(index)
    found_credentials = {card["name"]: card["credential"] for card in parser_obj.cards}
    if found_credentials != EXPECTED_MENTOR_CREDENTIALS:
        failures.append(f"Mentor public credentials mismatch: {found_credentials}")
    if len(found_credentials) != 9:
        failures.append(f"Expected 9 mentors, found {len(found_credentials)}")
    section = mentor_section(index)
    for forbidden in FORBIDDEN_PUBLIC_MENTOR_CREDENTIALS:
        if forbidden in section:
            failures.append(f"Unconfirmed mentor credential remains in public card: {forbidden}")

    for required in EXPECTED_MENTOR_CREDENTIALS.values():
        if required not in script:
            failures.append(f"Language map missing mentor credential: {required}")

    docs = {
        "README.md": text(args.repo_dir / "README.md"),
        "docs/WEBSITE_STATUS.md": text(args.repo_dir / "docs/WEBSITE_STATUS.md"),
        "docs/CODEX_HANDOFF.md": text(args.repo_dir / "docs/CODEX_HANDOFF.md"),
    }
    for name, doc in docs.items():
        for required in DOC_REQUIRED:
            if required not in doc:
                failures.append(f"{name} missing review status text: {required}")
        if "当前最新版本是 **v26" in doc or "## 2. 当前最新官网版本" in doc:
            failures.append(f"{name} still frames v26 as the only latest state")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("v28.2 pre-merge QA checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
