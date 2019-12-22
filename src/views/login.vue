<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" class="avatar" />
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入用户密码"
            prefix-icon="icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click='checkInfo'>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userlogin } from '@/api/user.js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在3到16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 对输入的数据二次验证
    checkInfo () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res = await userlogin(this.form)
          console.log(res)
          if (res.data.message === '登录成功') {
            // 储存token值
            localStorage.setItem('horse_back_token', res.data.data.token)
            this.$router.push({ path: '/' })
          } else if (res.data.message === '用户不存在') {
            this.$message.warning(res.data.message)
          }
        } else {
          this.$message.error('请输入正确的用户信息')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
