# e-MY-PROFILE 个人主页项目说明

## 目录结构概览

- `src/`
  - `App.jsx`：主页（首页）UI 与交互逻辑（开场动画、横向滚动交互、进入项目时保存状态、返回时恢复状态）。
  - `App.css`：主页与项目内页的主要样式（包括卡片、联系卡、WorkDetail 的布局与视觉稿展示 hover）。
  - `main.jsx`：路由入口与路由表（`/`、`/profile`、`/works`、`/work/:id`）。
  - `index.css`：基础样式/主题变量（其中包含暗色模式变量，但主页已在 `App.css` 中做了覆盖）。
  - `data/works.js`：项目数据源（每个项目的标题、周期、关键词、概述、成果、画廊图片列表等）。
  - `components/`
    - `WorkDetail.jsx`：项目详情页（已按“仅保留：项目周期、项目关键词、项目概述、成果展示”精简）。
    - `WorksPage.jsx`：作品列表页（展示所有作品与跳转到详情页）。
    - `ProfileDetail.jsx`：个人简介/简历相关的页面（多 Tab 内容）。
    - `VideoPage.jsx`：视频页组件（当前路由不一定启用，但保留为扩展）。
- `public/`
  - 静态资源：头像图片、项目视频（例如 `workwarecodemethods.mp4`）、以及项目画廊用到的图片文件。
- `.github/workflows/`
  - `deploy-pages.yml`：GitHub Pages 部署工作流（启用 GitHub Actions 自动构建与发布）。

## 路由怎么工作

`src/main.jsx` 定义了以下路由：

- `/`：主页 `App.jsx`
- `/profile`：个人介绍页 `ProfileDetail.jsx`
- `/works`：作品列表页 `WorksPage.jsx`
- `/work/:id`：项目详情页 `WorkDetail.jsx`（通过 URL 参数 `id` 从 `src/data/works.js` 查数据）

## 1）主页首页（`src/App.jsx` + `src/App.css`）

### A. 开场动画（白底 + 居中深蓝大字）
- 控制文件：
  - `src/App.jsx`：`splashHidden` 状态 + `setTimeout`（首次打开主页 1500ms 后淡出）
  - `src/App.css`：`.home-splash-overlay` / `.home-splash-overlay.is-hidden` / `.home-splash-text`
- 你可以改什么：
  - 改淡出时长/持续时间：修改 `setTimeout(() => setSplashHidden(true), 1500)` 的数字
  - 改字的内容或字号/颜色：修改 `.home-splash-text` 的 CSS，以及 JSX 里的 `CHENSIYU&apos;s Profile`

### B. 横向“作品卡片”自然滑动交互
- 关键点：
  - `worksScrollRef` 指向作品横向容器（`work-scroll-wrap`）
  - `requestAnimationFrame` 在鼠标进入作品区域时，根据鼠标在左右边缘区域的位置动态改变 `scrollLeft`
- 你可以改什么：
  - 调整“敏感区宽度”：修改 `zoneRatio = 0.2`
  - 调整最大速度：修改 `maxSpeed = 3.5`
  - 调整响应平滑：修改 `ease = 0.11`

### C. 进入项目详情页时的返回衔接（回退逻辑）
- 进入时保存：
  - 在每个作品卡片的 `<Link ... onClick={...}>` 内：
    - `sessionStorage.setItem('homeScrollY', window.scrollY)`
    - `sessionStorage.setItem('worksScrollLeft', worksScrollRef.current.scrollLeft)`
- 返回时恢复：
  - `App.jsx` mount 时读取并 `window.scrollTo(0, savedY)`，同时恢复 `worksScrollLeft`
  - 然后会删除这两个 sessionStorage key，避免下次误用
- 你可以改什么：
  - 需要额外保存更多状态（例如其它区域滚动）时，可以在 `onClick` 增加新的 sessionStorage key，并在恢复 effect 里读取。

### D. “联系我”三张卡片深蓝主题
- 控制文件：`src/App.css`
- 你可以改什么：
  - 卡片背景/边框颜色：调整 `.contact-item` 里背景与 border 的颜色
  - 图标与文字变白：调整 `.contact-item svg`、`.contact-item label`、`.contact-item span` 的颜色

## 2）项目详情页（`src/components/WorkDetail.jsx` + `src/App.css`）

### A. 页面结构（已精简）
现在详情页只保留这四个部分：

1. 项目周期
2. 项目关键词
3. 项目概述（`work.summary`）
4. 成果展示（根据项目类型渲染）

### B. 成果展示渲染逻辑
控制文件：`src/components/WorkDetail.jsx`

- `work.slug === 'workwarecode'` 或 `work.id === 2`
  - 显示视频占位（`public/workwarecodemethods.mp4`）
- `work.id === 8` 或 `work.id === 9`（书法/摄影合集）
  - 显示图片画廊（使用 `work.galleryImages`；若为空则退回 `work.coverImage`）
- 其它普通项目
  - 显示文本成果（`work.outcome`）

### C. 成果展示画廊 hover 放大（书法/摄影）
- 控制文件：`src/App.css`
  - `.detail-visual-wall`：控制列布局
  - `.detail-visual-item:hover img`：hover 放大动画
- 你可以改什么：
  - 放大比例与动画缓动：修改 `.detail-visual-item:hover img` 的 `transform` / `transition` 参数

### D. 你要上传书法/摄影照片怎么用
关键在 `src/data/works.js`：

- 书法合集（id = 8）
  - 目前 `galleryImages` 数组为空：你需要把你上传到 `public/` 的图片路径加入 `galleryImages`
- 摄影合集（id = 9）
  - `galleryImages` 已经在数据里列好，只要你把对应图片文件放到 `public/photography/`（或修改路径让其匹配实际文件）即可

> 说明：当前是“数据驱动渲染”，不会自动扫描 `public/` 目录里的文件名。

## 3）作品列表页（`src/components/WorksPage.jsx`）
- 展示 `src/data/works.js` 中的 `WORKS`
- 点击某个作品会跳转到 `/work/:id`，进入 `WorkDetail`

## 4）个人介绍页（`src/components/ProfileDetail.jsx`）
- 当前不在本次需求范围内的改动点较少
- 如果你未来要调整其中的 Tab/内容：
  - 修改 `PROFILE_CONTENT.zh.sections / en.sections` 中的结构即可

## 5）部署（GitHub Pages）
- 部署流程：`.github/workflows/deploy-pages.yml`
- Vite 的打包根路径由 `vite.config.js` 的 `base` 决定
- 你如果要调整仓库名/子路径：
  - 修改 `vite.config.js` 的 `base: '/你的仓库名/'`
  - 重新 push 触发 Actions 部署即可

---

## 修改建议（避免影响其它逻辑）

- 不建议改动路由表以外的逻辑；详情页返回衔接依赖 sessionStorage key（`homeScrollY` / `worksScrollLeft`）。
- 不建议修改作品横向滑动的 `requestAnimationFrame` 逻辑的关键变量（`zoneRatio`、`maxSpeed`、`ease`），除非你明确想改变交互手感。

