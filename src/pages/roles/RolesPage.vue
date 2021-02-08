<template>
  <div class="roles-container">
<!--    面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item >角色列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    角色列表展示-->
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table
        :data="roles"
        border
        style="width: 100%"
      >
<!--        展开列-->
        <el-table-column
          prop="date"
          type="expand"
        >
          <template slot-scope="scope">
            <el-row
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
              :class="['bdbottom',i1===0 ? 'bdtop' : '' ,'vcenter']"
            >
<!--              一级权限-->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeTagId(scope.row,item1.id)"
                >
                  {{item1.authName}}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
<!--              二级权限和三级权限-->
              <el-col :span="19">
                <el-row
                  v-for="(item2,i2) in item1.children"
                  :class="['bdbottom',i2===0 ? 'bdtop' : '' ,'vcenter']"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeTagId(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3,i3) in item2.children"
                      :key="item3.id"
                      :class="['bdbottom',i3===0 ? 'bdtop' : '' ]"
                      closable
                      @close="removeTagId(scope.row,item3.id)"
                    >
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="#"
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300px"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-settings" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
<!--    展示分配权限列表-->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialog"
      width="50%"
      @close="resetId"
    >
<!--      树形列表-->
      <el-tree
        :data="rightTree"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        lazy
        :default-checked-keys="nodeID"
        :props="defaultProps"
        ref="treeRef"
      >
      </el-tree>
      <span slot="footer" >
    <el-button @click="setRightDialog = false">取 消</el-button>
    <el-button type="primary" @click="allRight">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getRolesList,removeRolesRights} from "../../api/roles";
  import {getRightsTree,getRights} from "../../api/permissions";

  export default {
    name: "RolesPage",
    data () {
      return {
        roles:[],
        setRightDialog:false,
        rightTree:[],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        nodeID:[],
        roleID:'' //角色ID
      }
    },
    methods:{
      // 获取角色列表
      rolesList () {
        getRolesList()
        .then((res) => {
          this.roles=res.data.data
        })
      },
      //删除角色指定权限
      removeTagId (role,rightId) {
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除权限请求
          removeRolesRights(role,rightId)
          .then((res) => {
            role.children=res.data.data
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //展示分配权限列表
      showSetRightDialog (role) {
       this.roleID=role.id
        this.getId(role,this.nodeID)
        this.setRightDialog=true
        getRightsTree()
        .then((res) => {
          this.rightTree=res.data.data
          // console.log(res)
        })
      },
      //获取所有三级权限的id
      getId (node,arr) {
        // console.log(node.id)
        if(!node.children) {
          return arr.push(node.id)
        }
        node.children.forEach((item) => {
          this.getId(item,arr)
          // console.log(arr)
        })
      },
      //关闭分配权限弹窗清空上一次默认选中id
      resetId () {
        this.nodeID=[]
      },
      //分配权限
      allRight () {
        const keys=[
          ...this.$refs.treeRef.getCheckedKeys(),
          ...this.$refs.treeRef.getHalfCheckedNodes()
        ]
        const idStr=keys.join(',')

        getRights(this.roleID,idStr)
        .then((res) => {
          console.log(res)
          this.rolesList()
          this.setRightDialog=false
        })
      }
    },
    created() {
      this.rolesList()
    }
  }
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 30px;
}
.el-table {
  margin-top: 30px;
}
.el-tag {
  margin: 7px;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
