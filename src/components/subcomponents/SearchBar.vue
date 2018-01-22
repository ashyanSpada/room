<template>
  <div class="search-bar" @mouseleave="clearSearchResult">
    <input type="text" v-model="searchContent" placeholder="搜索" @keyup.enter="search">
    <i @click="search"></i>
    <div class="display-bar">
      <div class="display-block">
        <ul v-for="data in searchResult">
          <li>
            {{data['username']}}
          </li>
          <li @click="addFriend(data['username'])">+</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  position:relative;
  height:30px;
  text-align:left;
  margin:8px 18px 8px 18px;
  background-color:rgb(38, 41, 46);
}
.search-bar i {
  display:inline-block;
  width:30px;
  height:30px;
  vertical-align:top;
  background-color:rgb(0, 0, 0);
  background: url(../../assets/icon.png) no-repeat;
  background-position: -60px -432px;
  background-size: 487px 462px;
  cursor:pointer;
}
.search-bar input {
  outline:none;
  border:none;
  margin:0;
  padding:0;
  width:207px;
  height:30px;
  background-color:rgb(38, 41, 46);
  vertical-align:top;
  color:rgb(238, 238, 238);
}
.display-bar {
  position:absolute;
  z-index:999;
  width:100%;
  background-color:#2e3238;
}
.display-block ul {
  list-style:none;
  margin:5px 0 5px 0;
  padding:0;
  background-color:rgb(38, 41, 46);
}
.display-block li {
  display:inline-block;
  margin:4px 6px 4px 6px;
}
.display-block li:last-child {
  float:right;
  cursor:pointer;
}
</style>

<script>
import xhrPost from '../instruments/xhrPost.js'
export default {
  name: 'SearchBar',
  data () {
    return {
      searchContent: '',
      searchResult: []
    }
  },
  computed: {
    friendlist () {
      return this.$store.state.friendlist
    },
    username () {
      return this.$store.state.username
    }
  },
  methods: {
    search () {
      let data = {
        username: this.username,
        searchContent: this.searchContent
      }
      xhrPost('http://127.0.0.1:8088/search', JSON.stringify(data), this.resHandler)
    },
    resHandler (res) {
      this.searchResult = JSON.parse(res)
    },
    clearSearchResult () {
      this.searchResult = []
    },
    addFriend (friendname) {
      let data = {
        username: this.username,
        friendname: friendname
      }
      xhrPost('http://127.0.0.1:8088/addfriend', JSON.stringify(data))
    }
  }
}
</script>