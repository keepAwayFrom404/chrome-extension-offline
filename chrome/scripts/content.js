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
  document.body.appendChild(dom)
}
injectScript()

// 接收消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  tip(JSON.stringify(request))
  sendResponse('我收到你的消息了：'+JSON.stringify(request))
})
// 给后台发送消息
chrome.runtime.sendMessage({greeting: '你好，我是content呢，我主动发消息给后台了！'}, function(response) {
  console.log('收到来自后台的回复：'+response);
})

// 与页面脚本通信方法一
window.addEventListener('message' ,function(e) {
  console.log(e.data, 'postMessage ====>');
})

// 与页面脚本通信方法二
let hiddenDiv = document.getElementById('myCustomEventDiv')
if(!hiddenDiv) {
  hiddenDiv = document.createElement('div')
  hiddenDiv.style.display = 'none'
  document.body.appendChild(hiddenDiv)
}
hiddenDiv.addEventListener('myCustomEvent', function() {
  console.log('myCustomEvent done ====>');
  const eventData = document.getElementById('myCustomEventDiv').innerText
  console.log('收到自定义事件的消息：' + eventData);
})

// connect长连接
chrome.runtime.onConnect.addListener(function(port) {
  console.log(port, 'port ====>');
  if(port.name === 'test-connect') {
    port.onMessage.addListener(function(msg) {
      console.log('content收到长连接的消息：'+msg.question);
      if(msg.question === '你是谁呀？') port.postMessage({answer: '我是你爸！'})
    })
  }
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