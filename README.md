# Rain Education Website Archive

Rain Education 官网项目长期归档与交接仓库。

本仓库保存香港瑞恩国际教育集团有限公司（HONG KONG RAIN INTERNATIONAL EDUCATION GROUP LIMITED）官网在 2026 年 6 月 redesign 过程中的部署包、预览图、校验值和长期接力文档。

当前最新版本是 **v26 Brand Consistency & Performance**。它在 v25 Oxbridge Consulting Home 基础上修正 Header、Hero、章节导航、Introduction、语言一致性、移动端数据卡和资源体积，继续保持高端教育咨询集团 / 国际升学规划机构定位。

## Live Site

当前线上站点：

- https://rainedu.hk/
- https://cute-vacherin-7d30d4.netlify.app/

注意：本仓库保存可部署包和版本记录，不代表线上站点已经自动更新到最新包。线上更新仍需手动上传 Netlify。

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

## Latest Version

- Version: `v26 Brand Consistency & Performance`
- Archive: `website-versions/archives/rain-education-website-v26-brand-consistency-performance-20260620.zip`
- SHA256: `7841fd5d4d182c23bfcbd0f64d5b2b7adf05fb44a730f3e7aa35373fa55c47bc`
- Desktop preview: `website-versions/previews/rain-v26-brand-consistency-performance-desktop.png`
- Mobile preview: `website-versions/previews/rain-v26-brand-consistency-performance-mobile.png`

The latest v26 package uses:

- `styles.css?v=20260619-v26-brand-consistency-performance`
- `script.js?v=20260619-v26-brand-consistency-performance`

## Local Preview

The latest editable working copy is local-only:

```text
website-versions/work/rain-education-website-v26-brand-consistency-performance
```

Run it locally:

```bash
cd website-versions/work/rain-education-website-v26-brand-consistency-performance
python3 -m http.server 4186 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:4186/
```

Because `website-versions/work/` is intentionally ignored by Git, GitHub readers should use the latest zip package and the docs folder as the source of truth unless they are working on the same local machine.

## Deployment

Manual Netlify deployment:

1. Use the latest zip from `website-versions/archives/`.
2. Extract it.
3. Upload the extracted contents to the existing Netlify site.
4. Do not create a new Netlify site unless the user explicitly asks.
5. Confirm that the zip root directly contains `index.html`, `styles.css`, `script.js`, and `assets/`.

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
| v26 Brand Consistency & Performance | `rain-education-website-v26-brand-consistency-performance-20260620.zip` | Latest version. Refines Oxbridge-style header, hero, section navigation, Introduction, language consistency, mobile metrics, asset cleanup, and reduces zip from 71MB to 3.5MB. |
