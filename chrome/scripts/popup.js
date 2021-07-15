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