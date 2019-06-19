# 微信小程序简易框架

***

## <a name="getting-started">&sect; 快速开始</a>

### <a name="installation">⊙ 安装</a>

`git clone`后`npm install` or `yarn install` 安装依赖

***

### <a name="start">⊙ 启动</a>
`yarn dev`后打开微信开发者工具访问根目录 

### <a name="start">⊙ API?</a>
通过`wx.wxRx`调用`wx`同名api的rxjs封装版

```javascript
wx.wxRx.request({
  url: '...',
})
.subscribe(res => ...)
```
***

## <a name="features">&sect; 技术栈</a>
> 详情可参阅 `package.json`

* webpack
* scss
* typescript
* rxjs

***

## <a name="architecture">&sect; 为什么使用它？</a>
- 支持npm
- 开箱即用的typescript
- 开箱即用的sass
- 对微信api进行RxJS封装
