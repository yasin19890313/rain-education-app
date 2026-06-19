# Rain Education Website Status

最后更新：2026-06-19

这份文件记录当前官网项目真实进度、技术架构、页面状态、组件状态、已实现功能、问题与 GitHub 状态。

## 1. 当前技术架构

### 项目类型

当前仓库是静态官网版本归档仓库，不是 Next.js、Vite、React、Vue 或 npm 构建型项目。

仓库根目录当前不存在：

- `package.json`
- `src/`
- `app/`
- `pages/`
- `components/`
- `public/`
- `styles/`
- `tailwind.config.*`
- `next.config.*`
- `vite.config.*`
- `tsconfig.json`

### 当前最新官网版本

- 最新版本：v24 Premium Full Consulting Home
- 最新工作目录：`website-versions/work/rain-education-website-v24-premium-full-consulting-home`
- 最新归档包：`website-versions/archives/rain-education-website-v24-premium-full-consulting-home-20260619.zip`
- 最新桌面预览：`website-versions/previews/rain-v24-premium-full-consulting-home-desktop.png`
- 最新手机预览：`website-versions/previews/rain-v24-premium-full-consulting-home-mobile.png`
- SHA256：`77c2a62d4ae562685b23177e7a750099a2526f38f1c07e9a4bb18f40b6d1a24c`

### 使用语言与文件

v24 工作目录主要文件：

- `index.html`：首页，约 150KB，包含 46 个 section。
- `styles.css`：全站样式，约 299KB，包含历史样式和 v24 override。
- `script.js`：前端交互，约 127KB。
- `assets/`：图片、Logo、二维码、offer 图、导师图等约 115 个资源，约 72MB。
- 其他静态页面：`associate-degree.html`、`application-guides.html`、`gpa-management.html`、`mentor-team.html`、`postgraduate-application.html`、`success-cases.html`、`privacy.html`、`service-disclaimer.html`、`thank-you.html`。

### 样式方案

- 原生 CSS。
- 无 Tailwind。
- 无 CSS-in-JS。
- 无构建步骤。
- v24 关键样式从 `styles.css` 约 `V24 premium full consulting home` 注释段开始。

### 主要依赖

无 npm 依赖。项目通过浏览器直接加载静态 HTML/CSS/JS。

### 启动命令

在最新 work 目录运行：

```bash
cd website-versions/work/rain-education-website-v24-premium-full-consulting-home
python3 -m http.server 4182 --bind 127.0.0.1
```

访问：

```text
http://127.0.0.1:4182/
```

### 构建命令

无 npm 构建命令。生产部署方式是上传最新 zip 解压后的静态文件到 Netlify。

### 当前 Git 状态

- 当前分支：`Rain-Education-Website`
- 远端仓库：`https://github.com/yasin19890313/rain-education-app.git`
- 远端分支：`origin/Rain-Education-Website`
- 最近本地提交：
  - `3afb989 Add v13 hero animation website archive`
  - `53d4175 Archive Rain Education website versions`
- 当前任务前已有未提交改动：`README.md`、`website-versions/SHA256SUMS.txt`，以及 v14-v24 归档包和预览图未跟踪。
- 当前新增文档：`docs/` 下五份交接文档。

### GitHub 大文件状态

本地有 3 个历史 zip 超过 GitHub 普通 Git blob 100MB 限制：

- `website-versions/archives/rain-education-website-v21-hero-film-upgrade-20260614.zip`，约 105MB。
- `website-versions/archives/rain-education-website-v21-brand-intro-stats-grid-fix-20260614.zip`，约 105MB。
- `website-versions/archives/rain-education-website-v22-final-brand-film-20260615.zip`，约 144MB。

本机 Git 配置中存在 LFS filter，但 `git lfs` 命令不可用。因此这三个超大 zip 已在 `.gitignore` 中标记为本地归档资产，不进入本次普通 Git 提交。它们仍保留在用户本机和桌面归档中，不删除。

## 2. 当前已完成页面

### `/` / `index.html`

- 用途：首页，承载品牌定位、数据背书、服务体系、香港路径、案例、导师、信任中心、内容入口、咨询表单和联系信息。
- 完成度：v24 当前主版本，内容完整度高。
- 主要组件：Header、静态 Hero、数据背书、Global Pathway、香港高校 Gallery、Offer Wall、品牌故事、顾问系统、家长决策中心、服务方案、路径比较、案例库、导师团队、信任中心、活动、内容中心、FAQ、评估器、咨询表单、联系区、合规说明、Footer。
- 当前视觉效果：静态高端咨询公司风格，深蓝/白色/香槟金；不再使用视频首屏。
- 移动端：已在 390px 验证无横向滚动，数据卡片无溢出。
- 是否仍需优化：需要继续整理内容节奏，减少历史叠加造成的重复感，提升整体一致性。

