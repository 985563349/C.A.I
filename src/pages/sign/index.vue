<template>
  <div class="sign">
    <div class="sign-content">
      <div class="sign-content-left" />

      <div class="sign-content-right">
        <h1>C.A.I系统登录</h1>

        <el-form ref="userForm" :model="userData" :rules="userRules" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input v-model="userData.username" placeholder="请输入账号(admin)" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="userData.password" type="password" show-password placeholder="请输入密码(admin)" />
          </el-form-item>

          <!-- <el-form-item>
            <el-row :gutter="14">
              <el-col :span="15">
                <el-input v-model="userData.code" placeholder="请输入验证码" />
              </el-col>

              <el-col :span="9">
                <span class="code-img">CRUD</span>
              </el-col>
            </el-row>
          </el-form-item> -->

          <el-form-item>
            <el-button :loading="signInLoading" class="el-button--block" type="primary" native-type="submit" @click="signIn">登录</el-button>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="userData.memory">记住账号</el-checkbox>
            <el-button class="float-right" type="text">忘记密码？</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { signIn } from '@/api/modules/user'

export default {
  name: 'Sign',
  data () {
    return {
      userData: {
        username: '',
        password: '',
        code: '',
        memory: false
      },
      userRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      signInLoading: false
    }
  },
  methods: {
    signIn () {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          this.signInLoading = true
          const { username, password } = this.userData
          try {
            // this.$dispatch('user/signIn', { username, password })
            const { data } = await signIn({ username, password })
            console.log(data)
            this.signInLoading = false
          } catch {
            this.signInLoading = false
          }
        } else {
          this.$message.warning('请完善表单信息！')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .sign {
    position: relative;
    height: 100%;
    background: #f3f3f3;
    &-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      border-radius: 4px;
      width: 1100px;
      height: 500px;
      background-color: #fff;
      overflow: hidden;
      &-left {
        width: 612px;
        background-color: #909399;
      }
      &-right {
        flex: 1;
        padding: 0 80px;
        h1 {
          margin: 50px 0;
          font-size: 28px;
          text-align: center;
          color: #409EFF;
        }
        .el-form {
          width: 100%;
          .el-button--block {
            width: 100%;
          }
          .code-img {
            display: block;
            border-radius: 4px;
            height: 100%;
            text-align: center;
            background-color: #f3f3f3;
          }
        }
      }
    }
  }
</style>
