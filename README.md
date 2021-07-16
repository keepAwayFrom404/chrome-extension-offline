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
（8）notification：桌面通知

## 5种类型的js对比
1. 权限对比
｜js种类｜可访问的API｜DOM的访问情况｜js的访问情况｜直接跨域｜
｜injected script(直接注入的脚本)｜和普通js无差别，不能访问任何扩展API｜可以访问｜可以访问｜不可以｜
｜content script（注入到当前页面的脚本）｜只能访问extension、runtime等部分API｜可以访问｜不可以访问｜不可以｜
｜popup js（弹窗js）｜可访问大部分API除了devtools系列｜不可直接访问｜不可以｜可以｜
｜background js（常驻的插件脚本）｜可以访问绝大部分API除了devtools系列｜不可以直接访问｜不可以｜可以｜
｜devtools js（控制台中的js）｜只能访问devtools、extension、runtime等部分API｜可以｜可以｜不可以｜

2. 调用方式对比
｜js类型｜调用方式｜
｜content-script｜当前页面f12控制台｜
｜injected script｜当前页面f12控制台｜
｜popup js｜popup页面 右键审查元素｜
｜background js｜插件管理页面点击背景页即刻｜
｜devtools js｜直接打开插件的该页面（未找到其他有效方法）｜