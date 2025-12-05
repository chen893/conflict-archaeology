# Repository Guidelines（代理须知）

## 工作语言
- 所有代理与自动化回复必须使用中文，避免英文混杂。
- 自动化改动需在 PR 描述中注明生成方式。

## 项目结构
- Next.js App Router 在 `src/app`（`layout.tsx`、`page.tsx`），集中处理字体与主题。
- 全局样式放在 `src/styles/globals.css`，使用 Tailwind v4 工具类。
- 环境变量模式在 `src/env.js`，运行前请用 `.env.example` 复制生成 `.env`。
- 静态资源放 `public/`，长文档放 `docs/`，核心参考笔记 `docs/走进他人的心.md`。

## 开发命令
- `pnpm dev` 本地开发（默认 http://localhost:3000）。
- `pnpm build` 生产构建；`pnpm preview` 或 `pnpm start` 本地预览构建。
- 质量：`pnpm lint` / `pnpm lint:fix`、`pnpm typecheck` 或 `pnpm check`（含 lint）。
- 格式：`pnpm format:write` / `pnpm format:check`。

## 编码规范
- TypeScript + ES modules，2 空格缩进（`prettier.config.js`）。
- 组件/文件 PascalCase，工具函数 camelCase，静态资源 kebab-case。
- 优先服务端组件；仅需交互时用 client 组件。
- 导入优先 `~/` 别名；客户端避免直接读 `process.env`，使用 `env` 帮助。

## 适配与体验
- 必须完成 PC 端与移动端适配：≥1024px 为桌面布局，<1024px 为移动布局；触摸命中区≥44x44px。
- 移动端交互：Hover 功能需改为点击/折叠形式，长列表或图表可横向滚动或折叠。

## 测试与质量
- 提交前至少运行 `pnpm check`（含 lint + typecheck）。
- 新增测试与功能同目录存放（如 `src/app/foo/page.test.tsx`），覆盖路由与数据边界。
- UI 变更提交 PR 时需附前后截图或短视频。

## 提交与 PR
- 鼓励小步提交，遵循 Conventional Commits（如 `feat: ...`、`fix: ...`）。
- PR 必填：变更概述、关联 issue、验证步骤（命令/截图）、环境或配置更新说明。
- 提交前确保 lint/format/check 全部通过。

## 安全与配置
- 不要提交密钥；新增变量同步更新 `.env.example`。
- 如需暂时跳过校验，可设 `SKIP_ENV_VALIDATION=true`（仅本地调试，不可生产）。
- 静态资源避免敏感信息；有缓存需求优先使用哈希文件名。

## AI 集成提示
- AI 功能请参考 `ai-sdk-code.md` 和 `ai-sdk-ui.md`，按文档的 SDK 接口与 UI 组件方式集成。

## 平台信息
- 当前用户系统：Windows。
