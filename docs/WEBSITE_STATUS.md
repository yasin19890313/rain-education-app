# Rain Education Website Status

最后更新：2026-06-21

这份文件记录 Rain Education 官网当前真实进度、技术架构、页面状态、版本差异、性能数据、验证结果和 GitHub 状态。

## 1. 当前技术架构

当前仓库是静态官网版本归档仓库，不是 Next.js、Vite、React、Vue 或 npm 构建型项目。

仓库根目录当前不存在：

- `package.json`
- `src/`
- `app/`
- `components/`
- `tailwind.config.*`
- `next.config.*`
- `vite.config.*`

当前使用：

- HTML
- CSS
- Vanilla JavaScript
- Netlify Forms
- 静态图片、完整官方 Logo、导师图、二维码、offer 图
- `python3 -m http.server` 本地预览

## 2. 正式生产基准与当前审核版本

- 正式生产基准版本：v26 Brand Consistency & Performance
- v26 工作目录：`website-versions/work/rain-education-website-v26-brand-consistency-performance`
- v26 归档包：`website-versions/archives/rain-education-website-v26-brand-consistency-performance-20260620.zip`
- v26 桌面预览：`website-versions/previews/rain-v26-brand-consistency-performance-desktop.png`
- v26 手机预览：`website-versions/previews/rain-v26-brand-consistency-performance-mobile.png`
- SHA256：`7841fd5d4d182c23bfcbd0f64d5b2b7adf05fb44a730f3e7aa35373fa55c47bc`
- 生产开发分支：`Rain-Education-Website`
- 远端：`https://github.com/yasin19890313/rain-education-app.git`

当前最新审核版本：

- 当前最新审核版本：v28.2 Parent-facing Copy & Pre-Merge QA
- 当前审核分支：`review/v28-parent-facing-copy-polish`
- 当前审核工作目录：`website-versions/work/rain-education-website-v28-parent-facing-copy-polish`
- 当前审核版本尚未合并 Rain-Education-Website，尚未部署线上官网。

v26 本地预览：

```bash
cd website-versions/work/rain-education-website-v26-brand-consistency-performance
python3 -m http.server 4186 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:4186/
```

## 3. v26 本轮完成内容

v26 不是重做网站，而是在 v25 Oxbridge Consulting Home 基础上做视觉层级、品牌一致性、语言一致性、内容完整度和性能修正。

### Header

- Header 改为平直、轻量、白色、学院型导航。
- 减少圆角、阴影和 SaaS 胶囊感。
- Header 和子页面 header 均使用用户提供的官方完整 Logo 文件。
- 未拆分 Logo 图标，未重绘 Logo，未重新手打替代品牌组合。
- 语言选择器改为安静的 `ZH-CN / ZH-HK / EN` 文本按钮。

### Hero

- 保留香港维港全宽静态横幅。
- Hero 只保留主标题“以香港为起点 / 通往世界名校”和英文标题。
- 移除 Hero 中长正文、公司介绍、双 CTA 和多层标签。
- 遮罩改为局部深蓝渐变，减少整图压黑。
- 公司介绍和 CTA 移至独立 Introduction Section。

### Section Navigation

Hero 下方新增 Oxbridge 式页面章节导航：

- 品牌简介
- 核心项目
- 升学路径
- 成功案例
- 导师团队
- 家长反馈
- FAQ
- 预约咨询

桌面横向排列，移动端横向滑动，点击平滑跳转。

### Introduction Section

新增正式简介区：

- 标题：以长期规划，管理每一次升学选择
- 文案：Rain Education 立足香港，为学生提供从背景诊断、路径设计、GPA 管理、申请执行到入学后发展的长期升学管理。我们不只关注一次申请结果，更关注学生未来数年的学术路径与成长空间。
- CTA：预约升学评估、了解核心项目

### 第二屏文案

- 删除：把结果、路径与风险放在同一张桌面上
- 替换：以结果为目标，以路径管理不确定性
- 副文案：我们结合学生的学术表现、院校政策、家庭目标与长期发展，建立清晰、可执行、可持续复盘的升学方案。

### 语言一致性

