<template>
  <div class="login-body">
    <div class="login-bar">
      <button @click="toLogin">Login</button>
      <button @click="toRegister">Register</button>
    </div>
    <template v-if="isLogin">
      <InputComp input-name="UserName"
                 input-type="text"
                 :input-upload="inputFetch"
                 key="UserName-1"
                 />
      <InputComp input-name="Password"
                 input-type="password"
                 :input-upload="inputFetch"
                 key="Password-1"
                 />
    </template>
    <template v-else>
      <InputComp input-name="UserName"
                 input-type="text"
                 :input-upload="inputFetch"
                 key="UserName-2"
                 />
      <InputComp input-name="Email"
                 input-type="text"
                 :input-upload="inputFetch"
                 key="Email-2"
                 />
      <InputComp input-name="PhoneNo"
                 input-type="text"
                 :input-upload="inputFetch"
                 key="PhoneNo-2"
                 />
      <InputComp input-name="Password"
                 input-type="password"
                 :input-upload="inputFetch"
                 key="Password-2"
                 />
    </template>
    <div class="login-bar">
      <button @click="submitData">Submit</button>
    </div>
  </div>
</template>

<style scoped>
  .login-body {
    margin:auto;
    padding:15px 20px 15px 20px;
    width:700px;
    border:1px solid black;
  }
  .login-bar {
    margin-top:20px;
    font-size:16px;
  }
</style>
<script>
import InputComp from './subcomponents/InputComp'
import xhrPost from './instruments/xhrPost.js'
export default {
  name: 'Login',
  components: {InputComp},
  data () {
    return {
      isLogin: false,
      loginData: {
        checkType: 'login'
      },
      registerData: {
        checkType: 'register'
      }
    }
  },
  methods: {
    toLogin () {
      this.isLogin = true
    },
    toRegister () {
      this.isLogin = false
    },
    inputFetch (key, value) {
      if (this.isLogin) {
        this.loginData[key] = value
      } else {
        this.registerData[key] = value
      }
    },
    resHandler (res) {
      res = JSON.parse(res)
      if (res['checkPassed'] === true) {
        sessionStorage.setItem('friendlist', JSON.stringify(res['friendlist']))
        sessionStorage.setItem('roomlist', JSON.stringify(res['roomlist']))
        window.location = '/chat'
      } else {
        alert('username or password error')
      }
    },
    submitData () {
      if (this.isLogin) {
        xhrPost('http://127.0.0.1:8088/user', JSON.stringify(this.loginData), this.resHandler)
        sessionStorage.setItem('username', this.loginData['username'])
        sessionStorage.setItem('password', this.loginData['password'])
      } else {
        xhrPost('http://127.0.0.1:8088/user', JSON.stringify(this.registerData), this.resHandler)
      }
    }
  }
}
</script>