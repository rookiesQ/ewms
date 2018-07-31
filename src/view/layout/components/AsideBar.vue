<template>
  <el-menu default-active="1-2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#eef1f6" text-color="#333" unique-opened='unique' active-text-color="#409EFF">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <router-link to="/main" >
        <el-menu-item index="1-1">选项1</el-menu-item>
      </router-link>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
      <el-menu-item index="1-4">选项4</el-menu-item>
      <!-- <el-submenu index="1-4">
        <template slot="title">选项4</template>
      </el-submenu> -->
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-menu-item index="2-4">选项4</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
          <i class="el-icon-news"></i>
        <span slot="title">导航三</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
      <el-menu-item index="3-4">选项4</el-menu-item>
    </el-submenu>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
  	return {
  		unique: false
  	}
  }
}
</script>
<style lang="scss" scoped>
  @import "src/view/layout/LayoutStyle.scss";

</style>


