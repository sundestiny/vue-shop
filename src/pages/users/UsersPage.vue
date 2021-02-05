<template>
  <div class="user-container">
<!--    面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    用户列表-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <!--      搜索和添加用户-->
        <el-col :span="8" >
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="userList"
          >
            <el-button slot="append" icon="el-icon-search" @click="userList"></el-button>
          </el-input></el-col>
        <el-col :span="4">
          <el-button type="primary"  @click="IsaddUser">添加用户</el-button>
        </el-col>
      </el-row>
<!--      展示用户-->
      <el-table
        :data="users"
        style="width: 100%"
        fit

      >
        <el-table-column
          label="#"
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色">
        </el-table-column>
        <el-table-column
          label="状态">
<!--          作用域插槽实现非文本操作-->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="updataStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
<!--            修改-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="updataUserInfo(scope.row.id)"
            ></el-button>
<!--            删除-->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
<!--            分配角色-->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" circle size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
<!--      分页  -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
<!--    添加用户的对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClose"
      >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserForm">确 定</el-button>
      </span>
    </el-dialog>
<!--    修改用户信息-->
    <el-dialog
      title="修改用户信息"
      :visible.sync="isUpdatadialog"
      width="30%"
    >
      <el-form
        :model="editUserForm"
        :rules="editUseRules"
        ref="editUserRef"
        label-width="100px"
      >
        <el-form-item label="用户名" >
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdatadialog = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import
  {
    getUsersList,
    getUsersStatus,
    addUser,
    queryUserInfo,
    editsUserInfo,
    deleteUserInfo
  } from "../../api/users";


  export default {
    name: "UsersPage",
    data() {
      //邮箱验证规则
      var checkEmail = (rule, value, callback) => {
        const email=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (email.test(value)) return callback()
        callback(new Error('请输入正确的邮箱'))
      }
      //手机号验证规则
      var checkMobile = (rule, value, callback) => {
        const mobile=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (mobile.test(value)) return callback()
        callback(new Error('请输入正确的手机号'))
      }
      return {
        queryInfo:{
          query:'',
          pagenum:1,  //当前页码
          pagesize:2  //每页显示条数
        },
        users:[],
        total:null,
        addDialogVisible:false,
        isUpdatadialog:false,
        addForm:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        //添加用户表单
        addFormRules:{
          //用户规则
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
          ],
          email:[
            { validator:checkEmail, trigger: 'change' },
          ],
          mobile:[
            { validator:checkMobile, trigger: 'change' },
          ]
        },
        //修改用户表单
        editUserForm:{},
        editUseRules:{
          //用户规则
          email:[
            { validator:checkEmail, trigger: 'change' },
          ],
          mobile:[
            { validator:checkMobile, trigger: 'change' },
          ]
        }
      }
    },
    methods: {
      userList(){
        //请求用户列表
        getUsersList(this.queryInfo)
        .then((res) => {
          // console.log(res)
          this.users=res.data.data.users
          this.total=res.data.data.total
        })
      },
      //每页显示的条数
      handleSizeChange(val) {
        this.queryInfo.pagesize=val
        this.userList()
      },
      //当前的页数
      handleCurrentChange(val) {
        this.queryInfo.pagenum=val
        this.userList()
      },
      //修改用户的状态
      updataStatus (userInfo) {
        getUsersStatus(userInfo)
        .then((res) => {
          // console.log(res)
          this.$message({
            type:'success',
            message:'更新状态成功'
          })
        })
      },
      //判断是否打开对话框
      IsaddUser () {
        this.addDialogVisible=true
      },
      //监听对话框的关闭
      addDialogClose () {
        this.$refs.addFormRef.resetFields()
      },
      //添加用户
      addUserForm () {
        this.$refs.addFormRef.validate((valid) => {
          if(!valid) return
          //发送添加用户请求
          addUser(this.addForm)
          .then((res) => {
            this.$message({
              type:'success',
              message:'添加用户成功'
            })
            //更新用户列表
            this.userList()
            //关闭对话框
            this.addDialogVisible=false
          })
        })
      },
      //修改用户信息
      updataUserInfo (id) {
        this.isUpdatadialog=true
        queryUserInfo(id)
        .then((res) => {
          // console.log(res)
          this.editUserForm=res.data.data
        })
      },
      editUserInfo (id) {
        this.$refs.editUserRef.validate((valid) => {
          if(!valid) return
          //更新用户列表
          editsUserInfo(this.editUserForm)
          .then((res) => {
            this.$message({
              type:'success',
              message:'修改用户成功'
            })
          })
          this.userList()
          //关闭对话框
          this.isUpdatadialog=false
        })
      },
      //删除用户
      deleteUser (id) {
        deleteUserInfo(id)
        .then((res) => {
          this.$message({
            type:'success',
            message:'删除用户成功'
          })
          //更新用户列表
          this.userList()
        })
      }
    },
    created() {
      this.userList()
    }
  }
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
