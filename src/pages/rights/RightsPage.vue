<template>
  <div class="rights-container">
<!--    面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    权限列表-->
    <el-table
      :data="rightsList"
      border
      style="width: 100%"
    >
      <el-table-column
        label="#"
        type="index"
      >

      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
      >
      </el-table-column>
      <el-table-column

        label="权限等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level==='0'">一级</el-tag>
          <el-tag v-else-if="scope.row.level==='1'" type="success">二级</el-tag>
          <el-tag v-else="scope.row.level==='2'" type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {getRightsList} from "../../api/permissions";

  export default {
    name: "RightsPage",
    data() {
      return {
        //权限列表
        rightsList: []
      }
    },
    methods:{
        RihgtsList () {

          getRightsList()
          .then((res) => {
            this.rightsList=res.data.data
          })
        }
    },
    created() {
      this.RihgtsList()
    }
  }
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 30px;
}

</style>
