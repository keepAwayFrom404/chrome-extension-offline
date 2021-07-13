$(function() {
  var defaultConfig = { color: 'white'} // 默认配资
  chrome.storage.sync.get(defaultConfig, function(items) {
    console.log(items, '1111');
    document.body.style.backgroundColor = items.color
  })
})