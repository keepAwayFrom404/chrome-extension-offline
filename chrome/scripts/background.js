console.log('background script done!');
console.log(chrome, 'chrome ====>');
chrome.contextMenus.create({
  title: '使用百度搜索：%s',
  contexts: ['selection'],
  onclick: function(params) {
    chrome.tabs.create({
      url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)
    })
  }
})
chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有打开百度才显示pageAction
					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'baidu.com'}})
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

