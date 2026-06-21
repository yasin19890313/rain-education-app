# Rain Education Website Archive

Rain Education 官网项目长期归档与交接仓库。

本仓库保存香港瑞恩国际教育集团有限公司（HONG KONG RAIN INTERNATIONAL EDUCATION GROUP LIMITED）官网在 2026 年 6 月 redesign 过程中的部署包、预览图、校验值和长期接力文档。

当前正式生产版本是 **v28.2 Parent-facing Copy & Credibility Production Release**。它由 `review/v28-parent-facing-copy-polish` 审核分支合并而来，来源审核 commit 为 `0d116f8c8a4b5066eff38a09dee7cc4b43de446a`。

v26 Brand Consistency & Performance 仍作为上一轮正式生产基准完整保留，归档包、预览图和文档不删除、不覆盖。v28.2 已于 2026-06-21 21:49:19 Asia/Shanghai 正式部署到 `rainedu.hk`。

## Live Site

当前线上站点：

- https://rainedu.hk/
- https://cute-vacherin-7d30d4.netlify.app/

当前线上站点已部署 v28.2。后续上线仍需先生成部署包、完成净室测试和 Draft Deploy 验收，再手动执行 Netlify production deploy。

## Technical Stack

当前项目是静态网站归档，不是 npm 构建型项目。

- HTML
- CSS
- Vanilla JavaScript
- Netlify Forms
- 静态图片、Logo、二维码、offer 图和导师图
- Python `http.server` 用于本地预览

当前没有：

- `package.json`
- Next.js
- Vite
- Tailwind
- React/Vue 组件目录
- npm build/lint/dev 脚本

## Repository Layout

```text
docs/
  RAIN_EDUCATION_MASTER_CONTEXT.md
  WEBSITE_STATUS.md
  WEBSITE_DESIGN_RULES.md
  WEBSITE_ROADMAP.md
  CODEX_HANDOFF.md

website-versions/
  archives/
    rain-education-website-v26-brand-consistency-performance-20260620.zip
  previews/
    rain-v26-brand-consistency-performance-desktop.png
    rain-v26-brand-consistency-performance-mobile.png
  SHA256SUMS.txt
  work/                     # local working copies, intentionally ignored by Git
```

## Current Production Release

- 当前正式生产版本：`v28.2 Parent-facing Copy & Credibility Production Release`
- 来源审核分支：`review/v28-parent-facing-copy-polish`
- 合并来源 commit：`0d116f8c8a4b5066eff38a09dee7cc4b43de446a`
- GitHub production commit：`ba3a3195919c81f7a38ed7e7a970fc4fed19b230`
- Archive: `website-versions/archives/rain-education-website-v28-2-parent-facing-release-candidate-20260621.zip`
- SHA256: `2f1686aeb665fbff0ea497bb7c54c81f6c646fa089fe6cf60050f6d648cb44f3`
- Desktop preview: `website-versions/previews/rain-v28-2-parent-facing-release-candidate-desktop-1440.png`
- Mobile preview: `website-versions/previews/rain-v28-2-parent-facing-release-candidate-mobile-390.png`
- Production deploy ID: `6a37ebddaf7c92d3f367c70b`
- Production deploy URL: `https://6a37ebddaf7c92d3f367c70b--cute-vacherin-7d30d4.netlify.app`
- Production domain: `https://rainedu.hk`
- Deployed at: `2026-06-21T13:49:19.223Z` (`2026-06-21 21:49:19 Asia/Shanghai`)
- Previous production deploy ID for rollback: `6a300c8d7cf9884c6836d929`

## Production Verification

v28.2 production was verified after deployment on `https://rainedu.hk/`:

- `https://rainedu.hk/` returns 200.
- `https://www.rainedu.hk/` redirects to `https://rainedu.hk/` and returns 200.
- Homepage shows the v28.2 Hong Kong Hero, not the old video homepage.
- Logo, Hero, CSS, JavaScript, mentor photos, offer images and QR codes load correctly.
- ZH-CN / ZH-HK / EN switching works.
- 9 mentors and 9 core programmes display.
- Case filtering, mentor filtering, FAQ and consultation form validation work.
- `robots.txt`, `sitemap.xml`, canonical, Open Graph and structured data are present.
- No 404, broken images or console errors were found.
- Desktop 1440px overflow check: `1440/1440`.
- Mobile 390px overflow check: `390/390`.

