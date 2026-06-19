# Codex Handoff For Rain Education Website

最后更新：2026-06-19

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

当前最新官网版本：

- 版本：v25 Oxbridge Consulting Home
- 本地工作目录：`website-versions/work/rain-education-website-v25-oxbridge-consulting-home`
- 最新部署包：`website-versions/archives/rain-education-website-v25-oxbridge-consulting-home-20260619.zip`
- 最新桌面预览：`website-versions/previews/rain-v25-oxbridge-consulting-home-desktop.png`
- 最新手机预览：`website-versions/previews/rain-v25-oxbridge-consulting-home-mobile.png`
- SHA256：`6cc59b2b64babc5cc0b9b8f74e9a296bafd7bc6ffa9ee082075b7377fc2d5854`

注意：`website-versions/work/` 被 Git 忽略，长期 GitHub 固化依赖部署 zip、预览图、README 和 docs 文档。需要修改页面时，在最新 work 目录中改，验证后重新打包到 archives。

### v25 本轮关键说明

- v25 根据用户最新战略调整继续固化：官网首页不使用视频、不使用品牌宣传片、不使用地图飞线、不使用粒子动画、不使用科技感动画；宣传片仅作为独立外发资产。
- v25 参考 Oxbridge Applications 的高端咨询公司表达方式，但不照抄视觉、颜色或布局。
- 首页结构为 Top Navigation + 11 个内容 section，对应用户要求的 12 段结构：Hero Banner、Trust Metrics、Why Rain Education、Core Programmes、Rain Pathway、Success Cases、Parent Decision Center、Mentor Team、Testimonials、FAQ、Enquire Today。
- Hero 为全宽静态香港维港 Banner，桌面高度 420px，手机高度 280px；中央显示“以香港為起點 / 通往世界名校”和英文标题。
- 数据背书为 5 个独立等宽高端卡片：15年+、5000+、92%、100%、31%，数字与说明分行。
- Core Programmes 保留港八副学士 2+2+1、港九大本硕连读、香港本科、香港硕士、英国 G5、新加坡、GPA 管理与背景提升。
- 成功案例改为咨询公司案例逻辑，展示学生背景、挑战、规划策略、最终结果和关键支持，不再只是 Offer Wall。
- Mentor Team 使用导师照片、院校背景、擅长方向和服务模块，不做廉价头像墙。
- FAQ 至少 8 个；Enquire Today 包含 Netlify 表单、微信、WhatsApp、电话、邮箱和二维码。
- v25 验证：`node --check` 通过；本地引用缺失 0；1440/1024/768/390 Playwright 检查均无横向滚动；视频 0；canvas 0；FAQ 8；表单存在；二维码 2。

## 3. 新窗口接手后的第一步

接手后先做：

1. 运行 `git status -sb`，确认分支和未提交改动。
2. 进入最新 work 目录。
3. 用静态服务器运行项目，例如：

```bash
cd website-versions/work/rain-education-website-v25-oxbridge-consulting-home
python3 -m http.server 4183 --bind 127.0.0.1
```

4. 打开 `http://127.0.0.1:4183/` 检查当前页面。
5. 对照 docs 文档检查是否偏离用户要求。

不要贸然大改：

- 不要删除已有内容。
- 不要重写整个项目。
- 不要替换 Logo。
- 不要把宣传片放回首页。
- 不要把官网做短。
- 不要只为了视觉高级感牺牲内容完整度。

## 4. 用户核心偏好

用户明确偏好：

- 高端。
- 内容完整。
- 强咨询转化。
- 香港升学路径清晰。
- 数据背书可信。
- 不要瞎删。
- 不要廉价。
- 不要低清图片。
- Logo 不能变。
- 官网不放视频。
- 宣传片独立制作和分发。

用户已经明确否定：

- v23 过度简化方向。
- 首屏品牌宣传片视频方向。
- 地图飞线 / 路线动画 / 科技 HUD。
- 内容很少的咨询公司模板。
- 廉价留学中介风。

## 5. 后续每次大改前必须做

每次大改前：

1. 说明改动范围。
2. 确认当前最新版本和部署包。
3. 备份或提交当前版本。
4. 只做小范围、高质量、可回滚修改。

每次大改后：

1. 运行静态检查。
2. 运行本地预览。
3. 检查桌面和手机。
4. 重新生成预览图。
5. 重新生成部署 zip。
6. 计算 SHA256。
7. 更新 `README.md`、`website-versions/SHA256SUMS.txt`、`docs/WEBSITE_STATUS.md`。
8. 更新 `/Users/daiyali/Desktop/Rain-Education-Codex-HANDOFF.md` 并同步副本到桌面总汇总文件夹。
9. 提交 GitHub。

## 6. 当前质量检查命令

因为项目没有 `package.json`，不要假装存在 npm build/lint。

可用检查：

```bash
node --check website-versions/work/rain-education-website-v25-oxbridge-consulting-home/script.js
python3 -m http.server 4183 --bind 127.0.0.1
curl -I http://127.0.0.1:4183/
unzip -tq website-versions/archives/rain-education-website-v25-oxbridge-consulting-home-20260619.zip
cd website-versions/archives && shasum -a 256 -c ../SHA256SUMS.txt
```

如果使用 Playwright，应至少检查 1440、1024、768、390 宽度。

## 7. 新窗口可复制启动语

请先阅读以下文件：

1. `docs/RAIN_EDUCATION_MASTER_CONTEXT.md`
2. `docs/WEBSITE_STATUS.md`
3. `docs/WEBSITE_DESIGN_RULES.md`
4. `docs/WEBSITE_ROADMAP.md`
5. `docs/CODEX_HANDOFF.md`

然后运行项目，检查当前官网状态，不要重写项目，不要删除已有内容，在完全理解现有进度后继续开发。
