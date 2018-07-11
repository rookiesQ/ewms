<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple">asdasd</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">aaa</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">ss</div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
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
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 200px;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    position: absolute;
    bottom: 0;
    top: 60px;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    position: absolute;
    top: 60px;
    left: 200px;
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
