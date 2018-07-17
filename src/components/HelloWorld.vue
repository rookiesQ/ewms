<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"><img class="logo-img" src="../assets/logo.png" alt="" srcset=""></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">aaa</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">ss</div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#eef1f6"
          text-color="#333"
          unique-opened="true"
          active-text-color="#409EFF">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
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
            <el-menu-item index="2-1">选项1-修改测试</el-menu-item>
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
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App"
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $Height:80px; // header height 
  $MiniHeight:60px; // header height 
  $HeaderBg:#409EFF; // header height 
  $Width:250px; // aside width 
  .el-header,.el-footer {
    background-color: $HeaderBg;
    color: #333;
    text-align: center;
  }
  .el-header{
    height: $Height!important;
    line-height: $Height;
    .logo-img {
      margin-top:8px; 
      float: left;
    }
  }
  .el-footer {
    height: $MiniHeight;
    line-height: $MiniHeight;
    position: absolute;
    bottom: 0;
    right: 0;
    left: $Width;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: $Width!important;
    top: $Height;
    .el-menu-vertical-demo{
      text-align: left
    }
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    position: absolute;
    top: $Height;
    left: $Width;
    bottom: 60px;
    right: 0;
  }
  body>.el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  
</style>
