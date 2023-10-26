<template>
  <div>
    <el-input ref="account"
              class="account"
              type="text"
              placeholder="用户名"
              v-model="account"
              @keyup.enter="login" />
    <el-input ref="password"
              class="password"
              type="password"
              placeholder="密码"
              v-model="password"
              @keyup.enter="login" />
    <el-button class="login"
               type="success"
               :disabled="disabled"
               @click="login">登陆</el-button>
  </div>
</template>

<script>
import { _localStorage } from '@/common/utils'
import defaultBackgroundImageSrc from './images/login_bg.png'
import defaultMainlogoSrc from './images/main_logo.png'

export default {
  name: 'login',
  data () {
    return {
      disabled: false,
      account: '',
      password: '',
      defaultBackgroundImageSrc
    }
  },
  computed: {
    backgroundImageSrc () {
      return defaultBackgroundImageSrc
    },
    mainlogoSrc () {
      return this.$store.state.baseConfig.mainlogoSrc || defaultMainlogoSrc
    },
    copyright () {
      return this.$store.state.baseConfig.copyright
    },
    icpNO () {
      return this.$store.state.baseConfig.icpNO
    }
  },
  methods: {
    login () {
      let account = this.account
      if (!account) {
        this.$refs.account.focus()
        this.$message({
          type: 'warning',
          message: '用户名不能为空',
          center: true
        })
        return
      }
      if (!this.password) {
        this.$refs.password.focus()
        this.$message({
          type: 'warning',
          message: '密码不能为空',
          center: true
        })
        return
      }
      this.disabled = true
      const res = {
        status: "100",
        msg: "",
        data: {
          id: "a8d1fe54-2fbd-11ec-b929-005056b1c65f",
          userName: "系统-吴妮红",
          headPicName: "https://devapi.4001113900.com:7080///img/head/manager_head_default.jpg",
          cardNum: null,
          cardImg: null,
          cardImgs: null,
          mobileNum: "11111111222",
          emailAddress: null,
          qqNum: null,
          loginName: "ad000147",
          loginPwd: "dc483e80a7a0bd9ef71d8cf973673924",
          userType: "106",
          projectManager: false,
          communityId: "",
          communityName: null,
          communityPhone: null,
          roleName: "系统管理员",
          oldPassword: null,
          intime: null,
          sex: null,
          userActor: null,
          nickName: "系统-吴妮红",
          labelIds: null,
          labels: null,
          sud: [
            {
              id: 81539,
              userId: null,
              desensitizationType: "101",
              desensitization: 1
            },
            {
              id: 81540,
              userId: null,
              desensitizationType: "102",
              desensitization: 1
            }
          ],
          loginCnt: "8",
          serName: null,
          subCompanyId: null,
          subCompanyName: null,
          isSystemAdded: 0,
          companyId: "e9a36e7b-4bb8-11e5-8388-00163e005381",
          orgId: "e9a36e7b-4bb8-11e5-8388-00163e005381",
          address: null,
          userTypeToStr: "平台",
          isExamine: null,
          buildNum: null,
          unitNum: null,
          roomId: null,
          rejectReason: null,
          sexToStr: null,
          addressId: null,
          isCommit: null,
          isMarry: null,
          phoneNum: null,
          birthday: null,
          career: null,
          userSource: null,
          realnameExamine: null,
          cardType: null,
          adminDuty: "",
          userOrganization: "",
          regIdCode: null,
          locationDes: "",
          userIntro: null,
          alias: null,
          source: "0",
          userFrom: null,
          pwdInit: 0,
          adminStatus: 1,
          desensitization: 1,
          subPlatformId: 10,
          reviewReason: 0,
          registerSource: null,
          educationalLevel: null,
          nation: null,
          country: null,
          nativePlace: null,
          province: null,
          city: null,
          areaId: null,
          areaCode: null,
          emergencyContact: null,
          emergencyPhone: null,
          homeAddress: null,
          registeredResidence: null,
          dolphinPlanResult: null,
          workUnit: null,
          workUnitProperty: null,
          industry: null,
          industryFirst: null,
          industrySecond: null,
          workUnitScale: null,
          duty: null,
          workPlace: null,
          companyList: [],
          addresList: [],
          currentCmt: null,
          isService: null,
          isPour: null,
          isActivity: null,
          isCare: null,
          isWater: null,
          isExpress: null,
          isOther: null,
          noticeCnt: null
        }
      }
      this.disabled = false
      if (res.status === '100') {
        let data = res.data
        let companyCode = data.companyCode
        let subPlatformId = data.subPlatformId
        _localStorage.setItem('companyCode', companyCode)
        // 此账号第一次登录
        if (subPlatformId === 0) {
          window.location.href = window.location.origin + '/web/dist/selectPlatform.html?companyCode=lc'
          return
        }
        this.$router.push({
          name: 'home',
          query: {
            login: 1,
            cid: subPlatformId,
            pid: 1
          }
        })
      } else {
        this.password = ''
        this.$refs.password.focus()
      }
    }
  }
}
</script>

<style scoped>
</style>