var inputCheck = {
  isEmail (str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    return reg.test(str)
  },
  isPhoneNo (str) {
    var reg = /^1[3|4|5|8][0-9]\d{4,8}$/
    return reg.test(str)
  }
}
module.exports = inputCheck
