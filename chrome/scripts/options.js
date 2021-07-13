document.addEventListener('DOMContentLoaded', function() {
  var defaultConfig = {color: 'red'}
  // 读取数据，第一个参数是指定要读取的key以及设置默认值
  chrome.storage.sync.get(defaultConfig, function(items) {
    document.getElementById('select').value = items.color
  })
})
document.getElementById('save').addEventListener('click', function() {
  const sel = document.getElementById('select')
  const idx = sel.selectedIndex
  const value = sel.options[idx].value
  chrome.storage.sync.set({color: value}, function() {
    const status =  document.getElementById('status')
    status.textContent  = '保存成功！'
    setTimeout(() => {
      status.textContent  = ''
    }, 800);
  })
  
})