<template>
  <el-container>
    <el-header>
      <span>商品后台管理系统</span>
      <el-button type="info" @click="loginExit">退出</el-button>
    </el-header>
    <el-container>
      <AsidePage class="el-aside"/>
<!--      <el-aside width="200px">Aside</el-aside>-->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AsidePage from "../../components/aside/AsidePage";
  export default {
    name: "HomePage",
    data(){
      return {
        dialogVisible: false
      }
    },
    methods:{
      loginExit () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    },
    components:{
      AsidePage
    }
  }
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
  padding-left: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  width:200px;
}
.el-main {
  background-color: #E9EEF3;
}
</style>