- 默认简体模式已统一为简体中文。
- 繁体模式通过前端转换输出繁体，已补充“关注”“不确定性”等后处理。
- 英文模式更新完整映射，浏览器验证无中文残留、无 fallback 文案。
- 语言切换不破坏案例筛选、导师筛选和表单隐藏语言字段。

### 移动端数据卡

- 桌面：继续 5 列等宽。
- 手机：2 列 + 2 列 + 最后一张通栏。
- 390px 验证无横向溢出，数字与说明均在卡片内。

### 内容完整度

v26 在核心项目区从 v25 的 7 个服务卡扩展为 9 个：

1. 港八副学士 2+2+1 名校跃升计划
2. 港九大本硕连读精英规划计划
3. 香港本科申请
4. 香港研究生 / 硕士申请
5. 英国 G5 申请
6. 新加坡申请
7. GPA 管理与背景提升
8. 国际名校申请规划
9. 长期学业与职业发展规划

新增独立 Trust Center，用于保留并强化信任中心、合规说明、隐私保护、案例匿名化和结果边界。

## 4. v24 / v25 / v26 内容差异审计

### v24 中作为独立 section 存在、v25/v26 不再独立展示的内容

这些内容没有作为同名独立 section 保留，而是被合并进入更高端的咨询公司首页结构或专题页：

- 全球路径、香港高校 Gallery、城市/路线/视觉展示类 section
- Offer Wall、Associate Offers、Global Offers、Proof、Case Library 等案例展示分区
- Brand Story、Advisory System、Admissions Standard、Advantages、Tutor Standard 等说明分区
- Gaokao Route、Pathway Finder、Destination Matrix、Pathway Comparison、Academic System 等路径判断分区
- Service Packages、Deliverables、Associate Guide、Planning Guides、Topic Pages 等内容入口分区
- Decision Center、Parent Search Map、Trust Center、Compliance、Contact、Assessment 等分散转化/信任区块
- 早期 cinematic 背景分隔 section

### v24 到 v25 被合并的内容

- 数据背书与品牌介绍合并为 Trust Metrics。
- 香港路径、全球路径、目的地矩阵合并到 Why Rain Education、Core Programmes 和 Rain Pathway。
- Offer Wall、Proof、Case Library 合并为咨询公司式 Success Cases，并保留 `success-cases.html` 案例库。
- 家长决策、搜索型 FAQ、路径疑问合并为 Parent Decision Center 与 FAQ。
- 导师标准、导师列表、学术支持合并为 Mentor Team。
- 联系、扫码、表单、合规边界合并为 Enquire Today、Footer 和服务说明页。

### v26 相对 v25 保留的内容

- Header / Navigation
- 静态香港维港 Hero
- 5 个固定信任数据
- Why Rain Education
- Core Programmes
- Rain Pathway
- Success Cases
- Parent Decision Center
- Mentor Team
- Testimonials
- FAQ
- Enquire Today 表单
- 微信、WhatsApp、电话、邮箱、二维码
- `success-cases.html` offer 案例库
- `associate-degree.html`、`postgraduate-application.html`、`gpa-management.html` 等专题页

### v26 明确继续保留的业务内容

- 港八副学士 2+2+1
- 港九大本硕连读精英规划计划
- 香港本科
- 香港研究生 / 硕士
- 英国 G5
- 新加坡
- GPA 管理
- 国际名校申请
- 长期学业与职业规划
- 成功案例
- 导师团队
- 家长痛点
- 信任中心
- FAQ
- 咨询表单
- 微信、WhatsApp、电话、邮箱和二维码

## 5. 当前页面状态

### 首页 `/`

完成度：v26 当前主版本。

首页结构：

1. Header
2. Hero Banner
3. Section Navigation
4. Introduction
5. Trust Metrics
6. Why Rain Education
7. Core Programmes
8. Rain Pathway
9. Success Cases
10. Parent Decision Center
11. Trust Center
12. Mentor Team
13. Testimonials
14. FAQ
15. Enquire Today
16. Footer

### 其他静态页面

保留并同步样式与官方完整 Logo header：

