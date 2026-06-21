#!/usr/bin/env python3
"""Verify v28.1 product naming across public site files and current docs."""

from __future__ import annotations

import argparse
from pathlib import Path


FORBIDDEN_TERMS = [
    "港九大本硕连读精英" + "保" + "送计划",
    "港九大本碩連讀精英" + "保" + "送計劃",
    "保" + "送计划",
    "保" + "送計劃",
    "保" + "送",
    "Elite " + "Guaranteed",
    "Guaranteed " + "Admission",
    "Hong Kong top-nine undergraduate-to-master's elite progression plan",
    "Hong Kong top-nine undergraduate-to-master's progression",
]

REQUIRED_SITE_TERMS = [
    "港九大本硕连读精英规划计划",
    "港九大本碩連讀精英規劃計劃",
    "Hong Kong Nine Universities Bachelor–Master Elite Planning Programme",
    "本计划以长期学术规划、过程管理和申请支持为核心，不构成任何院校录取承诺；具体服务与责任边界以正式协议为准。",
]

REQUIRED_DOC_TERMS = [
    "港九大本硕连读精英规划计划",
]

PUBLIC_SUFFIXES = {".html", ".js", ".xml", ".webmanifest", ".txt"}
DOC_PATHS = [
    Path("README.md"),
    Path("docs/WEBSITE_STATUS.md"),
    Path("docs/CODEX_HANDOFF.md"),
    Path("docs/RAIN_EDUCATION_MASTER_CONTEXT.md"),
    Path("docs/WEBSITE_DESIGN_RULES.md"),
]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def site_files(site_dir: Path) -> list[Path]:
    return sorted(
        path for path in site_dir.rglob("*")
        if path.is_file() and path.suffix in PUBLIC_SUFFIXES
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("repo_dir", type=Path)
    parser.add_argument("site_dir", type=Path)
    args = parser.parse_args()

    failures: list[str] = []
    public_text = "\n".join(read_text(path) for path in site_files(args.site_dir))
    docs_text = "\n".join(read_text(args.repo_dir / path) for path in DOC_PATHS)

    for term in REQUIRED_SITE_TERMS:
        if term not in public_text:
            failures.append(f"Required v28.1 public product term missing: {term}")

    for term in REQUIRED_DOC_TERMS:
        if term not in docs_text:
            failures.append(f"Required v28.1 docs product term missing: {term}")

    for term in FORBIDDEN_TERMS:
        if term in public_text:
            failures.append(f"Forbidden product naming term remains in current public site files: {term}")
        if term in docs_text:
            failures.append(f"Forbidden product naming term remains in current docs: {term}")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("v28.1 product naming checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
