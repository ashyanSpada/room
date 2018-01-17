function xhrPost (url, data, callback) {
  var xhr = new XMLHttpRequest()
  xhr.timeout = 3000
  xhr.open('post', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (callback) {
        callback(xhr.response)
      }
    }
  }
  xhr.send(data)
}
module.exports = xhrPost
