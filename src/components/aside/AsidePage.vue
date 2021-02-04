<template>

  <el-menu
    default-active="1"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    router
  >
    <!--一级菜单-->
    <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
      <template slot="title">
        <i :class="iconObj[item.id]"></i>
        <span>{{item.authName}}</span>
      </template>
<!--      二级菜单-->
        <el-menu-item :index="items.path" v-for="items in item.children" :key="items.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{items.authName}}</span>
          </template>
        </el-menu-item>

    </el-submenu>

  </el-menu>
</template>

<script>
  import {getMenuList} from "../../api/permissions";

  export default {
    name: "AsidePage",
    data () {
      return {
        menuList:[],
        iconObj:{
          '125':'el-icon-user-solid',
          '103':'el-icon-platform-eleme',
          '101':'el-icon-s-goods',
          '102':'el-icon-s-order',
          '145':'el-icon-s-platform',
        }
      }
    },
    methods: {
      MenuList() {
        getMenuList()
        .then((res) => {
          console.log(res)
          this.menuList=res.data.data
        })
      }
    },
    created() {
      this.MenuList()
    }
  }
</script>

<style scoped>
.collpace {
  text-align: center;
  font-size: 24px;
}
</style>
