# 微信公众号 Markdown 编辑器

Markdown 文档自动即时渲染为微信图文，让你不再为微信文章排版而发愁！只要你会基本的 Markdown 语法，就能做出一篇样式简洁而又美观大方的微信图文。

[微信公众号Markdown编辑器主页](https://md.flyeric.top)

![image-20250312下午55610311](https://pic-bed-1256249917.cos.ap-chengdu.myqcloud.com/uPic/image-20250312%E4%B8%8B%E5%8D%8855610311.png)

## 项目简介

本项目是一个基于 Web 的 Markdown 编辑器，专为微信公众号文章排版设计。它能够实时将 Markdown 文本转换为适合微信公众号的富文本格式，解决了微信公众号文章排版困难的问题。

### 为什么选择我们的工具？

- **所见即所得**：左侧编辑，右侧实时预览，让你清楚了解文章最终效果
- **一键复制**：一键复制为微信公众号格式，直接粘贴到公众号后台即可
- **多种预览模式**：支持自适应、手机和宽屏三种预览模式，满足不同需求
- **丰富的样式设置**：支持主题、字体、字号、主题色、代码主题等多种样式设置
- **完全免费**：开源免费，无需注册，无需安装，打开即用

## 项目结构

```
md/
├── public/
├── src/
│   ├── components/     # 组件目录
│   ├── pages/          # 页面组件
│   ├── styles/         # 样式文件
│   ├── hooks/          # 自定义钩子
│   ├── store/          # 状态管理
│   ├── utils/          # 工具函数
│   ├── config/         # 配置文件
│   ├── assets/         # 静态资源
│   ├── types/          # TypeScript类型定义
│   ├── contexts/       # React上下文
│   ├── App.tsx         # 应用入口组件
│   └── main.tsx        # 应用入口文件
├── package.json
└── README.md
```

## 功能特性

- [x] **Markdown 基础语法支持**：
  - 标题（H1-H6）、段落、引用、列表（有序/无序）
  - 粗体、斜体、删除线、链接、图片
  - 表格、分割线、代码（行内/块级）
  - 代码块语法高亮（支持多种编程语言）

- [x] **实时编辑与预览**：
  - 左侧编辑，右侧实时预览
  - 编辑区和预览区滚动同步
  - 支持自适应、手机和宽屏三种预览模式

- [x] **样式设置**：
  - 支持浅色、深色两种编辑器主题
  - 支持多种字体和字号设置
  - 支持多种主题色选择
  - 支持多种代码高亮主题

- [x] **复制功能**：
  - 支持复制为微信公众号格式
  - 修正HTML结构，确保在微信公众号中正确显示

- [ ] **自定义 CSS 样式**：
  - 支持自定义CSS样式

- [ ] **黑夜模式**：
  - 支持浅色、深色两种编辑器主题

## 技术栈

- **前端框架**：React 19
- **开发语言**：TypeScript
- **编辑器**：CodeMirror 6 (通过@uiw/react-codemirror)
- **Markdown解析**：Marked
- **代码高亮**：Highlight.js
- **HTML净化**：DOMPurify
- **样式**：CSS/Less
- **路由**：React Router
- **构建工具**：Vite

## 安装与运行

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 8.0.0 或更高版本

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

应用将在 http://localhost:5173 启动（或其他可用端口）。

### 构建生产版本

```bash
npm run build
```

构建后的文件将生成在 `dist` 目录中。

### 预览生产版本

```bash
npm run preview
```

## 使用指南

### 基本使用

1. 在左侧编辑区输入Markdown格式的文本
2. 右侧会实时显示渲染后的HTML效果
3. 点击顶部工具栏的"复制"按钮可以复制为微信公众号格式
4. 直接粘贴到微信公众号后台编辑器中即可

### 样式设置

工具栏提供了多种样式设置选项：

- **主题**：选择编辑器的外观主题（浅色/深色）
- **字体**：选择预览区的字体
- **字号**：选择预览区的字号大小
- **主题色**：选择预览区的主题色
- **代码主题**：选择代码块的高亮主题

### 预览模式

工具栏提供了三种预览模式：

- **自适应**：预览区宽度自适应窗口大小
- **手机**：模拟手机屏幕宽度（375px）
- **宽屏**：固定宽度（900px）

## 开发指南

### 项目结构说明

- `src/components`：存放可复用的UI组件
- `src/pages`：存放页面级组件
- `src/hooks`：存放自定义React Hooks
- `src/utils`：存放工具函数
- `src/config`：存放配置文件
- `src/contexts`：存放React Context
- `src/store`：存放状态管理相关代码
- `src/styles`：存放全局样式文件
- `src/types`：存放TypeScript类型定义
- `src/assets`：存放静态资源文件

### 核心组件

- `MarkdownEditor`：主编辑器组件，负责协调编辑器和预览区
- `Toolbar`：工具栏组件，提供各种设置选项

### 核心功能实现

- `renderMarkdown`：Markdown渲染函数，将Markdown文本转换为HTML
- `useCopy`：复制功能Hook，处理复制为微信公众号格式
- `useStore`：状态管理Hook，处理内容和设置的存储
- `ThemeContext`：主题上下文，负责主题的实时应用

## 贡献指南

我们欢迎任何形式的贡献，包括但不限于：

- 提交bug报告
- 提交功能请求
- 提交代码修复
- 提交新功能实现
- 改进文档

### 贡献步骤

1. Fork本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 提交 [Issue](https://github.com/flyeric0212/md/issues)
- 发送邮件至 [bo.liang0212@outlook.com](mailto:bo.liang0212@outlook.com)

## 致谢

感谢所有为本项目做出贡献的开发者和用户。
