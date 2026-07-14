# 数据大屏发布指南

本项目推荐发布到 `Cloudflare Pages`。原因是它对静态前端项目支持很好，免费额度足够，且适合当前项目的 `React + Vite + BrowserRouter` 结构。

## 推荐方案

- 发布平台：`Cloudflare Pages`
- 项目类型：纯前端静态站点
- 构建命令：`npm run build`
- 输出目录：`dist`
- 路由模式：`BrowserRouter`

本项目已添加 SPA 路由回退文件：

- [public/_redirects](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/数据大屏-综合材料站/liaoning-industrial-intelligence/public/_redirects)

这样在生产环境中直接访问或刷新 `/shenyang` 时，不会出现 404。

## 发布前准备

1. 确认本地可以正常构建：

```bash
npm install
npm run build
```

2. 将项目推送到 GitHub。

如果你的 Git 仓库根目录就是当前项目目录 `liaoning-industrial-intelligence`，后续 `Root directory` 可留空。

如果你的 Git 仓库根目录是它的上一级目录，则在 Cloudflare Pages 中将 `Root directory` 设置为：

```txt
liaoning-industrial-intelligence
```

## 方案一：通过 Cloudflare Pages 发布

### 1. 登录 Cloudflare

打开：

```txt
https://dash.cloudflare.com/
```

进入 `Workers & Pages`。

### 2. 创建 Pages 项目

依次点击：

1. `Create application`
2. `Pages`
3. `Connect to Git`
4. 选择 GitHub 仓库

### 3. 配置构建参数

建议填写如下：

- `Framework preset`: `Vite`
- `Build command`: `npm run build`
- `Build output directory`: `dist`
- `Install command`: `npm install`
- `Root directory`: 视仓库结构而定

### 4. 开始部署

点击 `Save and Deploy`。

部署成功后会获得一个公网地址，通常类似：

```txt
https://你的项目名.pages.dev
```

## 自定义域名

如果你有自己的域名，可以继续绑定：

1. 进入 Cloudflare Pages 项目
2. 打开 `Custom domains`
3. 添加域名
4. 按页面提示配置 DNS

完成后即可通过自己的域名访问大屏。

## 后续更新方式

推荐使用 Git 自动部署：

1. 本地修改代码
2. 提交并推送到 GitHub
3. Cloudflare Pages 自动重新构建并发布

常用命令：

```bash
git add .
git commit -m "update dashboard"
git push
```

## 路由说明

本项目使用的是 `BrowserRouter`，相关代码在：

- [main.tsx](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/数据大屏-综合材料站/liaoning-industrial-intelligence/src/main.tsx)

因此部署到静态托管平台时，必须配置 SPA 回退规则。否则：

- 直接访问 `/shenyang` 可能正常
- 但刷新 `/shenyang` 时，服务器会因为找不到真实文件而返回 404

本项目当前采用 Cloudflare Pages 兼容的 `_redirects` 方案处理。

## 常见问题

### 1. 部署成功但页面空白

优先检查：

- 构建日志是否报错
- 浏览器控制台是否报资源加载错误
- `Root directory` 是否配置正确

### 2. `/shenyang` 刷新后 404

检查以下文件是否已随构建一同发布：

- [public/_redirects](file:///Users/zhaowei/Documents/Workspace/Codex-workspace/数据大屏-综合材料站/liaoning-industrial-intelligence/public/_redirects)

文件内容应为：

```txt
/* /index.html 200
```

### 3. 地图或图表显示异常

建议检查：

- 浏览器是否拦截外部资源请求
- 构建后的静态资源是否成功加载
- 控制台是否存在 `ECharts` 或网络请求错误

## 备选方案：Vercel

如果你更习惯 Vercel，也可以发布。

基本配置：

- `Framework Preset`: `Vite`
- `Build Command`: `npm run build`
- `Output Directory`: `dist`

但由于当前项目使用 `BrowserRouter`，在 Vercel 上还需要额外添加路由重写配置，例如 `vercel.json`。如果后续你决定改用 Vercel，建议再补这一份配置。

## 当前项目发布清单

当前项目已具备以下发布条件：

- 已支持生产构建
- 已补充 Cloudflare Pages 路由回退文件
- 已适配静态站点部署
- 已整理完整发布文档

推荐直接按本文档使用 Cloudflare Pages 发布。
