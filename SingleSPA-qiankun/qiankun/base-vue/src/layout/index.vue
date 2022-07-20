<template>
  <el-container>
    <el-aside width="200px">
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header>哈哈哈</el-header>
      <el-main>
        <!--主应用路由渲染出口---->
        <router-view></router-view>
        <!--子应用路由渲染出口---->
        <div id="container"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppMenu from './AppMenu'
export default {
  components: {
    AppMenu
  }
}
</script>