Rollback: keep deploy `6a300c8d7cf9884c6836d929` available in Netlify. If a severe production issue is found, use Netlify Deploys to publish that previous deploy back to production before making further changes.

## Previous Production Baseline

- Version: `v26 Brand Consistency & Performance`
- Archive: `website-versions/archives/rain-education-website-v26-brand-consistency-performance-20260620.zip`
- SHA256: `7841fd5d4d182c23bfcbd0f64d5b2b7adf05fb44a730f3e7aa35373fa55c47bc`
- Desktop preview: `website-versions/previews/rain-v26-brand-consistency-performance-desktop.png`
- Mobile preview: `website-versions/previews/rain-v26-brand-consistency-performance-mobile.png`

## Current Product Naming

The current v28.2 production release uses the confirmed product name:

- 简体：港九大本硕连读精英规划计划
- 繁体：港九大本碩連讀精英規劃計劃
- English: Hong Kong Nine Universities Bachelor–Master Elite Planning Programme

Current public pages should not use the previous wording for this product.

## Local Preview

The current v28.2 editable working copy is local-only:

```text
website-versions/work/rain-education-website-v28-parent-facing-copy-polish
```

Run it locally:

```bash
cd website-versions/work/rain-education-website-v28-parent-facing-copy-polish
python3 -m http.server 4288 --bind 0.0.0.0
```

Open:

```text
http://127.0.0.1:4288/
```

Because `website-versions/work/` is intentionally ignored by Git, GitHub readers should use the latest zip package and the docs folder as the source of truth unless they are working on the same local machine.

## Deployment

Manual Netlify deployment for future versions:

1. Use the latest zip from `website-versions/archives/`.
2. Extract it.
3. Verify the SHA256 and run a clean-room local preview from the extracted directory.
4. Create a Netlify Draft Deploy against the existing `cute-vacherin-7d30d4` site and complete browser QA.
5. Only after explicit user approval, deploy the same verified directory to production.
6. Do not create a new Netlify site unless the user explicitly asks.
7. Confirm that the zip root directly contains `index.html`, `styles.css`, `script.js`, and `assets/`.

## Documentation Index

New Codex windows and developers must read these files first:

1. `docs/RAIN_EDUCATION_MASTER_CONTEXT.md`  
   Company identity, brand positioning, fixed data, visual rules, copy direction and contact asset rules.

2. `docs/WEBSITE_STATUS.md`  
   Current technical architecture, pages, components, implemented features, known issues, command results and GitHub state.

3. `docs/WEBSITE_DESIGN_RULES.md`  
   Design rules for homepage, content, imagery, copy, mobile and forbidden directions.

4. `docs/WEBSITE_ROADMAP.md`  
   P0/P1/P2 roadmap for immediate fixes, important improvements and future enhancements.

5. `docs/CODEX_HANDOFF.md`  
   Direct handoff instructions for new Codex windows.

On the user's Mac, also read:

```text
/Users/daiyali/Desktop/Rain-Education-Codex-HANDOFF.md
```

## New Codex Handoff Prompt

Copy this into a new Codex window:

```text
请先阅读以下文件：
1. docs/RAIN_EDUCATION_MASTER_CONTEXT.md
2. docs/WEBSITE_STATUS.md
3. docs/WEBSITE_DESIGN_RULES.md
4. docs/WEBSITE_ROADMAP.md
5. docs/CODEX_HANDOFF.md

然后运行项目，检查当前官网状态，不要重写项目，不要删除已有内容，在完全理解现有进度后继续开发。
```

## GitHub Branches

- Main working archive branch: `Rain-Education-Website`
- Remote: `https://github.com/yasin19890313/rain-education-app.git`
- Previous review branch: `review/v23-premium-consulting-home`
- Default branch on remote: `main`

This project should normally continue on `Rain-Education-Website` unless the user asks for a new review branch.

## Large Archive Note

GitHub normal Git blobs have a 100MB file limit. Three historical local zip archives exceed that limit:

- `rain-education-website-v21-hero-film-upgrade-20260614.zip`
- `rain-education-website-v21-brand-intro-stats-grid-fix-20260614.zip`
- `rain-education-website-v22-final-brand-film-20260615.zip`

