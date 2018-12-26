## megalo-ui
Megalo UI 是基于 *Megalo* 框架开发的多端UI组件库

### 特性
- 基于 *Megalo* 开发 UI 组件
- 一套组件可以在微信小程序、支付宝小程序、百度小程序等多端适配运行(H5端后面会更好的支持)
- 提供友好的 API 和可灵活使用的组件

### 体验
使用微信扫一扫体验小程序组件示例

![](https://haitao.nos.netease.com/7b1459d9-1e1c-4f2e-8b13-87767cdc71c6_258_258.jpg)

### 安装
```bash
npm install @megalo/ui
```

### 使用
组件使用了scss以及px2rpx两个loader, 因此需要在配置文件中引用
```javascript
{
  test: /\.scss$/,
  use: [
    'css-loader',
    {
      loader: 'px2rpx-loader',
      options: {
        rpxUnit: 1,
        rpxPrecision: 6
      }
    },
    'sass-loader'
  ]
}
```

配置路径alias(小程序中解析vue组件路径比较特殊，后续会做优化，优化后可直接在组件库根目录引用组件)
```javascript
alias: {
  'megalo-ui': '@megalo/ui/dist/components'
}
```

在代码中 *import* 需要的组件并使用
```javascript
import { mgAvatar } from 'megalo-ui/avatar'
```

### 开发计划
[开发计划](https://github.com/megalojs/megalo-ui/tree/master/PLANS.md)

### 贡献
如果你在使用 Megalo UI 时遇到问题，或者有好的建议，欢迎给我们提 Issue 或 Pull Request。在开始之前，请阅读 [贡献指南](https://github.com/megalojs/megalo-ui/tree/master/.github/CONTRIBUTING.md)

### License
MIT

#### Inspired by taro-ui