- `success-cases.html`
- `mentor-team.html`
- `associate-degree.html`
- `postgraduate-application.html`
- `gpa-management.html`
- `application-guides.html`
- `privacy.html`
- `service-disclaimer.html`
- `thank-you.html`

## 6. 性能清理结果

### 文件体积

- v25 部署 zip：71MB
- v26 部署 zip：3.5MB
- v25 工作目录：75MB
- v26 工作目录：3.8MB
- v25 assets：72MB
- v26 assets：3.6MB
- v25 `styles.css`：322,075 bytes
- v26 `styles.css`：18,858 bytes
- v25 `script.js`：130,438 bytes
- v26 `script.js`：73,984 bytes

### 资源清理

- v25/v26 初始 assets：115 个。
- 第一次扫描：85 个未引用素材，约 65.32MB，已从 v26 独立目录删除。
- 第二次清理：移除大 PNG mentor fallback 和旧 favicon，共约 2.85MB。
- v26 最终 assets：28 个。
- 已移除：历史视频相关素材、历史背景图、重复 PNG/WebP、文化图库、CV 摘图、早期装饰素材。
- 已保留：官方完整 Logo 原图、优化 Logo WebP、香港 Hero WebP、导师照片、二维码、案例 offer 图。

### 首页首屏实际资源大小

按 v26 首屏实际需要的本地文件计算：

- `index.html`：38.8KB
- `styles.css`：18.4KB
- `script.js`：72.3KB
- `assets/bg-hong-kong-clear-v10.webp`：251.1KB
- `assets/logo-optimized.webp`：83.9KB
- `assets/logo-mark-192.png`：32.0KB
- 合计：496.4KB，约 0.485MB。

Playwright 资源记录中首屏图片资源为 Hero + Logo + favicon，encoded body 合计约 367KB；CSS/JS 在本地浏览器缓存场景下 transferSize 显示为 0 或 300 bytes，因此最终以文件大小合计作为可复核口径。

## 7. v26 验证记录

检查日期：2026-06-20

### 静态检查

- `node --check website-versions/work/rain-education-website-v26-brand-consistency-performance/script.js`：通过。
- 首页与样式/脚本未命中：`v25`、`v24`、`video`、`canvas`、`particle`、`flight`、`flyline`、`brand-icon`、`brand-text`、`logo-mark-optimized`。
- 资源扫描：v26 目录无 `.playwright-cli`、无 `.DS_Store`、无 `__MACOSX`。
- zip 根目录直接包含 `index.html`、`styles.css`、`script.js`、`assets/`。

### Playwright 桌面检查

视口：1440 x 1200。

- `overflowX = 0`
- Header：93px 高
- Hero：420px 高
- Section Navigation：58px 高
- 数据卡：5 列等宽
- 视频：0
- canvas：0
- FAQ：8
- 表单：存在
- broken images：0
- 404 responses：0
- 英文模式：中文字符 0，fallback 0
- 案例筛选：可用
- 导师筛选：可用
- 表单隐藏语言字段：可更新

### Playwright 手机检查

视口：390 x 920。

- `overflowX = 0`
- Header：79px 高
- Hero：260px 高
- Section Navigation：横向滑动
- 移动端菜单按钮显示
- 数据卡：2 + 2 + 1，最后一张通栏
- broken images：0
- 表单：存在

## 8. 当前仍需注意

- `website-versions/work/` 被 Git 忽略；GitHub 主要固化 zip、预览图、README 和 docs。
- 当前没有 npm build/lint/dev，不能用 npm 命令作为成功标准。
- 线上 Netlify 不会自动更新，需要手动上传最新 zip 解压后的内容。
- 官方完整 Logo 原图 `assets/logo.png` 约 1.2MB，v26 保留它是为了满足“必须使用用户提供的官方完整 Logo 文件”的要求；浏览器优先加载 84KB 的 `logo-optimized.webp`。
- 后续可继续深化专题页和案例页，但首页不应恢复视频、宣传片、飞线、粒子或科技感动画。

## 9. GitHub 状态

- 当前仓库：`https://github.com/yasin19890313/rain-education-app.git`
- 当前分支：`Rain-Education-Website`
- 本次 v26 需要提交并 push 到 `origin/Rain-Education-Website`。