They remain on the user's local machine and are documented in `docs/WEBSITE_STATUS.md`. They are ignored by `.gitignore` unless Git LFS is installed and the repository is migrated intentionally.

## Version Index

| Version | Archive | Notes |
| --- | --- | --- |
| v7 | `rain-education-website-v7-polish-20260610.zip` | Early polished website package. |
| v7 library bg | `rain-education-website-v7-polish-library-bg-20260611.zip` | Library background direction. |
| v7 spacious library | `rain-education-website-v7-spacious-library-20260611.zip` | More spacious library visual treatment. |
| v8 | `rain-education-website-v8-cinematic-backgrounds-20260611.zip` | Cinematic large background sections. |
| v9 | `rain-education-website-v9-immersive-global-campus-20260612.zip` | Immersive global campus direction. |
| v10 | `rain-education-website-v10-clear-global-scenes-20260612.zip` | Clear full-frame images, Hong Kong copy fixed to global cities. |
| v11 | `rain-education-website-v11-academic-horizons-20260612.zip` | Added Global Academic Horizons gallery with five curated visuals. |
| v12 | `rain-education-website-v12-transparent-copy-20260612.zip` | Hero and cinematic text layers made transparent while keeping readable text shadows. |
| v13 | `rain-education-website-v13-hero-animation-20260613.zip` | Adds a high-density animated admissions pathway canvas to the homepage hero, with mobile text-fit fixes. |
| v14 | `rain-education-website-v14-cultural-gallery-20260613.zip` | Reshapes the homepage into a premium image-led layout with full-width hero, visual service entrances, and a cultural/campus gallery. |
| v15 | `rain-education-website-v15-hk-gateway-hero-20260613.zip` | Rebuilds the homepage hero around Hong Kong-to-global-universities positioning with route animation. |
| v16 | `rain-education-website-v16-premium-brand-system-20260613.zip` | Builds a premium education brand and conversion system with services, pathway imagery, offer wall and decision center. |
| v17 | `rain-education-website-v17-cinematic-global-route-20260613.zip` | Formalizes cinematic Hong Kong-to-global admissions route and global university matrix. |
| v18 | `rain-education-website-v18-prompt-aligned-cinematic-20260613.zip` | Aligns with requested visual sections and removes unrelated add-ons. |
| v20 | `rain-education-website-v20-brand-film-hero-20260614.zip` | Replaces route hero with full-screen brand-film video hero. |
| v21 | `rain-education-website-v21-hero-film-upgrade-20260614.zip` | Makes the homepage top a pure 100vw x 100vh brand-film opening. Local-only oversized archive unless LFS is configured. |
| v21 stats fix | `rain-education-website-v21-brand-intro-stats-grid-fix-20260614.zip` | Fixes Brand Intro data matrix. Local-only oversized archive unless LFS is configured. |
| v22 final brand film | `rain-education-website-v22-final-brand-film-20260615.zip` | Uses final Rain Education brand film. Local-only oversized archive unless LFS is configured. |
| v23 premium consulting home | `rain-education-website-v23-premium-consulting-home-20260619.zip` | Simplified consulting-home draft. User later rejected it as too short and content-light. |
| v24 premium full consulting home | `rain-education-website-v24-premium-full-consulting-home-20260619.zip` | Restores complete content and removes homepage video/canvas animation while keeping high-end consulting style. |
| v25 Oxbridge consulting home | `rain-education-website-v25-oxbridge-consulting-home-20260619.zip` | Reorganizes the homepage into a high-end consulting-company structure with static hero banner, case logic, mentor credibility, FAQ and Enquire Today conversion. |
| v26 Brand Consistency & Performance | `rain-education-website-v26-brand-consistency-performance-20260620.zip` | Previous production baseline. Refines Oxbridge-style header, hero, section navigation, Introduction, language consistency, mobile metrics, asset cleanup, and reduces zip from 71MB to 3.5MB. |
| v28.2 Parent-facing Copy & Credibility Production Release | `rain-education-website-v28-2-parent-facing-release-candidate-20260621.zip` | Current production release on `rainedu.hk`. Merged from `review/v28-parent-facing-copy-polish` at `0d116f8c8a4b5066eff38a09dee7cc4b43de446a`; production deploy `6a37ebddaf7c92d3f367c70b`. |