### `/success-cases.html`

- 用途：Offer 案例库，展示匿名化处理后的香港、海外本科和研究生 offer 案例。
- 完成度：已有可用基础页面。
- 主要组件：案例网格、offer 图、匿名化说明。
- 当前视觉效果：与主站静态风格一致，但页面内容仍可深化。
- 移动端：静态页面，需后续单独截图复查。
- 是否仍需优化：建议升级为更完整的 case study 页面，增加背景、挑战、规划动作和结果。

### `/mentor-team.html`

- 用途：导师团队与辅导体系专题。
- 完成度：基础页面已存在。
- 主要组件：导师体系说明、辅导方向、相关入口。
- 当前视觉效果：静态专题页。
- 移动端：需后续单独复查。
- 是否仍需优化：建议补充导师照片、服务链路、筛选逻辑和可信证据。

### `/associate-degree.html`

- 用途：港八副学士升学路径专题。
- 完成度：基础 SEO 页面已存在。
- 主要组件：路径说明、步骤、相关链接。
- 当前视觉效果：静态专题页。
- 移动端：需后续单独复查。
- 是否仍需优化：建议补充适合人群、2+2+1 路径图、案例、FAQ 和表单入口。

### `/postgraduate-application.html`

- 用途：硕士与博士申请规划专题。
- 完成度：基础 SEO 页面已存在。
- 主要组件：研究生申请方向、专业定位、申请支持说明。
- 当前视觉效果：静态专题页。
- 移动端：需后续单独复查。
- 是否仍需优化：建议补充香港、英国、新加坡、G5 等方向拆分。

### `/gpa-management.html`

- 用途：GPA 管理与学术成长专题。
- 完成度：基础 SEO 页面已存在。
- 主要组件：GPA 重要性、服务方向、适合人群。
- 当前视觉效果：静态专题页。
- 移动端：需后续单独复查。
- 是否仍需优化：建议补充课程管理、选课策略、低 GPA 补强案例和咨询表单入口。

### `/application-guides.html`

- 用途：申请指南与路径建议。
- 完成度：基础 SEO 页面已存在。
- 主要组件：申请路径说明、目标地区入口。
- 当前视觉效果：静态专题页。
- 移动端：需后续单独复查。
- 是否仍需优化：可扩展为内容中心或博客入口。

### `/privacy.html`

- 用途：隐私政策。
- 完成度：已存在。
- 主要组件：信息收集、使用、平台说明、联系方式。
- 当前视觉效果：法律/说明页风格。
- 移动端：需后续单独复查。
- 是否仍需优化：确认最终邮箱后统一替换。

### `/service-disclaimer.html`

- 用途：服务说明与合规边界。
- 完成度：已存在。
- 主要组件：服务范围、服务边界、结果说明。
- 当前视觉效果：法律/说明页风格。
- 移动端：需后续单独复查。
- 是否仍需优化：需要和正式服务协议保持一致。

### `/thank-you.html`

- 用途：表单提交感谢页。
- 完成度：已存在。
- 主要组件：感谢提示、返回入口。
- 当前视觉效果：简单确认页。
- 移动端：需后续单独复查。
- 是否仍需优化：可加入 WhatsApp、微信、电话快速联系入口。

## 3. 当前已完成组件

### Header / Navbar

- 文件位置：`index.html` 顶部，样式在 `styles.css`。
- 功能：品牌 Logo、导航锚点、语言切换、移动端菜单。
- 当前状态：可用。
- 待优化：移动端菜单的逐项点击体验可继续复查。

### Hero Section

- 文件位置：`index.html` 的 `#home`，class 为 `hero-static-consulting`。
- 功能：展示“以香港為起點，通往世界名校”、英文副标题、说明、CTA 和香港静态图。
- 当前状态：v24 已改为静态高端 Hero，无视频、无 canvas。
- 待优化：可继续提升图片裁切和首屏品牌记忆点。

### 数据模块

- 文件位置：`#brand-intro`，class 为 `full-trust-metrics`。
- 功能：展示 15年+、5000+、92%、100%、31%。
- 当前状态：5 个独立卡片，数字与说明分行，已验证无溢出。
- 待优化：可增加统计口径说明，提高可信度。

### 产品模块

