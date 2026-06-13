# Rain Education Website Archive

This branch stores the Rain Education official website iterations produced during the June 2026 redesign work.

Branch name: `Rain-Education-Website`

The live site currently points to:

- https://rainedu.hk/
- https://cute-vacherin-7d30d4.netlify.app/

## Contents

- `website-versions/archives/`: full deployable zip packages for each saved version.
- `website-versions/previews/`: selected Playwright QA screenshots for visual comparison.
- `website-versions/SHA256SUMS.txt`: SHA-256 checksums for archive verification.

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
| v13 | `rain-education-website-v13-hero-animation-20260613.zip` | Latest version. Adds a high-density animated admissions pathway canvas to the homepage hero, with mobile text-fit fixes. |

## Latest Version

Use `website-versions/archives/rain-education-website-v13-hero-animation-20260613.zip` for the latest deployable package.

Key latest previews:

- `website-versions/previews/rain-v13-hero-animation-desktop.png`
- `website-versions/previews/rain-v13-hero-animation-mobile.png`

## Deployment Notes

These archives are intended for manual Netlify deploys. Upload the extracted contents of the selected zip package to the existing Netlify site, rather than creating a new Netlify site.

The v13 package uses the cache-busting asset version:

- `styles.css?v=20260613-v13-hero-animation`
- `script.js?v=20260613-v13-hero-animation`
