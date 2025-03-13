# 菌种资源库网页

这是一个简单的菌种资源库单页面应用，用于展示和搜索菌种资源信息。项目采用纯HTML、CSS和JavaScript实现，不依赖复杂的前端框架。

## 功能特点

- 响应式设计，适配各种设备屏幕尺寸
- 数据概览面板，提供关键统计数据
- 功能导航区，快速访问核心功能
- 菌株搜索功能，支持多条件筛选
- 动态加载搜索结果
- 平滑滚动和动画效果

## 文件结构

```
菌种资源库/
├── index.html           # 主页
├── search.html          # 搜索页面
├── styles.css           # 全局样式
├── search.css           # 搜索页面样式
├── script.js            # 主页脚本
├── search.js            # 搜索页面脚本
└── images/              # 图像资源
    ├── logo.svg         # SVG格式Logo
    └── logo.png         # PNG格式Logo（备用）
```

## 使用方法

1. 克隆或下载项目到本地
2. 直接在浏览器中打开`index.html`即可访问网站
3. 无需安装任何依赖或运行服务器（纯前端实现）

## 开发指南

### 添加新页面

如需添加新页面，请按照以下步骤操作：

1. 复制现有HTML文件，如`index.html`，并重命名为新页面名称
2. 修改页面内容和标题
3. 如有必要，创建对应的CSS和JavaScript文件
4. 在导航菜单中添加新页面的链接

### 自定义样式

项目使用CSS变量管理主题颜色和样式：

```css
:root {
    --primary-color: #1e88e5;  // 主色调
    --secondary-color: #26a69a; // 辅助色调
    --accent-color: #00acc1;   // 强调色
    // 其他变量...
}
```

修改这些变量可以轻松更改整个网站的颜色方案。

### 数据模拟

当前版本使用JavaScript中的模拟数据演示功能，实际项目中应替换为真实的后端API调用：

```javascript
// 将此函数替换为实际的API请求
function fetchData() {
    // 示例：使用fetch API请求数据
    fetch('/api/strains')
        .then(response => response.json())
        .then(data => {
            // 处理数据
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
```

## 浏览器兼容性

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- 不支持IE浏览器

## 未来计划

- 添加用户登录/注册功能
- 实现泛基因组可视化界面
- 添加GWAS分析工具
- 开发数据上传功能
- 完善文档下载系统

## 联系方式

如有问题或建议，请联系: luoc19@tsinghua.org.cn 