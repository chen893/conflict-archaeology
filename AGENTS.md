# Repository Guidelines

## 项目结构与模块组织
- Next.js App Router 位于 `src/app`（`layout.tsx`、`page.tsx`），集中处理字体/主题。
- 全局样式在 `src/styles/globals.css`，直接使用 Tailwind v4 工具类。
- 环境变量模式在 `src/env.js`，运行前先用 `.env.example` 创建 `.env`。
- 静态资源放 `public/`，长文档放 `docs/`。

## 构建、测试与开发命令
- `pnpm dev`：本地开发（Turbo），默认 `http://localhost:3000`。
- `pnpm build`：生成生产构建；`pnpm preview` 或 `pnpm start`：本地预览构建。
- `pnpm lint` / `pnpm lint:fix`：Next ESLint；`pnpm typecheck` 或 `pnpm check`：TypeScript noEmit，`check` 也跑 lint。
- `pnpm format:write` / `pnpm format:check`：Prettier + Tailwind 插件。

## 编码风格与命名约定
- TypeScript + ES modules，2 空格缩进，由 `prettier.config.js` 统一。
- 组件/文件用 PascalCase，工具函数 camelCase，静态资源 kebab-case。
- 优先 App Router 的服务端组件；仅在确需交互时使用 client 组件。
- 优先使用 `~/` 别名导入；客户端避免直接读 `process.env`，用 `env` 帮助。

## 测试指南
- 当前无专用测试框架，提交前至少运行 `pnpm check`。
- 新增测试建议与特性同目录存放（如 `src/app/foo/page.test.tsx`），覆盖路由与数据边界。
- UI 变更提交 PR 时附前/后截图或短视频。

## 提交与 Pull Request 准则
- 提交粒度小，鼓励 Conventional Commits（如 `feat: ...`、`fix: ...`）。
- PR 需包含：变更概述、关联 issue、验证步骤（命令/截图）、环境或配置更新说明。
- 提交前确保 `pnpm check`、lint、format 通过。

## 安全与配置提示
- 不要提交密钥；新增变量同步到 `.env.example`。
- 临时跳过校验可设 `SKIP_ENV_VALIDATION=true`，仅限本地调试，不可生产。
- 静态资源避免包含敏感信息，涉及缓存时优先使用哈希文件名。

## 代理/自动化注意事项
- Codex 或其他代理在此仓库中的回复必须使用中文，避免英文混杂。
- 自动化改动需遵循上述命令与风格，并在 PR 描述清晰标注生成方式。

## AI功能调用注意事项：
为确保正确集成和使用AI功能，请参考当前目录下的SDK技术文档：
1. `ai-sdk-code.md` - AI核心SDK、API接口及代码示例
2. `ai-sdk-ui.md` - AI相关UI组件、交互设计及前端实现


## 用户当前系统为window