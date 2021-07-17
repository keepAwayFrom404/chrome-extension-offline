console.log('content script done!');
function injectScript(jsPath = 'scripts/inject.js') {
  console.log('done ===>');
  const dom = document.createElement('script')
  dom.setAttribute('type', 'text/javascript')
  dom.src = chrome.extension.getURL(jsPath)
  console.log(jsPath, 'jspath ===>');
  dom.onload = function() {
    this.parentNode.removeChild(this)
  }
  // document.body.appendChild(dom)
}
injectScript()

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  tip(JSON.stringify(request))
  sendResponse('我收到你的消息了：'+JSON.stringify(request))
})

let tipCount = 0
function tip(info = '') {
  const ele = document.createElement('div')
  ele.className = 'chrome-plugin-simple-tip slideInLeft'
  ele.style.top = tipCount*70+20+'px'
  ele.innerHTML = `<div>${info}</div>`
  document.body.appendChild(ele)
  ele.classList.add('animated')
  tipCount++
  setTimeout(() => {
    ele.style.top = '-100px'
    setTimeout(() => {
      ele.remove()
      tipCount--
    }, 400);
  }, 3000);
}