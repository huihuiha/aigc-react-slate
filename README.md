# SSML Slate Editor

基于 Slate.js 的 SSML 编辑器，使用 pnpm workspace 组织的 monorepo 结构。

## 项目结构

```
ssml-slate/
├── packages/              # 核心包
│   └── core/              # 编辑器核心功能
├── examples/              # 示例应用
│   └── demo/              # 示例应用
├── pnpm-workspace.yaml    # 工作空间配置
└── package.json           # 根项目配置
```

## 功能模块

- [ ] 编辑器
- [ ] 工具栏
- [ ] 对话框

## 开发

### 环境要求

- Node.js 16+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 开发所有包
pnpm dev

# 开发特定包
pnpm --filter @ssml-slate/core dev
pnpm --filter @ssml-slate/demo dev
```

### 构建

```bash
pnpm build
```
