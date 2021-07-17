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

## 页面间通信
1. popup与background: popup可以直接调用background的js方法，也可以直接访问background的dom；background可以通过getViews获取popup（前提是popup页面已经打开）
2. popup/background与content：通过tabs.sendMessage/runtime.onMessage进行发送和接收消息，双方通信直接发送JSON对像，不是json字符串，也可以发送字符串；content发送消息给background类似,content向popup发送消息的前提是popup打开，否则需要background中转；如果popup和background同时监听，那么他们可以同时收到消息，但是只有一个可以sendResponse，一个发送了另一个就无效了。
3. 注入脚本（页面内脚本）与content通信：content与页面脚本之间唯一共享的东西是页面的dom元素，可以使用window.postMessage/window.addEventListener（推荐）或者自定义DOM事件进行监听；上面设及的连接都是短链接，可以使用connect进行长连接（类似webScoket）

## 其他
1. 动态注入或执行JS：虽然background和popup无法直接访问页面dom，但可以通过executeScript来执行脚本，从而访问web页面的dom（这种方式不能直接操作页面js）
2. 动态注入css：insertCSS
3. 获取当前窗口ID：chrome.windows.getCurrnet(function(currentWindow){})
4. 获取当前标签页ID：见popup.js代码
5. 本地存储：chrome.storage是针对插件全局的即使在background存储的数据在content也能获取；.sync可以根据当前登陆用户自动同步，这台电脑的修改自动到其他电脑（storage的权限有sync和local两种）
6. webRequest：该系列API可以对http请求进行恩义的修改定制
7. 如何让popup不关闭：在对popup页面审查元素的时候popup会强制打开无法关闭，只有控制台关闭才能关闭popup
8. 不支持内联js的执行，可以使用事件绑定，通过id或者class
9. 注入css应该特别小心（注入的css优先级仅次于默认样式）
10. END: 撒花🎉：https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html#popup%E5%92%8Cbackground