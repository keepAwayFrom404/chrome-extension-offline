# chrome-extension-offline
谷歌插件离线安装与自动更新

content: 注入页面的东西，可以是js和css，与tab共享dom但是不共享js，只能访问指定的chromeAPI，可以通过background脚本配合通信间接访问;content的脚本能操作dom，但是dom的事件绑定不能调用content的脚本，所以一般在content中使用js注入的形式插入脚本，并配置web_accessible_resources（浏览器可访问的插件资源）
background：后台脚本，生命周期从浏览器打开到关闭，权限很高，可以调用除了devTools之外的所有API，而且可以无限制跨域访问任何网站，不用设置cors
popup页面：点击图标展示的页面，生命周期比较短，失去焦点就消失

## 八种展现形式
（1）browser_action：可以在右上角增加一个图标，一个tootip，一个badge和一个popup
（2）page_action: 只有当某些特定页面打开才显示的图标（和browser_action区别在于显示的频率，发现api没效果，晚点看看什么原因）
（3）右键菜单：可自定义，通过chrome.contextMenus实现
（4）override：可以将谷歌默认的一些页面给替换掉改成扩展相关的页面；可用于替换历史记录、新标签页、书签等页面；（注意：一个扩展只能替代一个页面、不能替代隐身窗口的页面、网页必须设置title，不然展示链接，用户会困扰）
（5）devtools：每打开一个f12就会创建一个devtools实例，关闭实例销毁，devtools页面可以访问一些特定的api。
（6）option：选项页面，这个是插件的设置页面主要利用chrome的storage进行存储，可持久性。
（7）omnibox：向用户提供搜索建议，注册某个关键词触发插件自己的搜索界面