- 文件位置：`#programs`、`#service-packages`、`#pathway`、`#rain-pathway-system`、`#associate-degree-guide`。
- 功能：本科、硕士、副学士、GPA、G5、新加坡、背景提升等服务入口。
- 当前状态：内容较完整。
- 待优化：统一视觉层级，减少重复表达。

### 路径模块

- 文件位置：`#global-pathway`、`#hk-universities`、`#destination-matrix`、`#pathway-comparison`。
- 功能：展示香港、英国、新加坡、美国、全球名校路径。
- 当前状态：存在部分视觉化路径区块。
- 待优化：避免恢复早期路线动画，保持静态咨询风。

### 成功案例模块

- 文件位置：`#case-library` 和 `success-cases.html`。
- 功能：首页有 14 个 case card，含筛选按钮；案例页展示 offer 图。
- 当前状态：内容丰富。
- 待优化：部分案例可升级为咨询公司式深度案例。

### 导师团队模块

- 文件位置：`#mentor-team` 和 `mentor-team.html`。
- 功能：首页有 9 个 mentor card，支持导师方向筛选。
- 当前状态：导师照片、学校背景、方向和擅长领域已保留。
- 待优化：导师卡片视觉一致性和照片比例可继续优化。

### 信任中心模块

- 文件位置：`#trust-center`、`#proof`、`#compliance`。
- 功能：展示服务机制、隐私、合规边界、案例匿名化说明。
- 当前状态：已存在。
- 待优化：可补充更清晰的服务流程和材料安全说明。

### 家长痛点与 FAQ 模块

- 文件位置：`#decision-center`、`#parent-search-map`、`#faq`。
- 功能：回应家长对路径、GPA、地区、申请风险的核心问题。
- 当前状态：已存在。
- 待优化：可根据真实咨询问题持续扩充。

### 表单组件

- 文件位置：`#consultation`，包含 quick consultation form 和完整 consultation form。
- 功能：Netlify Forms 表单、隐藏字段、联系方式、同意条款。
- 当前状态：静态表单已存在，`script.js` 会填充 page_url 和 selected_language。
- 待优化：需要在 Netlify 后台确认字段接收是否正常。

### Footer

- 文件位置：`index.html` 底部。
- 功能：完整导航、服务入口、联系方式、邮箱、电话。
- 当前状态：已存在。
- 待优化：确认最终邮箱、地址与品牌名称。

### 动画组件

- 当前保留：滚动 reveal、header 滚动态、筛选交互、语言切换。
- 当前禁用/移除：v24 首页不使用视频、不使用 canvas、不使用地图飞线或路线节点动画。

## 4. 当前已实现功能

- 页面锚点跳转。
- 多静态页面跳转。
- 响应式布局。
- 移动端菜单。
- 语言切换按钮，支持简体、繁体、英文的前端文本替换。
- Header 滚动状态变化。
- 滚动 reveal 效果。
- 案例筛选。
- 导师筛选。
- 简易路径评估器。
- Netlify Forms 表单。
- 隐私政策和服务说明链接。
- 图片 lazy loading。
- SEO 基础设置：title、description、canonical、hreflang、OG、Twitter Card、JSON-LD、sitemap、robots。
- Offer 图匿名化说明。

## 5. 当前存在的问题

### 页面设计问题

- v24 已恢复完整内容，但历史版本多次叠加，首页 46 个 section 较长，部分内容节奏和视觉系统仍需统一。
- 个别早期区块仍带有“cinematic”“v16”等历史 class 命名，代码语义不完全贴合最新方向。
- 部分图文段落可能仍有视觉风格混杂，需要逐段打磨。

### 代码问题

- `styles.css` 和 `script.js` 较大，包含多轮历史迭代遗留样式和语言映射，长期维护成本高。
- 没有模块化组件系统，没有构建工具，没有自动化测试。
- `website-versions/work/` 被本地 Git exclude 忽略，GitHub 上主要固化 zip 包和文档，不是展开源码。

### UI 不统一问题

- 首页同时保留多代视觉模块，虽然 v24 首屏已修复，但下方部分区块仍可能带有不同版本的视觉语言。
- 导师照片、offer 图和城市图比例不完全统一。

### 移动端问题

- v24 首屏和数据区已验证 390px 无横向滚动，但其他 46 个 section 仍建议逐屏复查。
- 表单较长，手机填写体验仍可压缩和优化。

### 加载速度问题

- v24 工作目录 assets 约 72MB，部署包约 71MB。
- 首页图片较多，虽然没有视频，但首屏及后续图片加载仍需继续优化。
- 历史压缩包 v21/v22 包含视频，体积较大，不适合直接进入普通 Git 历史。

