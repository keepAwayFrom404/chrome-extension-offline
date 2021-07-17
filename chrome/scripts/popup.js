$(function() {
  var defaultConfig = { color: 'white'} // 默认配资
  chrome.storage.sync.get(defaultConfig, function(items) {
    console.log(items, '1111');
    document.body.style.backgroundColor = items.color
  })
})
$('#show_notification').click(() => {
  chrome.notifications.create(null, {
    type: 'image',
    iconUrl: 'icons/32.png',
    title: '祝福',
    message: '骚年，新年快乐！',
    imageUrl: 'icons/test.png'
  })
})
const bg = chrome.extension.getBackgroundPage()
bg.test() // 访问bg的方法
// alert(bg.document.body.innerHTML) // 访问bg的dom

// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(callback) callback(tabs.length ? tabs[0].id : null)
  })
}

function getCurrentTabId2(callback) {
  chrome.windows.getCurrent(function(currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs) {
      if(callback) callback(tabs.length ? tabs[0].id : null)
    })
  })
}

function sendMessageToContentScript(message, callback) {
	getCurrentTabId2((tabId) => {
    chrome.tabs.sendMessage(tabId, message, function(response) {
      if(callback) callback(response)
    })
  })
}

$('#send_message_to_content_script').click(() => {
  sendMessageToContentScript('你好，我是popup！', function(response) {
    if(response) alert('来自content的回复：'+response);
  })
})

// 使用长连接发信息
$('#connect_to_content_script').click(() => {
  getCurrentTabId(tabId => {
    const port = chrome.tabs.connect(tabId, {name: 'test-connect'})
    port.postMessage({question: '你是谁呀？'})
    port.onMessage.addListener(function(msg) {
      alert('收到消息：'+msg.answer)
      if(msg.answer && msg.answer.startsWith('我是')) {
        port.postMessage({question: '哦哦，原来是你！'})
      }
    })
  })
})