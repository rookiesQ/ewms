<template>
  <el-container>
    <el-header>
      <header-view></header-view>
    </el-header>
    <el-container>
      <el-aside>
        <aside-bar></aside-bar>
      </el-aside>
      <el-container>
        <el-main class='main'>
          <router-view></router-view>
        </el-main>
        <el-footer>
          这里是footer
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import HeaderView from "./components/Header";
import AsideBar from "./components/AsideBar";
export default {
  name:'layout',
  components:{
    HeaderView,
    AsideBar
  }
};
</script>
<style lang="scss" scoped>
  @import "src/view/layout/LayoutStyle.scss";

</style>
<style>
.el-main{padding:0;}
</style>