### 图片清晰度问题

- 现有图片大多可用，但需继续检查是否有低清、过暗、裁切不佳或拉伸情况。
- Logo、二维码、导师照片不得被重新绘制或拉伸。

### 内容缺失问题

- 联系邮箱最终版本待用户确认：当前代码使用 `info@rainedu.hk`，用户提到也可优先使用 `info@rainedu.com`。
- 地址如无最新确认，不应自行编造。
- 核心专题页内容仍可扩展。

### 与用户要求不一致的地方

- v23 曾过度简化，用户已否定；v24 已从完整 v22 恢复内容。
- 当前 v24 仍有大量历史 class 命名和旧 CSS 片段，虽然页面不使用视频或 canvas，但代码清理仍可继续。

## 6. 当前用户已经明确否定的方向

必须长期记录：

- 首屏不再放视频。
- 官网不摆宣传片。
- 宣传片只作为对外发送给合作伙伴、学校、渠道或客户的独立视频资产。
- 官网不能做得内容很少。
- 官网不能瞎删内容。
- 官网不能做成廉价招生站。
- 官网不能做成普通留学中介站。
- 官网必须高端、有内容、有品牌感、有咨询公司质感。
- 不要恢复 SVG 航线动画。
- 不要恢复地图节点动画。
- 不要恢复科技感 HUD。
- 不要把视频缩小放在右侧。

## 7. 当前技术问题与检查记录

检查日期：2026-06-19

### Git 状态检查

- 命令：`git status -sb`
- 结果：当前分支为 `Rain-Education-Website`。存在 README、SHA256SUMS、docs、v14-v24 归档包和预览图等待提交内容。

### 依赖检查

- 命令：`test -f package.json`
- 结果：`package-json-missing`
- 结论：当前仓库不是 npm 项目，无依赖安装步骤。

### JavaScript 语法检查

- 命令：`node --check website-versions/work/rain-education-website-v24-premium-full-consulting-home/script.js`
- 结果：通过，无语法错误输出。

### npm build

- 命令：`npm run build`
- 结果：失败。
- 报错摘要：`ENOENT Could not read package.json`
- 可能原因：项目根目录没有 `package.json`，本项目为静态 HTML/CSS/JS 归档。
- 建议修复方式：不要把此失败当成构建错误；如果未来迁移到 Next/Vite，再新增 package.json 和构建脚本。

### npm lint

- 命令：`npm run lint`
- 结果：失败。
- 报错摘要：`ENOENT Could not read package.json`
- 可能原因：项目根目录没有 `package.json`，当前没有 ESLint 配置。
- 建议修复方式：未来如需要自动 lint，可新增独立静态项目配置；当前用 `node --check` 和页面验证替代。

### npm dev

- 命令：`npm run dev`
- 结果：失败。
- 报错摘要：`ENOENT Could not read package.json`
- 可能原因：项目根目录没有 `package.json`。
- 建议修复方式：当前用 `python3 -m http.server` 启动静态预览。

### 本地预览

- 命令：`curl -I http://127.0.0.1:4182/`
- 结果：HTTP 200 OK。
- 说明：本地服务通过 `python3 -m http.server 4182 --bind 127.0.0.1` 提供静态预览。

### 静态资源引用检查

- 命令：Node 脚本扫描 v24 目录中的 HTML/CSS/JS/manifest/XML/TXT 资源引用。
- 结果：检查 15 个文件，缺失引用 0 个。

### zip 完整性检查

- 命令：`unzip -tq website-versions/archives/rain-education-website-v24-premium-full-consulting-home-20260619.zip`
- 结果：通过。

### SHA256 检查

- 命令：`cd website-versions/archives && shasum -a 256 -c ../SHA256SUMS.txt`
- 结果：本机归档文件校验通过，包括 v24。
- 注意：v21/v22 超大 zip 当前留在本机并被 `.gitignore` 忽略，若从 GitHub 新 clone，不会自动拥有这些超大本地归档。

## 8. GitHub 状态

- 当前仓库：`https://github.com/yasin19890313/rain-education-app.git`
- 当前分支：`Rain-Education-Website`
- 远端已有分支：
  - `main`
  - `Rain-Education-Website`
  - `review/v23-premium-consulting-home`
- 当前任务目标：提交 docs 文档、README、SHA 更新、可推送的归档包和预览图到 `Rain-Education-Website` 分支。
- 当前限制：不使用 Git LFS 的情况下，超过 100MB 的历史 zip 不推入普通 Git 历史。

