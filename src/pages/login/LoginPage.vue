<template>
  <div class="login-container">
    <!--登录-->
    <div class="login-box">
      <h2>登录</h2>
      <el-form
        ref="loginFormRef"
        :model="form"
        class="login-form"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            type="password"

          >
          </el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="loginForm">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {login} from "../../api/login/login";

  export default {
    name: "LoginPage",
    data() {
      return {
        form: {
          username: 'admin',
          password: '123456'
        },
        rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      loginForm () {
        this.$refs.loginFormRef.validate((valid) => {
          if(!valid) return
          // 发送登录请求
          login(this.form)
          .then((res) => {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            // 保存到session
            window.sessionStorage.setItem('user',res.data.data.token)
            // 跳转到home页
            this.$router.push('/home')
          })
        })
      },
      resetForm () {
        this.$refs.loginFormRef.resetFields()
      }
    }

  }
</script>

<style scoped>
.login-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: aquamarine;
}
.login-box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
}
h2{
  text-align: center;
  font-size: 30px;
}
.login-form{
  padding: 0 50px;
}
.login-btn{
  float: right;
}
</style>
