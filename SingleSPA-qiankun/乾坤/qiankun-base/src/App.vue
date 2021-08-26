<template>
  <div>
    <el-menu :router="true" mode="horizontal">
      <el-menu-item index="/">Home</el-menu-item> 
      <el-menu-item index="/vue">Vue子应用||</el-menu-item>
      <el-menu-item index="/react">React子应用</el-menu-item>
    </el-menu>
  <router-view></router-view>
  <div id="vue"></div>
  <div id="react"></div>
  </div>
</template>