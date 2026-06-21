# Codex Handoff For Rain Education Website

最后更新：2026-06-21

这份文件专门给新 Codex 窗口看。接手时不要从旧聊天猜上下文，先读这些文档和当前代码。

## 1. 新窗口接手前必须先阅读

请按顺序阅读：

1. `docs/RAIN_EDUCATION_MASTER_CONTEXT.md`
2. `docs/WEBSITE_STATUS.md`
3. `docs/WEBSITE_DESIGN_RULES.md`
4. `docs/WEBSITE_ROADMAP.md`
5. `docs/CODEX_HANDOFF.md`
6. `/Users/daiyali/Desktop/Rain-Education-Codex-HANDOFF.md`，如果在用户本机继续开发。

## 2. 当前项目定位

这个仓库是 Rain Education 官网版本归档仓库，不是 Next.js、Vite 或 npm 构建型项目。

当前正式开发版本：

- 版本：v28.2 Parent-facing Copy & Credibility Release Candidate
- 来源审核分支：`review/v28-parent-facing-copy-polish`
- 合并来源 commit：`0d116f8c8a4b5066eff38a09dee7cc4b43de446a`
- 本地工作目录：`website-versions/work/rain-education-website-v28-parent-facing-copy-polish`
- 部署候选包：`website-versions/archives/rain-education-website-v28-2-parent-facing-release-candidate-20260621.zip`
- SHA256：`2f1686aeb665fbff0ea497bb7c54c81f6c646fa089fe6cf60050f6d648cb44f3`
- 桌面预览：`website-versions/previews/rain-v28-2-parent-facing-release-candidate-desktop-1440.png`
- 手机预览：`website-versions/previews/rain-v28-2-parent-facing-release-candidate-mobile-390.png`
- 当前尚未部署 `rainedu.hk`。

上一生产基准版本：

- 版本：v26 Brand Consistency & Performance
- 部署包：`website-versions/archives/rain-education-website-v26-brand-consistency-performance-20260620.zip`
- 桌面预览：`website-versions/previews/rain-v26-brand-consistency-performance-desktop.png`
- 手机预览：`website-versions/previews/rain-v26-brand-consistency-performance-mobile.png`
- SHA256：`7841fd5d4d182c23bfcbd0f64d5b2b7adf05fb44a730f3e7aa35373fa55c47bc`

注意：`website-versions/work/` 被 Git 忽略，GitHub 固化依赖部署 zip、预览图、README 和 docs 文档。需要改页面时，在最新 work 目录中改，验证后重新打包到 archives。

## 3. v26 本轮关键说明

- v26 在 v25 Oxbridge Consulting Home 基础上迭代，不是重写。
- Header 改为平直、白色、轻量、学院型导航。
- Header 和子页面 header 使用官方完整 Logo 文件，不拆分图标、不重绘、不手打替代品牌组合。
- Hero 保留香港维港静态横幅，只保留主标题和英文标题。
- 公司介绍与 CTA 已移到 Hero 下方 Introduction Section。
- Hero 下新增 Oxbridge 式 Section Navigation。
- Trust Metrics 第二屏文案改为“以结果为目标，以路径管理不确定性”。
- 默认简体模式统一简体；繁体模式统一繁体；英文模式已验证无中文残留。
- 手机端数据卡为 2 + 2 + 1，最后一张通栏。
- Core Programmes 扩展为 9 个，补回国际名校申请规划和长期学业与职业发展规划。
- 新增 Trust Center，保留信任中心、合规说明、隐私保护、案例匿名化和结果边界。
- 性能清理后 zip 从 v25 的 71MB 降到 v26 的 3.5MB。

## 4. 保留内容红线

后续不要删除这些内容：

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

## 5. 用户明确否定的方向

不要恢复：

- 官网首页视频
- 品牌宣传片放在首页
- 地图飞线
- 粒子动画
- 科技感动画
- SaaS 感悬浮卡片 Header
- 廉价招生落地页
- 内容很少的咨询模板
- 普通留学中介表达

官网必须继续像：高端教育咨询集团、高端升学规划机构、国际教育品牌、长期学术规划顾问。

## 6. 新窗口接手后的第一步

1. 运行 `git status -sb`，确认分支和未提交改动。
2. 进入最新 work 目录。
3. 启动静态服务：

```bash
cd website-versions/work/rain-education-website-v26-brand-consistency-performance
python3 -m http.server 4186 --bind 127.0.0.1
```

4. 打开：

```text
http://127.0.0.1:4186/
```

5. 对照 docs 文档检查是否偏离用户要求。

## 7. 当前质量检查命令

项目没有 `package.json`，不要假装存在 npm build/lint。

可用检查：

```bash
node --check website-versions/work/rain-education-website-v26-brand-consistency-performance/script.js
python3 -m http.server 4186 --bind 127.0.0.1
unzip -tq website-versions/archives/rain-education-website-v26-brand-consistency-performance-20260620.zip
cd website-versions/archives && shasum -a 256 -c ../SHA256SUMS.txt
```

Playwright 至少检查：1440、1024、768、390 宽度；无横向滚动；无 video/canvas；FAQ 8；表单存在；语言切换可用；案例筛选和导师筛选可用。

## 8. v26 验证摘要

- `node --check`：通过。
- 桌面 1440 x 1200：overflowX 0，Hero 420px，5 个数据卡等宽，FAQ 8，表单存在，broken images 0，404 0。
- 手机 390 x 920：overflowX 0，Hero 260px，章节导航横滑，数据卡 2+2+1，表单存在。
- 英文模式：中文字符 0，fallback 0。
- 首页视频：0。
- canvas：0。
- v26 zip：3.5MB。
- 首屏资源估算：496.4KB。

## 9. 每次完成版本必须做

1. 修改只发生在最新 work 目录。
2. 运行本地预览和桌面/手机 QA。
3. 生成桌面端预览图。
4. 生成手机端预览图。
5. 生成部署 zip。
6. 计算 SHA256 并更新 `website-versions/SHA256SUMS.txt`。
7. 更新 `README.md`、`docs/WEBSITE_STATUS.md`、`docs/CODEX_HANDOFF.md`。
8. commit 并 push 到 `Rain-Education-Website`。

## 10. GitHub

- Remote：`https://github.com/yasin19890313/rain-education-app.git`
- Branch：`Rain-Education-Website`
- Branch URL：`https://github.com/yasin19890313/rain-education-app/tree/Rain-Education-Website`
