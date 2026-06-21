#!/usr/bin/env python3
"""Verify v28 parent-facing copy, credibility boundaries, and mentor presentation."""

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
    "Olivia Zhang",
    "Sophia Chen",
]

REQUIRED_COPY = [
    "先看清学生条件，再设计可执行的升学路径",
    "真正有效的升学规划，始于准确判断，成于持续管理",
    "家长沟通与决策支持",
    "如何在专业选择、院校梯度、材料与面试之间建立更匹配学生背景的申请组合",
    "关于香港升学，家长最常问的五个问题",
    "由升学顾问与学科导师共同支持每一条升学路径",
    "提交学生基本情况，获取初步升学评估",
    "录取案例",
    "规划案例",
    "阶段成果",
    "本计划以长期学术规划、过程管理和申请支持为核心，不构成任何院校录取承诺；具体服务与责任边界以正式协议为准。",
    "阶段规划、GPA 管理、背景提升、本科及研究生衔接、家长阶段复盘。",
]

FORBIDDEN_COPY = [
    "以结果为目标，以路径管理",
    "高端教育咨询的核心，是判断力与持续管理",
    "家庭陪跑",
    "建立胜率更高的组合",
    "家长最关心的问题，需要被直接、克制、专业地回答",
    "不是头像墙，而是与升学方案同步工作的学术支持网络",
    "把学生情况发给我们，先做一次初步升学判断",
    "Rain 支持",
    "所有保障、退款与责任边界均以正式协议为准。",
    "进入可持续管理的本科衔接路径",
    "former STEP marker",
    "Oxford PhD Offer",
    "PhD Bioinformatics, HKUST",
    "Ph.D. Education Studies, Yale University",
    "Art Portfolio",
    "Fine Art",
    "GPA Planning",
    "AI Education",
    "EdTech",
    "Bioinformatics",
    "Scientific Writing",
    "Business</span>",
    "Humanities",
    "Global Admissions",
    "Academic Planning",
    "Associate Transfer",
    "Student Mentoring",
    "Goldsmiths MFA Distinction background",
    "Academic background across HKU",
    "HKU AI education specialist",
    "HKUST PhD student",
    "HKU Economics and Chinese Language background",
    "Imperial physics graduate",
    "Cambridge mathematics scholar",
    "International education strategist",
    "International education consultant",
    "顾问不是只告诉我们可以申请哪些学校",
    "GPA 管理让我知道每一门课",
    "文书修改不是换漂亮句子",
    "家长沟通很重要。",
]


VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class CardParser(HTMLParser):
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
            self._current = {"class": attrs_dict.get("class", "")}
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
            self._current["loading"] = attrs_dict.get("loading", "")

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
    script = (args.site_dir / "script.js").read_text(encoding="utf-8")
    failures: list[str] = []

    require('url("assets/bg-hong-kong-clear-v10.webp")' in rule_block(css, ".v26-hero-banner"), "Hero should remain on the v26 Hong Kong image", failures)
    require("hero-academic-advisory-pexels-5311406" not in index + css, "Rejected academic hero image must remain absent", failures)

    for text in REQUIRED_COPY:
      require(text in index, f"Required public copy missing: {text}", failures)
    for text in FORBIDDEN_COPY:
      require(text not in index, f"Forbidden or unverified public copy still present: {text}", failures)

    for number in ["15年+", "5000+", "92%", "100%", "31%"]:
      require(number in index, f"Metric number changed or missing: {number}", failures)

    card_parser = CardParser()
    card_parser.feed(index)
    names = [card["name"] for card in card_parser.cards]
    require(names == EXPECTED_MENTORS, f"Expected 9 mentors in approved order/names, found {names}", failures)
    for card in card_parser.cards:
      require(card.get("loading") == "lazy", f"{card.get('name')} photo should use loading=lazy", failures)
      require(card.get("degree"), f"{card.get('name')} should retain a background line", failures)

    photo_block = rule_block(css, ".mentor-photo")
    photo_img_block = rule_block(css, ".mentor-photo img")
    require("aspect-ratio: 4 / 5" in photo_block, "Mentor photos should stay 4:5", failures)
    require("filter:" in photo_img_block and "saturate" in photo_img_block, "Mentor photos should receive unified subtle desaturation/warm treatment", failures)
    for slug in ["alison-ballance", "bodan-ding", "minting-luo", "qi-miao", "ruiyi-ren", "xiaoyu-sun", "wenhuai-wu", "olivia-zhang", "sophia-chen"]:
      require(f".mentor-photo--{slug} img" in css, f"Missing per-mentor object-position selector: {slug}", failures)

    require('data-filter="offer-outcomes"' in index, "Case filters should include admission cases", failures)
    require('data-filter="planning-cases"' in index, "Case filters should include planning cases", failures)
    require('data-category="planning-cases' in index, "Planning case category missing", failures)
    require('data-category="offer-outcomes' in index, "Offer case category missing", failures)
    require('href="#testimonials"' not in index, "Testimonials section navigation should remain hidden", failures)
    require('id="testimonials"' not in index, "Testimonials section should remain hidden", failures)

    for text in ["先看清学生条件，再设计可执行的升学路径", "Olivia Zhang 导师照片", "Qi Miao 导师照片", "Sophia Chen 导师照片"]:
      require(text in script, f"Language map missing current public text: {text}", failures)
    require('"Rain 支持"' not in script, "Language map should not keep Rain 支持 as a current key", failures)

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print("v28 parent copy and credibility checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
