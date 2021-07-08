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
  document.head.appendChild(dom)
}
injectScript()
