# chrome-extension-offline
谷歌插件离线安装与自动更新

content: 注入页面的东西，可以是js和css，与tab共享dom但是不共享js，只能访问指定的chromeAPI，可以通过background脚本配合通信间接访问。
background：后台脚本，生命周期从浏览器打开到关闭，权限很高，可以调用除了devTools之外的所有API，而且可以无限制跨域访问任何网站，不用设置cors
popup页面：点击图标展示的页面，生命周期比较短，失去焦点就消失