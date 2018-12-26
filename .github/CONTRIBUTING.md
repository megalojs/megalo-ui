# Megalo UI 贡献指南

## Issue

Issues 是用来提交 Bug 或 Feature 相关的内容，一个 Bug Issue 应该由代码问题导致的，可重现的 Bug，并且有比较详细的 Bug 描述信息（Megalo 版本号，Megalo-UI 版本号，运行环境等等）。

在提交 Issue 之前，请搜索 github issues 中是否有相同的问题已被提出，谢谢~

## Pull requests

**第一次提 Pull Request?** 您可以学习这套 *免费* 的课程
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

我们欢迎所有类型的 PR，感谢您愿意花时间贡献代码~

- 如果是组件相关的 PR，麻烦先创建一个 Issue，这么做是避免大家同时修改同一个问题
- Fork 一份代码到自己的账号下，请不要直接在仓库中创建分支
- 基于 `dev` 创建一个新分支，如果你想添加新的组件，分支的命名请使用 `feature_component_[Component Name]`。（例如：`feature_component_list`）
- Git Commit Message 的格式请遵循：`feat(Component Name): info about this commit`
- 提交 PR 的时候，请使用 Rebase，这是为了保持 Commit 历史的干净（Merge request 到分支 `dev`）
- 提交 PR 的时候，请添加一些关于你此次 PR 的描述信息

## 开发环境

请确保您的 Node 版本是 8.0+，并且 Megalo 升级到最新版

```bash
git clone git@github.com:megalojs/megalo-ui.git
npm install
```

运行项目：

```bash
# 微信小程序端
npm run dev:wechat

# 支付宝小程序端
npm run dev:alipay

# 百度小程序端
npm run dev:swan

项目打包：

```bash
# 微信小程序端
npm run build:wechat

# 支付宝小程序端
npm run build:alipay

# 百度小程序端
npm run build:swan

# 组件打包
npm run build:component
```
