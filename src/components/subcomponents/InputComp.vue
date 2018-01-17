<template>
  <div class="login-bar">
    <label :for="inputName">{{ inputName+':' }}</label>
    <input :type="inputType"
           :id="inputName"
           v-model="inputValue"
           @blur="valueCheck">
  </div>
</template>

<style scoped>
  .login-bar {
    margin:auto;
    box-sizing:border-box;
    margin-top:20px;
    width:400px;
  }
  .login-bar label {
    display:inline-block;
    width:30%;
  }
  .login-bar input {
    outline:none;
    display:inline-block;
    width:67%;
  }
</style>

<script>
import inputCheck from '../instruments/inputCheck.js'
export default {
  name: 'InputComp',
  props: ['inputName', 'inputType', 'inputUpload'],
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    valueCheck () {
      var checkResult = true
      var inputValue = this.inputValue.trim()
      switch (this.inputName) {
        case 'Email':
          checkResult = inputCheck.isEmail(inputValue)
          break
        case 'PhoneNo':
          checkResult = inputCheck.isPhoneNo(inputValue)
          break
        default:
          break
      }
      if (checkResult) {
        this.inputUpload(this.inputName.toLowerCase(), inputValue)
      }
    }
  }
}
</script>